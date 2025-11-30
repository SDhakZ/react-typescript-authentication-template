// src/features/auth/authFormSchemas.ts
import { z } from "zod";
import { emailField, passwordField, nameField } from "./authFields";
import {
  RequestSignupPayloadSchema,
  LoginPayloadSchema,
  VerifySignupPayloadSchema,
  ResendSignupOTPPayloadSchema,
} from "./authApiSchema";

export const LoginFormSchema = LoginPayloadSchema.strict();
export type LoginFormValues = z.infer<typeof LoginFormSchema>;

export const SignupFormSchema = RequestSignupPayloadSchema.extend({
  confirmPassword: passwordField,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();

export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export const VerifySignupFormSchema = VerifySignupPayloadSchema.strict();
export type VerifySignupFormValues = z.infer<typeof VerifySignupFormSchema>;

export const ResendOtpFormSchema = ResendSignupOTPPayloadSchema.strict();
export type ResendOtpFormValues = z.infer<typeof ResendOtpFormSchema>;
