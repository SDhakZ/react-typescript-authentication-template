import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginInput } from "../authSchema";
import { loginSchema } from "../authSchema";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginMutation } from "../authApi";
import { loginSuccess } from "../authSlice";
import { useAppDispatch } from "@/hooks/hooks";
export default function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  console.log("Login error:", error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }).unwrap();

      dispatch(loginSuccess(res.data.user));

      console.log("✅ Logged in:", res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" {...register("email")} />
                <FieldError>{errors.email?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
            </FieldSet>

            <Field orientation="horizontal">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <>
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor="rememberMe" className="font-normal">
                      Remember me
                    </FieldLabel>
                  </>
                )}
              />
            </Field>

            {error && (
              <p className="text-red-500">
                {(error as any).data?.message || "Something went wrong"}
              </p>
            )}

            <Button disabled={isLoading} type="submit" className="mt-4 w-full">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
