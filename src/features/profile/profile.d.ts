import type { BaseResponse } from "@/types/api";
import type { User } from "@/types/user";

export interface ProfileResponse extends BaseResponse {
  data: {
    user: User;
  };
}

export type ProfileForm = {
  id?: number;
  name: string;
  email: string;
  role?: string;
};

export type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
