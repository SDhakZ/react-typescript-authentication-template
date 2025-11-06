import { api } from "@/app/api/baseApi.ts";
import type { ProfileResponse } from "./profile";
import { setProfile } from "./profileSlice";
export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => "/users/profile",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data.data.user));
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
