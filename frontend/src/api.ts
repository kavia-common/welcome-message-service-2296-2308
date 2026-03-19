export type WelcomeResponse = {
  message: string;
};

/**
 * Base URL for the backend API.
 * Configure in `frontend/.env` (not committed) or via environment in deployment:
 *   VITE_API_BASE_URL=http://localhost:3001
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "");

/**
 * Build a URL for an API path, supporting:
 * - absolute API_BASE_URL (recommended): e.g. http://localhost:3001
 * - empty API_BASE_URL: will use same-origin, useful if front+back are served together
 */
function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL}${normalizedPath}`;
}

// PUBLIC_INTERFACE
export async function fetchWelcomeMessage(signal?: AbortSignal): Promise<WelcomeResponse> {
  /** Fetches `GET /welcome` from the backend and returns the typed payload. */
  const res = await fetch(apiUrl("/welcome"), {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
    signal
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch welcome message (${res.status}): ${body || res.statusText}`);
  }

  return (await res.json()) as WelcomeResponse;
}
