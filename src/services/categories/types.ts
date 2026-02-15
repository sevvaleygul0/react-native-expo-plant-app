export type CategoryImageApiDto = {
  url: string;
};

export type CategoryApiDto = {
  id: number;
  title: string;
  rank: number;
  image: CategoryImageApiDto | null;
};

export type CategoryListResponseDto = {
  data: CategoryApiDto[];
};

export type PlantCategory = {
  id: number;
  title: string;
  rank: number;
  imageUrl: string;
};

function isCategoryImageApiDto(value: unknown): value is CategoryImageApiDto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.url === "string" && candidate.url.length > 0;
}

export function isCategoryApiDto(value: unknown): value is CategoryApiDto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  const hasValidImage =
    candidate.image === null || isCategoryImageApiDto(candidate.image);

  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.rank === "number" &&
    hasValidImage
  );
}

export function isCategoryListResponseDto(
  value: unknown,
): value is CategoryListResponseDto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    Array.isArray(candidate.data) &&
    candidate.data.every((item) => isCategoryApiDto(item))
  );
}
