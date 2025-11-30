import type { BaseResponse } from "@/types/api";
import type { User } from "@/types/user";

export interface LoginResponse extends BaseResponse {
  accessToken: string;
  data: {
    user: User;
  };
}

export interface RequestSignupResponse extends BaseResponse {
  data: {
    email: string;
    expiresIn: number;
  };
}

export interface ResendSignupOTPResponse extends RequestSignupResponse {}

export interface LogoutResponse extends BaseResponse {}
