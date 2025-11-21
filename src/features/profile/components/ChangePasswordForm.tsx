import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "../profileSchema";
import { useChangePasswordMutation } from "../profileApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { toast } from "sonner";

export default function ChangePasswordForm() {
  const [changePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function onSubmit(values: ChangePasswordInput) {
    try {
      await changePassword(values).unwrap();

      toast.success("Password changed successfully");

      reset();
    } catch (err) {
      console.error("Password change failed", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-medium mb-3">Change Password</h2>
      <FieldGroup>
        <Field>
          <FieldLabel>Current Password</FieldLabel>
          <Input type="password" {...register("currentPassword")} />
          <FieldError>{errors.currentPassword?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input type="password" {...register("newPassword")} />
          <FieldError>{errors.newPassword?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Confirm New Password</FieldLabel>
          <Input type="password" {...register("confirmNewPassword")} />
          <FieldError>{errors.confirmNewPassword?.message}</FieldError>
        </Field>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Change Password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
