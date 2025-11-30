import { z } from "zod";

export const emailField = z.string().email("Invalid email address");

export const passwordField = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export const nameField = z
  .string()
  .min(2, "Name must be at least 2 characters long");
