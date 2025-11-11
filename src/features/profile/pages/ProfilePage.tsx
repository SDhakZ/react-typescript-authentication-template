import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/hooks";
import { useGetProfileQuery } from "../profileApi";
import { Input } from "@/components/ui/input";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "../profileApi";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  changePasswordSchema,
  updateProfileSchema,
  type ChangePasswordInput,
  type UpdateProfileInput,
} from "../profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfilePage() {
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isLoadingProfile }] =
    useUpdateProfileMutation();
  const [changePassword, { isLoading: isLoadingPwd }] =
    useChangePasswordMutation();
  const user =
    useAppSelector((state) => state.profile.user) ?? (profileData as any)?.user;
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<UpdateProfileInput>({
    defaultValues: { name: "", email: "", role: "", id: undefined },
    resolver: zodResolver(updateProfileSchema),
  });

  const {
    register: registerPwd,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { errors: pwdErrors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (user) {
      resetProfile({
        id: user.id,
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "",
      });
    }
  }, [user, resetProfile]);

  if (isLoading) return <div className="p-6">Loading...</div>;

  const onSaveProfile = async (values: UpdateProfileInput) => {
    try {
      const res = await updateProfile(values).unwrap();
      toast.success(res.message);
      resetProfile(values);
      setEditing(false);
    } catch (error) {
      console.error("Failed to save profile", error);
      toast.error("Failed to save profile");
    }
  };

  const onChangePassword = async (values: ChangePasswordInput) => {
    const { confirmNewPassword, ...payload } = values;
    try {
      const res = await changePassword(payload).unwrap();
      toast.success(res.message);
      resetPwd();
    } catch (error) {
      console.error("Failed to save profile", error);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 ">
      <div className="w-full max-w-2xl rounded-lg dark:outline-white-700 outline p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Profile</h1>
          {!editing ? (
            <Button onClick={() => setEditing(true)}>Edit</Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                resetProfile();
                setEditing(false);
              }}
            >
              Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSaveProfile)}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="id">ID</FieldLabel>
                <Input id="id" {...register("id" as any)} disabled />
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" {...register("name")} disabled={!editing} />
                <FieldError>{profileErrors.name?.message as any}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" {...register("email")} disabled={!editing} />
                <FieldError>{profileErrors.email?.message as any}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Input id="role" {...register("role" as any)} disabled />
              </Field>
            </FieldSet>

            <FieldSeparator />

            {editing && (
              <div className="flex gap-3">
                <Button disabled={isLoadingProfile} type="submit">
                  {isLoadingProfile ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    resetProfile();
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </FieldGroup>
        </form>

        <div className="border-t pt-4">
          <h2 className="text-lg font-medium mb-3">Change password</h2>
          <form onSubmit={handlePwdSubmit(onChangePassword)}>
            <FieldGroup>
              <FieldSet>
                <Field>
                  <FieldLabel htmlFor="currentPassword">
                    Current password
                  </FieldLabel>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...registerPwd("currentPassword")}
                  />
                  <FieldError>
                    {pwdErrors.currentPassword?.message as any}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                  <Input
                    id="newPassword"
                    type="password"
                    {...registerPwd("newPassword")}
                  />
                  <FieldError>
                    {pwdErrors.newPassword?.message as any}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmNewPassword">
                    Confirm new password
                  </FieldLabel>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    {...registerPwd("confirmNewPassword")}
                  />
                  <FieldError>
                    {pwdErrors.confirmNewPassword?.message as any}
                  </FieldError>
                </Field>
              </FieldSet>

              <FieldSeparator />
              <Button type="submit" disabled={isLoadingPwd}>
                {isLoadingPwd ? "Changing..." : "Change Password"}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
