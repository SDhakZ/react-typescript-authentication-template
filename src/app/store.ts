import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/authSlice";
import { api } from "./api/baseApi";
import { rtkErrorToastMiddleware } from "./middleware/errorToastMiddleware";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(rtkErrorToastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
