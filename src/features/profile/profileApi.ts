import { api } from "@/app/api/baseApi.ts";
import type { ProfileResponse } from "./profile";
import { setProfile } from "./profileSlice";
import type {
  AddPasswordPayload,
  ChangePasswordPayload,
  UpdateProfileInput,
} from "./profileSchema";
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
    addPassword: builder.mutation<BaseResponse, AddPasswordPayload>({
      query: (password) => ({
        url: "/profile/add-password",
        method: "POST",
        body: {
          addPassword: password.addPassword,
        },
      }),
    }),
    updateProfile: builder.mutation<ProfileResponse, UpdateProfileInput>({
      query: (profile) => ({
        url: "/profile",
        method: "PATCH",
        body: {
          name: profile.name,
          email: profile.email,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useChangePasswordMutation,
  useAddPasswordMutation,
  useUpdateProfileMutation,
} = profileApi;
