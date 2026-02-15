export type ApiErrorCode =
  | "BAD_REQUEST"
  | "NETWORK_ERROR"
  | "PARSE_ERROR"
  | "TIMEOUT_ERROR"
  | "UNKNOWN_ERROR";

export type ApiSuccess<TData> = {
  isSuccess: true;
  data: TData;
  statusCode: number;
};

export type ApiFailure = {
  isSuccess: false;
  error: string;
  errorCode: ApiErrorCode;
  statusCode?: number;
};

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;
