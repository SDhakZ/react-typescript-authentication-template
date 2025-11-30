import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVerifySignupMutation } from "../authApi";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { verifySignupSuccess } from "../authSlice";
export default function OTPVerification() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));
  const [verifySignup, { isLoading, error }] = useVerifySignupMutation();
  const email = useAppSelector((state) => state.auth.signup.email!);
  const expiresAt = useAppSelector((s) => s.auth.signup.expiresAt);

  const remaining = expiresAt! - Date.now();
  const [timeLeft, setTimeLeft] = useState<number>(
    Math.floor(remaining / 1000)
  );

  useEffect(() => {
    if (remaining <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remaining]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const handleChange = (value: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Focus previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    const newOtp = [...otp];
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastIndex = Math.min(digits.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");

    if (otpString.length === 6) {
      const user = await verifySignup({ email, otpCode: otpString }).unwrap();
      dispatch(verifySignupSuccess({ user: user.data.user }));
      console.log("OTP verification successful");
      navigate("/client-list");
    } else {
      console.log("Invalid OTP");
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full px-6 space-y-6 flex flex-col justify-center items-center">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
          <p className="text-sm text-gray-400">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-gray-300">{email}</span>
          </p>
          <p
            className={`text-xs font-medium ${
              timeLeft <= 60 ? "text-red-400" : "text-gray-500"
            }`}
          >
            Code expires in {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-700">
              {(error as any).data?.message || "Something went wrong"}
            </p>
          </div>
        )}

        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:outline-none transition"
              disabled={isLoading}
            />
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className="w-full max-w-[200px]"
          size="lg"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="text-center text-sm">
          <p className="text-gray-400">
            Didn't receive the code?{" "}
            <button className="text-blue-400 hover:text-blue-300 hover:underline font-medium">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
