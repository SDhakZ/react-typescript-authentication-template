import type { BaseResponse } from "@/types/api";
import type { User } from "@/types/user";

export interface LoginResponse extends BaseResponse {
  accessToken: string;
  data: {
    user: User;
  };
}

export interface RegisterResponse extends BaseResponse {
  message: string;
  data: {
    email: string;
    expiresIn: number;
  };
}

export interface LogoutResponse extends BaseResponse {}
