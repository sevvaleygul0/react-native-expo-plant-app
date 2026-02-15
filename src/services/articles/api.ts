import { request } from "@/src/services/http/client";
import { ApiResponse } from "@/src/services/types";

import { Article, isQuestionApiDto, QuestionApiDto } from "./types";

const GET_QUESTIONS_ENDPOINT = "/getQuestions";

function toArticle(dto: QuestionApiDto): Article {
  return {
    id: dto.id,
    title: dto.title,
    subtitle: dto.subtitle,
    imageUri: dto.image_uri,
    uri: dto.uri,
    order: dto.order,
  };
}

export async function getArticles(): Promise<ApiResponse<Article[]>> {
  const response = await request<unknown>(GET_QUESTIONS_ENDPOINT, {
    method: "GET",
  });

  if (!response.isSuccess) {
    return response;
  }

  if (!Array.isArray(response.data)) {
    return {
      isSuccess: false,
      error: "Invalid response shape for articles list.",
      errorCode: "PARSE_ERROR",
      statusCode: response.statusCode,
    };
  }

  const allItemsValid = response.data.every((item) => isQuestionApiDto(item));

  if (!allItemsValid) {
    return {
      isSuccess: false,
      error: "Unexpected article payload received from API.",
      errorCode: "PARSE_ERROR",
      statusCode: response.statusCode,
    };
  }

  const articles = response.data
    .map((item) => toArticle(item))
    .sort((a, b) => a.order - b.order);

  return {
    isSuccess: true,
    data: articles,
    statusCode: response.statusCode,
  };
}
