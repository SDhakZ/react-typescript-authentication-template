import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signup: {
    step: "idle" | "otp" | "verified";
    email: string | null;
    expiresAt?: number;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  signup: {
    step: "idle",
    email: null,
    expiresAt: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User | null>) => {
      state.isAuthenticated = true;
      if (action.payload) {
        state.user = action.payload;
      }
    },
    requestSignupSuccess: (
      state,
      action: PayloadAction<{ email: string; expiresIn: number }>
    ) => {
      state.signup.step = "otp";
      state.signup.email = action.payload.email;
      state.signup.expiresAt = Date.now() + action.payload.expiresIn * 1000;
    },
    verifySignupSuccess: (state, action: PayloadAction<{ user: User }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.signup.step = "verified";
      state.signup.email = null;
      state.signup.expiresAt = undefined;
    },
    resendOtpSuccess: (state, action: PayloadAction<{ expiresIn: number }>) => {
      state.signup.expiresAt = Date.now() + action.payload.expiresIn * 1000;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  requestSignupSuccess,
  verifySignupSuccess,
  resendOtpSuccess,
} = authSlice.actions;
export default authSlice.reducer;
