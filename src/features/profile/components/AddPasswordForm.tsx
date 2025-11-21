import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPasswordSchema, type AddPasswordInput } from "../profileSchema";
import { useAddPasswordMutation } from "../profileApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { toast } from "sonner";
export default function AddPasswordForm() {
  const [addPassword, { isLoading }] = useAddPasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPasswordInput>({
    resolver: zodResolver(addPasswordSchema),
  });

  async function onSubmit(values: AddPasswordInput) {
    try {
      await addPassword(values).unwrap();

      toast.success("Password added successfully");

      reset();
    } catch (err) {
      console.error("Adding password failed", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-lg font-medium mb-3">Add Password</h2>
      <FieldGroup>
        <Field>
          <FieldLabel>New Password</FieldLabel>
          <Input type="password" {...register("addPassword")} />
          <FieldError>{errors.addPassword?.message}</FieldError>
        </Field>

        <Field className="-mt-1">
          <FieldLabel>Confirm New Password</FieldLabel>
          <Input type="password" {...register("confirmAddNewPassword")} />
          <FieldError>{errors.confirmAddNewPassword?.message}</FieldError>
        </Field>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Set Password"}
        </Button>
      </FieldGroup>
    </form>
  );
}
