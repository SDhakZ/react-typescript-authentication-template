import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginFormValues } from "../authFormSchemas";
import { LoginFormSchema } from "../authFormSchemas";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@/components/google-icon";
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
import { toast } from "sonner";
export default function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }).unwrap();
      toast.success(
        <span>
          Successfully logged in as{" "}
          <span className="text-sky-600 font-medium">{data.email}</span>
        </span>
      );

      dispatch(loginSuccess(res.data.user));
      navigate("/client-list");
    } catch (err) {
      let error = err as any;
      console.log("Login error:", error.data.message);
      if (error?.data?.message === "Invalid email or password") {
        console.log("Showing toast for invalid credentials");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-sm rounded-lg shadow p-6">
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
            <div className="flex flex-col -mt-2 gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-4 dark:text-white w-full dark:bg-[#7C3AED] dark:hover:bg-[#6B21A8] cursor-pointer"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </FieldGroup>
        </form>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-center gap-2">
            <hr className="grow border-t border-gray-500" />
            <span className="text-center text-gray-500">or</span>
            <hr className="grow border-t border-gray-500" />
          </div>

          <Button
            type="button"
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
            }}
            className="flex dark:text-white dark:hover:bg-[#272729] cursor-pointer gap-2 items-center dark:bg-[#131314] justify-center border px-4 py-5 rounded-md"
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
          <p className="text-center">
            Dont have an account?{" "}
            <a href="/signup" className="text-sky-600">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
