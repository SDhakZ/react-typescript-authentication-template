import { api } from "@/app/api/baseApi";
import type { LoginInput, RegisterInput } from "./authSchema";
import {
  type RegisterResponse,
  type LoginResponse,
  type LogoutResponse,
} from "./authTypes";

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
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),

    register: builder.mutation<RegisterResponse, RegisterInput>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
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
