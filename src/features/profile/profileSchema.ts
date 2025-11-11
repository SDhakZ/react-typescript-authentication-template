import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export type ChangePasswordPayload = Omit<
  ChangePasswordInput,
  "confirmNewPassword"
>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  id: z.number().optional(),
  role: z.string().optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
