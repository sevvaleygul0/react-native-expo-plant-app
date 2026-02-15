import { API_BASE_URL } from "@/src/services/config";
import { ApiFailure, ApiResponse, ApiSuccess } from "@/src/services/types";

const DEFAULT_TIMEOUT_MS = 10_000;

type QueryValue = string | number | boolean | null | undefined;

type RequestConfig = Omit<RequestInit, "body"> & {
  timeoutMs?: number;
  query?: Record<string, QueryValue>;
  body?: unknown;
};

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

function getErrorMessage(payload: unknown): string | null {
  if (typeof payload === "string") {
    return payload;
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const candidate = payload as Record<string, unknown>;

  if (typeof candidate.message === "string") {
    return candidate.message;
  }

  if (typeof candidate.error === "string") {
    return candidate.error;
  }

  return null;
}

function makeFailure(
  error: string,
  errorCode: ApiFailure["errorCode"],
  statusCode?: number,
): ApiFailure {
  return {
    isSuccess: false,
    error,
    errorCode,
    statusCode,
  };
}

function makeSuccess<TData>(data: TData, statusCode: number): ApiSuccess<TData> {
  return {
    isSuccess: true,
    data,
    statusCode,
  };
}

export async function request<TData>(
  path: string,
  config: RequestConfig = {},
): Promise<ApiResponse<TData>> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    query,
    headers,
    body,
    method = "GET",
    ...restConfig
  } = config;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const requestHeaders = new Headers(headers);
  const hasBody = body !== undefined;

  requestHeaders.set("Accept", "application/json");

  if (hasBody && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(buildUrl(path, query), {
      ...restConfig,
      method,
      headers: requestHeaders,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const responseText = await response.text();
    const parsedPayload = responseText ? (JSON.parse(responseText) as unknown) : null;

    if (!response.ok) {
      return makeFailure(
        getErrorMessage(parsedPayload) ??
          `Request failed with status code ${response.status}.`,
        "BAD_REQUEST",
        response.status,
      );
    }

    return makeSuccess(parsedPayload as TData, response.status);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      return makeFailure(
        `Request timed out after ${timeoutMs}ms.`,
        "TIMEOUT_ERROR",
      );
    }

    if (error instanceof SyntaxError) {
      return makeFailure("Invalid JSON response.", "PARSE_ERROR");
    }

    if (error instanceof TypeError) {
      return makeFailure(
        "Network request failed. Please check your connection.",
        "NETWORK_ERROR",
      );
    }

    return makeFailure("Unexpected error occurred during request.", "UNKNOWN_ERROR");
  } finally {
    clearTimeout(timeoutId);
  }
}
