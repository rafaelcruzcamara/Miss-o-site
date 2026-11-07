import type { Event } from "../types/event";
import { API_URL } from "../lib/api";

const EVENTS_API_URL = `${API_URL}/events`;
const API_TIMEOUT_MS = 10_000;
let buildEventsPromise: Promise<Event[]> | undefined;

type ApiRecord = Record<string, unknown>;

function asRecord(value: unknown): ApiRecord | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as ApiRecord;
}

function asText(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function firstText(...values: unknown[]): string | undefined {
  for (const value of values) {
    const text = asText(value);
    if (text) return text;
  }

  return undefined;
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

function safeExternalUrl(value: unknown): string {
  const text = asText(value);
  if (!text) return "";

  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function safeImageSource(value: unknown): string {
  const text = asText(value);
  if (!text || /[\u0000-\u001f\\]/.test(text) || text.startsWith("//")) {
    return "";
  }

  if (/^[a-z][a-z\d+.-]*:/i.test(text)) {
    return safeExternalUrl(text);
  }

  return text;
}

function normalizeSlug(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function parseTimestamp(value: string | undefined | null): number | undefined {
  if (!value) return undefined;

  const trimmed = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const localDate = new Date(`${trimmed}T00:00:00`);
    return Number.isNaN(localDate.getTime()) ? undefined : localDate.getTime();
  }

  const time = Date.parse(trimmed);
  return Number.isNaN(time) ? undefined : time;
}

function asDateText(value: unknown): string {
  const text = asText(value);
  return text && parseTimestamp(text) !== undefined ? text : "";
}

function firstDateText(...values: unknown[]): string {
  for (const value of values) {
    const date = asDateText(value);
    if (date) return date;
  }

  return "";
}

function toDateKey(value: string | undefined | null): string | undefined {
  const timestamp = parseTimestamp(value);
  if (timestamp === undefined) return undefined;

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDateKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isPublished(status: string | undefined): boolean {
  return status === undefined || status.toLowerCase() === "published";
}

function eventIsVisible(event: Event): boolean {
  if (!isPublished(event.status)) {
    return false;
  }

  const today = getTodayDateKey();
  const displayStarts = toDateKey(event.displayStartsAt);
  const displayEnds = toDateKey(event.displayEndsAt);

  if (displayStarts && today < displayStarts) {
    return false;
  }

  if (displayEnds && today > displayEnds) {
    return false;
  }

  return true;
}

function mapEvent(value: unknown): Event | undefined {
  const apiEvent = asRecord(value);
  if (!apiEvent) return undefined;

  const title = firstText(apiEvent.name, apiEvent.title);
  const id = firstText(apiEvent.id, apiEvent.slug, title);
  const slug = normalizeSlug(firstText(apiEvent.slug, id, title));
  if (!title || !id || !slug) return undefined;

  const location = asRecord(apiEvent.location);
  const startsAt = firstDateText(apiEvent.starts_at, apiEvent.start_at);
  const endsAt = firstDateText(apiEvent.ends_at, apiEvent.end_at);
  const registrationStartsAt = firstDateText(
    apiEvent.registration_starts_at,
    apiEvent.registrationStartAt,
  );
  const registrationEndsAt = firstDateText(
    apiEvent.registration_ends_at,
    apiEvent.registrationEndAt,
  );

  return {
    id,
    slug,
    title,
    summary: firstText(apiEvent.summary, apiEvent.description) ?? "",
    cover: safeImageSource(firstText(apiEvent.cover_url, apiEvent.cover_path)),
    description: firstText(apiEvent.description, apiEvent.summary) ?? "",
    schedule: firstText(apiEvent.schedule, apiEvent.description) ?? "",
    importantInfo: asText(apiEvent.important_information) ?? "",
    location: {
      name: firstText(apiEvent.venue_name, location?.name) ?? "",
      address: firstText(apiEvent.address, location?.address) ?? "",
      city: firstText(apiEvent.city, location?.city) ?? "",
      state: firstText(apiEvent.state, location?.state) ?? "",
      maps: safeExternalUrl(firstText(apiEvent.maps_url, location?.maps)),
    },
    startDate: startsAt.slice(0, 10),
    endDate: endsAt.slice(0, 10),
    startsAt,
    endsAt,
    displayStartsAt:
      firstText(apiEvent.display_starts_at, apiEvent.display_start_at) ?? "",
    displayEndsAt:
      firstText(apiEvent.display_ends_at, apiEvent.display_end_at) ?? "",
    registrationUrl:
      safeExternalUrl(firstText(apiEvent.registration_url, apiEvent.registrationUrl)) ||
      "#",
    registrationStarts: registrationStartsAt.slice(0, 10),
    registrationEnds: registrationEndsAt.slice(0, 10),
    registrationStartsAt,
    registrationEndsAt,
    status: firstText(apiEvent.status, apiEvent.state) ?? "published",
    featured: asBoolean(apiEvent.is_featured),
    fixed: asBoolean(apiEvent.is_fixed),
    label: firstText(apiEvent.category, apiEvent.venue_name),
  };
}

async function fetchEventsFromApi(): Promise<Event[]> {
  try {
    const response = await fetch(EVENTS_API_URL, {
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: unknown = await response.json();
    const envelope = asRecord(data);
    const rows: unknown = Array.isArray(data) ? data : envelope?.events;
    if (!Array.isArray(rows)) {
      throw new Error("Invalid response shape");
    }

    const events = rows.map(mapEvent).filter((event): event is Event => Boolean(event));
    if (rows.length > 0 && events.length === 0) {
      throw new Error("Response did not contain valid events");
    }

    return events;
  } catch {
    console.warn("Could not load events; continuing without event data.");
    return [];
  }
}

function loadEvents(): Promise<Event[]> {
  if (!import.meta.env.PROD) {
    return fetchEventsFromApi();
  }

  buildEventsPromise ??= fetchEventsFromApi();
  return buildEventsPromise;
}

export async function getAllEvents(): Promise<Event[]> {
  return loadEvents();
}

export async function getEvents(): Promise<Event[]> {
  const events = await loadEvents();
  return [...events]
    .filter(eventIsVisible)
    .sort((a, b) => {
      const aDate = parseTimestamp(a.startsAt || a.startDate) ?? Infinity;
      const bDate = parseTimestamp(b.startsAt || b.startDate) ?? Infinity;
      return aDate - bDate;
    });
}

export async function getFeaturedEvent(): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find((event) => event.featured);
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getAllEvents();
  const normalizedSlug = normalizeSlug(slug);
  return events.find(
    (event) =>
      event.id === slug ||
      event.slug === slug ||
      normalizeSlug(event.slug) === normalizedSlug,
  );
}
