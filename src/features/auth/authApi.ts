import { api } from "@/app/api/baseApi";
import type {
  LoginPayload,
  RequestSignupPayload,
  VerifySignupPayload,
  ResendSignupOTPPayload,
} from "./authApiSchema";

import type {
  RequestSignupResponse,
  LoginResponse,
  LogoutResponse,
  ResendSignupOTPResponse,
} from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
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

    requestSignup: builder.mutation<
      RequestSignupResponse,
      RequestSignupPayload
    >({
      query: (body) => ({
        url: "/auth/requestSignup",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation<
      ResendSignupOTPResponse,
      ResendSignupOTPPayload
    >({
      query: (body) => ({
        url: "/auth/resendSignupOTP",
        method: "POST",
        body,
      }),
    }),

    verifySignup: builder.mutation<LoginResponse, VerifySignupPayload>({
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
  useResendOtpMutation,
  useLogoutMutation,
} = authApi;
