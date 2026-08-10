import type { Event } from "../types/event";
import { API_URL } from "../lib/api";

const EVENTS_API_URL = `${API_URL}/events`;

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

const slugify = normalizeSlug;

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

function toDateKey(value: string | undefined | null): string | undefined {
  const timestamp = parseTimestamp(value);
  if (timestamp === undefined) return undefined;

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isPublished(status: string | undefined): boolean {
  return status === undefined || status.toLowerCase() === "published";
}

function eventIsVisible(event: Event): boolean {
  if (!isPublished(event.status)) {
    return false;
  }

  const today = toDateKey(new Date().toISOString());
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

function mapEvent(apiEvent: any): Event {
  const title = apiEvent.name ?? apiEvent.title ?? "Evento";
  const slug = apiEvent.slug
    ? normalizeSlug(apiEvent.slug)
    : apiEvent.id
    ? apiEvent.id
    : slugify(title);

  return {
    id: apiEvent.id,
    slug,
    title,
    summary: apiEvent.summary ?? apiEvent.description ?? "",
    cover: apiEvent.cover_url ?? apiEvent.cover_path ?? "",
    description: apiEvent.description ?? apiEvent.summary ?? "",
    schedule: apiEvent.schedule ?? apiEvent.description ?? "",
    importantInfo: apiEvent.important_information ?? "",
    location: {
      name: apiEvent.venue_name ?? apiEvent.location?.name ?? "",
      address: apiEvent.address ?? apiEvent.location?.address ?? "",
      city: apiEvent.city ?? apiEvent.location?.city ?? "",
      state: apiEvent.state ?? apiEvent.location?.state ?? "",
      maps: apiEvent.maps_url ?? apiEvent.location?.maps ?? "",
    },
    startDate: apiEvent.starts_at ? apiEvent.starts_at.slice(0, 10) : "",
    endDate: apiEvent.ends_at ? apiEvent.ends_at.slice(0, 10) : "",
    startsAt: apiEvent.starts_at ?? apiEvent.start_at ?? "",
    endsAt: apiEvent.ends_at ?? apiEvent.end_at ?? "",
    displayStartsAt: apiEvent.display_starts_at ?? apiEvent.display_start_at ?? "",
    displayEndsAt: apiEvent.display_ends_at ?? apiEvent.display_end_at ?? "",
    registrationUrl: apiEvent.registration_url ?? apiEvent.registrationUrl ?? "#",
    registrationStarts: apiEvent.registration_starts_at
      ? apiEvent.registration_starts_at.slice(0, 10)
      : apiEvent.registrationStartAt
      ? apiEvent.registrationStartAt.slice(0, 10)
      : "",
    registrationEnds: apiEvent.registration_ends_at
      ? apiEvent.registration_ends_at.slice(0, 10)
      : apiEvent.registrationEndAt
      ? apiEvent.registrationEndAt.slice(0, 10)
      : "",
    registrationStartsAt:
      apiEvent.registration_starts_at ?? apiEvent.registrationStartAt ?? "",
    registrationEndsAt:
      apiEvent.registration_ends_at ?? apiEvent.registrationEndAt ?? "",
    status: apiEvent.status ?? apiEvent.state ?? "",
    featured: Boolean(apiEvent.is_featured),
    fixed: Boolean(apiEvent.is_fixed),
    label: apiEvent.category ?? apiEvent.venue_name ?? undefined,
  };
}

async function fetchEventsFromApi(): Promise<Event[]> {
  const response = await fetch(EVENTS_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data = await response.json();
  const events = Array.isArray(data) ? data : data?.events;
  if (!Array.isArray(events)) {
    throw new Error("Invalid events response from API");
  }

  return events.map(mapEvent);
}

export async function getAllEvents(): Promise<Event[]> {
  return await fetchEventsFromApi();
}

export async function getEvents(): Promise<Event[]> {
  const events = await fetchEventsFromApi();
  return [...events]
    .filter(eventIsVisible)
    .sort(
      (a, b) =>
        new Date(a.startsAt || a.startDate).getTime() -
        new Date(b.startsAt || b.startDate).getTime(),
    );
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
