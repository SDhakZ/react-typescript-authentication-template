import { api } from "@/app/api/baseApi";
import type {
  LoginInput,
  RegisterInput,
  RegisterPayload,
  VerifySignupInput,
} from "./authSchema";
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

    requestSignup: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (body) => ({
        url: "/auth/requestSignup",
        method: "POST",
        body,
      }),
    }),

    verifySignup: builder.mutation<LoginResponse, VerifySignupInput>({
      query: (body) => ({
        url: "/auth/verifySignup",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Signup verification successful", data);
          sessionStorage.setItem("accessToken", data.accessToken);
        } catch (error) {
          console.error("Signup verification failed", error);
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

export const {
  useLoginMutation,
  useRequestSignupMutation,
  useVerifySignupMutation,
  useLogoutMutation,
} = authApi;
