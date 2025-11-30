// src/features/auth/authApiSchemas.ts

import { z } from "zod";
import { emailField, passwordField, nameField } from "./authFields";

// LOGIN
export const LoginPayloadSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean().optional(),
});
export type LoginPayload = z.infer<typeof LoginPayloadSchema>;

// SIGNUP REQUEST → OTP SEND
export const RequestSignupPayloadSchema = z.object({
  email: emailField,
  name: nameField,
  password: passwordField,
});
export type RequestSignupPayload = z.infer<typeof RequestSignupPayloadSchema>;

// SIGNUP VERIFY → FINAL ACCOUNT CREATION
export const VerifySignupPayloadSchema = z.object({
  email: emailField,
  otpCode: z.string().length(6, "OTP Code must be 6 digits"),
});
export type VerifySignupPayload = z.infer<typeof VerifySignupPayloadSchema>;

// RESEND OTP
export const ResendSignupOTPPayloadSchema = z.object({
  email: emailField,
});
export type ResendSignupOTPPayload = z.infer<
  typeof ResendSignupOTPPayloadSchema
>;
