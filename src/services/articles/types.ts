export type QuestionApiDto = {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
};

export type Article = {
  id: number;
  title: string;
  subtitle: string;
  imageUri: string;
  uri: string;
  order: number;
};

export function isQuestionApiDto(value: unknown): value is QuestionApiDto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.title === "string" &&
    typeof candidate.subtitle === "string" &&
    typeof candidate.image_uri === "string" &&
    typeof candidate.uri === "string" &&
    typeof candidate.order === "number"
  );
}
