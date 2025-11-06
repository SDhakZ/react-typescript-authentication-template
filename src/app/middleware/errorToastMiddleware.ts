import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const rtkErrorToastMiddleware: Middleware = () => (next) => (action) => {
  // endpoints you DON'T want to toast (login, refresh, etc.)
  const skipEndpoints = ["login"];

  if (isRejectedWithValue(action)) {
    const endpoint = (action?.meta?.arg as any)?.endpointName;
    const payload = action.payload as any;

    const message =
      payload?.data?.message ||
      payload?.error ||
      "An unexpected error occurred.";

    // Skip these endpoints entirely
    if (skipEndpoints.includes(endpoint)) {
      return next(action);
    }

    // Otherwise show the toast
    toast.error(message);
  }

  return next(action);
};
