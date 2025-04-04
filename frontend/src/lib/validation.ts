import { z } from "zod";

// Login form schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Registration form schema
export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    country: z.string().min(1, "Please select a country"),
    stateRegion: z.string().min(1, "Please select a state/region"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Reset password email schema
export const resetPasswordEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// OTP verification schema
export const otpVerificationSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter a valid OTP")
    .max(6, "Please enter a valid OTP"),
});

// New password schema
export const newPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Export types for use with react-hook-form
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordEmailValues = z.infer<typeof resetPasswordEmailSchema>;
export type OtpVerificationValues = z.infer<typeof otpVerificationSchema>;
export type NewPasswordValues = z.infer<typeof newPasswordSchema>;
