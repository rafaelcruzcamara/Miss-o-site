import { afterEach, describe, expect, it, vi } from "vitest";
import { getAllEvents, getEvents } from "./events";

const validEvent = {
  id: 12,
  name: "Encontro de Oração",
  slug: "encontro-de-oracao",
  starts_at: "2030-05-12T10:00:00-04:00",
  registration_url: "https://inscricoes.example.org/evento",
  cover_url: "/uploads/evento.jpg",
  is_featured: true,
};

function mockResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  } as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("event API normalization", () => {
  it("maps valid events and preserves safe registration and image URLs", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse({ events: [validEvent] })));

    const [event] = await getAllEvents();

    expect(event).toMatchObject({
      id: "12",
      title: "Encontro de Oração",
      slug: "encontro-de-oracao",
      registrationUrl: "https://inscricoes.example.org/evento",
      cover: "/uploads/evento.jpg",
      featured: true,
    });
  });

  it("rejects unsafe external URLs and skips malformed rows", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockResponse([
          { ...validEvent, registration_url: "javascript:alert(1)", cover_url: "data:image/png;base64,AA" },
          null,
          { starts_at: 42 },
        ]),
      ),
    );

    const events = await getAllEvents();

    expect(events).toHaveLength(1);
    expect(events[0].registrationUrl).toBe("#");
    expect(events[0].cover).toBe("");
  });

  it("returns no events for HTTP errors, malformed payloads, and network failures", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(mockResponse({}, 500))
      .mockResolvedValueOnce(mockResponse({ results: [] }))
      .mockRejectedValueOnce(new Error("network unavailable"));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getAllEvents()).resolves.toEqual([]);
    await expect(getAllEvents()).resolves.toEqual([]);
    await expect(getAllEvents()).resolves.toEqual([]);
    expect(warning).toHaveBeenCalledTimes(3);
  });

  it("keeps malformed dates empty and sorts those events after dated events", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        mockResponse([
          { ...validEvent, starts_at: "not-a-date" },
          { ...validEvent, id: 13, slug: "later", starts_at: "2030-05-12T10:00:00Z" },
        ]),
      ),
    );

    const events = await getEvents();

    expect(events).toHaveLength(2);
    expect(events.map((event) => event.slug)).toEqual(["later", "encontro-de-oracao"]);
    expect(events[1].startsAt).toBe("");
  });
});
