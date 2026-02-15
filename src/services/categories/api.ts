import { request } from "@/src/services/http/client";
import { ApiResponse } from "@/src/services/types";

import {
  isCategoryListResponseDto,
  PlantCategory,
  CategoryApiDto,
} from "./types";

const GET_CATEGORIES_ENDPOINT = "/getCategories";

function toPlantCategory(dto: CategoryApiDto): PlantCategory {
  return {
    id: dto.id,
    title: dto.title,
    rank: dto.rank,
    imageUrl: dto.image?.url ?? "",
  };
}

export async function getPlantCategories(): Promise<ApiResponse<PlantCategory[]>> {
  const response = await request<unknown>(GET_CATEGORIES_ENDPOINT, {
    method: "GET",
  });

  if (!response.isSuccess) {
    return response;
  }

  if (!isCategoryListResponseDto(response.data)) {
    return {
      isSuccess: false,
      error: "Unexpected category payload received from API.",
      errorCode: "PARSE_ERROR",
      statusCode: response.statusCode,
    };
  }

  const categories = response.data.data
    .map((item) => toPlantCategory(item))
    .sort((a, b) => a.rank - b.rank);

  return {
    isSuccess: true,
    data: categories,
    statusCode: response.statusCode,
  };
}
