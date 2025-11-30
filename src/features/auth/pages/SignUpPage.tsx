import SignUpForm from "../components/SignUpForm";
import { useAppSelector } from "@/hooks/hooks";
import OTPVerification from "../components/OTPVerification";

export default function SignupPage() {
  const step = useAppSelector((s) => s.auth.signup.step);
  return (
    <>
      {step === "idle" && <SignUpForm />}
      {step === "otp" && <OTPVerification />}
    </>
  );
}
