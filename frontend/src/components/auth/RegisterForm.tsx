import React, { useState } from "react";
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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Mock data for dropdowns

const RegisterForm: React.FC = () => {
  const {
    register: registerUser,
    isLoading,
    error,
    clearError,
  } = useAuthStore();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState<string[]>([]);

  const {
    data: countries,
    isLoading: isFetchingCountries,
    error: countriesError,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      axios
        .get("https://countriesnow.space/api/v0.1/countries")
        .then((res) => res.data.data),
  });

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
    console.log(data);
    const { confirmPassword, ...userData } = data;
    console.log(confirmPassword);

    await registerUser(userData);
  };

  const handleCountryChange = async (value: string) => {
    setSelectedCountry(value);
    form.setValue("country", value, { shouldValidate: true });
    form.setValue("stateRegion", "", { shouldValidate: false });
    setStates([]);

    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: value,
        }
      );

      if (response.data?.data?.states) {
        setStates(
          response.data.data.states.map(
            (s: { name: string; state_code: string }) => s.name
          )
        );
      } else {
        setStates([]);
      }
    } catch (error) {
      console.error("Failed to fetch states:", error);
      setStates([]);
    }
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
                    console.log("Selected country:", value);
                    field.onChange(value);
                    handleCountryChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full min-w-[200px] border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isFetchingCountries &&
                      countries?.map(
                        (country: {
                          iso2?: string;
                          iso3?: string;
                          country?: string;
                          cities?: string[];
                        }) => (
                          <SelectItem
                            key={country.country}
                            value={country.country || ""}
                          >
                            {country.country}
                          </SelectItem>
                        )
                      )}
                    {countriesError && <p>Error fetching countries</p>}
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
                    <SelectTrigger className="w-full min-w-[200px] border-none py-1 px-4 text-black outline-none focus:outline-none focus:border-none dark:text-gray-300">
                      <SelectValue placeholder="Select State/Region" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.isSubmitted && <FormMessage />}
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
