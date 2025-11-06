import { api } from "@/app/api/baseApi";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        accessToken: string;
        data: {
          user: { id: string; name: string; role: string; email: string };
        };
      },
      { email: string; password: string; rememberMe?: boolean }
    >({
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

    logout: builder.mutation<void, void>({
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
