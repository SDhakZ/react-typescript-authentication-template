import type { BaseResponse } from "@/types/apiTypes";
import type { User } from "@/types/userTypes";
export interface ProfileResponse extends BaseResponse {
  data: {
    user: User;
  };
}
