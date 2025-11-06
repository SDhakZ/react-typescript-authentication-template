import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logoutSuccess } from "@/features/auth/authSlice";
import { env } from "@/config/envSchema";

interface RefreshResponse {
  accessToken: string;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.VITE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as RefreshResponse;
      sessionStorage.setItem("accessToken", accessToken);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutSuccess());
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
