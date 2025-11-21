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

export const addPasswordSchema = z
  .object({
    addPassword: z.string().min(6),
    confirmAddNewPassword: z.string().min(6),
  })
  .refine((data) => data.addPassword === data.confirmAddNewPassword, {
    message: "Passwords do not match",
    path: ["confirmAddNewPassword"],
  });
export type AddPasswordInput = z.infer<typeof addPasswordSchema>;

export type ChangePasswordPayload = Omit<
  ChangePasswordInput,
  "confirmNewPassword"
>;

export type AddPasswordPayload = Omit<
  AddPasswordInput,
  "confirmAddNewPassword"
>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  id: z.number().optional(),
  role: z.string().optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
