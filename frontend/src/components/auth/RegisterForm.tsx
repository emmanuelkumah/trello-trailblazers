import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "@/store/useAuthStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Mock data for dropdowns
const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
];

const states = {
  us: [
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    { value: "tx", label: "Texas" },
  ],
  ca: [
    { value: "on", label: "Ontario" },
    { value: "qc", label: "Quebec" },
    { value: "bc", label: "British Columbia" },
  ],
  uk: [
    { value: "eng", label: "England" },
    { value: "sco", label: "Scotland" },
    { value: "wal", label: "Wales" },
  ],
  au: [
    { value: "nsw", label: "New South Wales" },
    { value: "qld", label: "Queensland" },
    { value: "vic", label: "Victoria" },
  ],
};

const RegisterForm: React.FC = () => {
  const {
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuthStore();
  const [selectedCountry, setSelectedCountry] = React.useState("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      country: "",
      stateRegion: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    clearError();
    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = data;
    await registerUser(userData);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    form.setValue("country", value, { shouldValidate: true });
    form.setValue("stateRegion", "", { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 (555) 123-4567"
                  className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCountryChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stateRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State/Region</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedCountry}
                >
                  <FormControl>
                    <SelectTrigger className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300">
                      <SelectValue placeholder="Select State/Region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCountry &&
                      states[selectedCountry as keyof typeof states]?.map(
                        (state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
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
          control={form.control}
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
          <div className="bg-red-50 text-red-400 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="text-xs text-gray-500">
          By clicking Register, you agree to our{" "}
          <a href="#" className="text-red-400 hover:underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-red-400 hover:underline">
            Privacy Policy
          </a>
          .
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            type="submit"
            className="mx-auto w-52 p-2 cursor-pointer bg-red-400 hover:bg-red-500 transition-colors duration-300 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
