import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordEmailSchema,
  otpVerificationSchema,
  newPasswordSchema,
  type ResetPasswordEmailValues,
  type OtpVerificationValues,
  type NewPasswordValues,
} from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

// Step indicator component
const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex flex-col items-start space-y-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          {/* Step Indicator Circle */}
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold
              ${index + 1 === currentStep ? "bg-red-500 text-white" : ""}
              ${index + 1 < currentStep ? "bg-green-500 text-white" : ""}
              ${index + 1 > currentStep ? "bg-gray-300 text-gray-500" : ""}`}
          >
            {index + 1 < currentStep ? "✓" : index + 1}
          </div>

          {/* Step Title */}
          <p
            className={`text-sm font-medium ${
              index + 1 === currentStep
                ? "text-red-500"
                : index + 1 < currentStep
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {index === 0 && "Let's get your email"}
            {index === 1 && "Input Verification code"}
            {index === 2 && "Select a new password, and be on your way!"}
          </p>
        </div>
      ))}
    </div>
  );
};

const ForgotPasswordFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const {
    resetPassword,
    verifyOTP,
    setNewPassword,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  // Step 1: Email form
  const emailForm = useForm<ResetPasswordEmailValues>({
    resolver: zodResolver(resetPasswordEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Step 2: OTP form
  const otpForm = useForm<OtpVerificationValues>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Step 3: New password form
  const passwordForm = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitEmail = async (data: ResetPasswordEmailValues) => {
    clearError();
    try {
      await resetPassword(data.email);
      setEmail(data.email);
      setStep(2);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const onSubmitOTP = async (data: OtpVerificationValues) => {
    clearError();
    try {
      const success = await verifyOTP(email, data.otp);
      if (success) {
        setStep(3);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const onSubmitNewPassword = async (data: NewPasswordValues) => {
    clearError();
    try {
      await setNewPassword(email, data.password);
      // Redirect to login or show success message
      setStep(4);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg text-gray-500 dark:text-gray-200">
        Be at ease, we will walk you through the steps
      </h3>

      <StepIndicator currentStep={step} totalSteps={3} />

      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmitEmail)}
            className="space-y-4"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <Link
                to="/auth"
                className="text-sm text-gray-500 hover:underline"
              >
                Back to login
              </Link>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 rounded-full px-6"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmitOTP)}
            className="space-y-4"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input OTP</FormLabel>
                  <FormDescription>
                    We've sent a verification code to {email}
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit code"
                      className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                      type="number"
                      minLength={6}
                      maxLength={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-2">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      className="text-red-500 hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 rounded-full px-6"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 3 && (
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmitNewPassword)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
              <Button
                type="submit"
                className="bg-red-500 hover:bg-red-600 rounded-full px-6"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 4 && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Password Updated!</h3>
          <p className="text-sm text-gray-500">
            Your password has been successfully updated. You can now log in with
            your new password.
          </p>
          <Link to="/auth">
            <Button className="bg-red-500 hover:bg-red-600 mt-4 rounded-full px-6">
              Back to Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordFlow;
