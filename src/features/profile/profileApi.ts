import { api } from "@/app/api/baseApi.ts";
import type { ProfileResponse } from "./profile";
import { setProfile } from "./profileSlice";
import type { ChangePasswordPayload } from "./profileSchema";
import type { BaseResponse } from "@/types/api";
export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/profile",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data.data.user));
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      },
    }),
    changePassword: builder.mutation<BaseResponse, ChangePasswordPayload>({
      query: (passwords) => ({
        url: "/profile/change-password",
        method: "POST",
        body: {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
      }),
    }),
  }),
});

export const { useGetProfileQuery, useChangePasswordMutation } = profileApi;
