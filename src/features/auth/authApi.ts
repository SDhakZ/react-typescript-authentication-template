import { api } from "@/app/api/baseApi";
import type { LoginInput } from "./authSchema";
import type { LoginResponse, LogoutResponse } from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginInput>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Login successful", data);
          sessionStorage.setItem("accessToken", data.accessToken);
          sessionStorage.setItem("user", JSON.stringify(data.data.user));
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        sessionStorage.removeItem("accessToken");
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
