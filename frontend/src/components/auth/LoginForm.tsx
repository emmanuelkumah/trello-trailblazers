import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validation";
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
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";

const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [_, setCookie] = useCookies(["divvy_token"]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: loginMutate } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      clearError();
      const authResponse = await loginMutate({
        email: data.email,
        password: data.password,
      });

      if (authResponse?.token) {
        // Set the token cookie here
        setCookie("divvy_token", authResponse.token, {
          path: "/",
          secure: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        console.log("Token set:", authResponse.token);
      }

      console.log("Logged in!", authResponse);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* --- email field --- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  {...field}
                  className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- password field --- */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  {...field}
                  className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
          <Link
            to="/auth/password-recovery"
            className="text-xs text-red-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="mx-auto w-52 p-2 cursor-pointer bg-red-400 hover:bg-red-500 transition-colors duration-300 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
