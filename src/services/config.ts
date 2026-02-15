import Constants from "expo-constants";

const FALLBACK_API_BASE_URL = "https://dummy-api-jtg6bessta-ey.a.run.app";

type ExpoExtraConfig = {
  apiBaseUrl?: string;
};

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "");
}

function resolveApiBaseUrl(): string {
  const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtraConfig;
  const configuredBaseUrl = extra.apiBaseUrl;

  if (!configuredBaseUrl) {
    return normalizeBaseUrl(FALLBACK_API_BASE_URL);
  }

  return normalizeBaseUrl(configuredBaseUrl);
}

export const API_BASE_URL = resolveApiBaseUrl();
