import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const requestSignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof requestSignupSchema>;
export type RegisterPayload = Omit<RegisterInput, "confirmPassword">;

export const verifySignupSchema = z.object({
  email: z.email(),
  otpCode: z.string().length(6, "OTP Code must be 6 characters long"),
});

export type VerifySignupInput = z.infer<typeof verifySignupSchema>;
