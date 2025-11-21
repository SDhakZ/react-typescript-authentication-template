import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProfileSchema, type UpdateProfileInput } from "../profileSchema";
import { useUpdateProfileMutation } from "../profileApi";

import {
  Field,
  FieldSet,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditProfileForm({ user }: { user: any }) {
  const [editing, setEditing] = useState(false);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    },
  });

  useEffect(() => {
    reset({
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
    });
  }, [user, reset]);

  async function onSave(values: UpdateProfileInput) {
    try {
      const res = await updateProfile(values).unwrap();
      toast.success(res.message);
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Failed to update profile");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Profile</h2>

        {!editing ? (
          <Button type="button" onClick={() => setEditing(true)}>
            Edit
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              reset();
              setEditing(false);
            }}
          >
            Cancel
          </Button>
        )}
      </div>

      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel>ID</FieldLabel>
            <Input disabled {...register("id" as any)} />
          </Field>

          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input disabled={!editing} {...register("name")} />
            <FieldError>{errors.name?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input disabled={!editing} {...register("email")} />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Role</FieldLabel>
            <Input disabled {...register("role" as any)} />
          </Field>
        </FieldSet>

        <FieldSeparator />

        {editing && (
          <div className="flex gap-3">
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                reset();
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </FieldGroup>
    </form>
  );
}
