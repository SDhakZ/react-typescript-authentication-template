export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse extends BaseResponse {
  accessToken: string;
  data: {
    user: User;
  };
}

export interface RegisterResponse extends BaseResponse {
  data: {
    user: User;
  };
}

export interface LogoutResponse extends BaseResponse {}
