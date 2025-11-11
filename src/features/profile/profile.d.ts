import type { BaseResponse } from "@/types/api";
import type { User } from "@/types/user";

export interface ProfileResponse extends BaseResponse {
  data: {
    user: User;
  };
}
