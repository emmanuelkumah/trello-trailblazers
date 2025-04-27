import { AUTH_ENDPOINTS } from "@/api/endpoints";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  stateRegion: string;
  profileImage?: string;
  groups?: string[];
}

interface AuthResponse {
  user: User;
  token: string;
}

export type RegisterData = Omit<User, "id"> & { password: string };

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<AuthResponse | null>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  setNewPassword: (email: string, password: string) => Promise<boolean>;
  clearError: () => void;
}

const baseUrl: string = import.meta.env.VITE_API_URL;

// Helper to extract error message from various error types
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    return error.response.data.message;
  }
  return error instanceof Error ? error.message : "An error occurred";
};

const mapResponseToUser = (data: any): User => {
  return {
    id: data.id,
    fullName: data.fullname,
    email: data.email,
    phoneNumber: data.phone_number,
    country: data.country,
    stateRegion: data.state,
    profileImage: data.profileImage,
    groups: data.groups
  };
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: !!cookies.get("divvy_token"),
      isLoading: false,
      error: null,

      login: async (email, password) => {
        if (!email || !password) {
          set({ error: "Email and password are required" });
          return null;
        }

        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(`${baseUrl}${AUTH_ENDPOINTS.LOGIN}`, {
            email,
            password,
          });

          if (!res.data || !res.data.user || !res.data.user.token) {
            throw new Error("Invalid response format");
          }

          const user = mapResponseToUser(res.data.user);
          const token = res.data.user.token;

          // Save token in cookies
          cookies.set("divvy_token", token, { path: "/" });

          toast.success(res.data.message || "Login successful");
          set({ user, isAuthenticated: true, isLoading: false });

          return { user, token };
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(`Login failed: ${message}`);
          set({ error: message, isLoading: false });
          return null;
        }
      },

      register: async (userData) => {
        if (!userData.email || !userData.password) {
          set({ error: "Email and password are required" });
          return false;
        }

        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(`${baseUrl}${AUTH_ENDPOINTS.REGISTER}`, {
            fullname: userData.fullName,
            phone_number: userData.phoneNumber,
            country: userData.country,
            state: userData.stateRegion,
            email: userData.email,
            password: userData.password,
          });

          if (!res.data || !res.data.user || !res.data.user.token) {
            throw new Error("Invalid response format");
          }

          const user = mapResponseToUser(res.data.user);
          const token = res.data.user.token;

          cookies.set("divvy_token", token, { path: "/" });

          toast.success(res.data.message || "Registration successful");
          set({ user, isAuthenticated: true, isLoading: false });

          return true;
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(`Registration failed: ${message}`);
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: () => {
        const { user } = useAuthStore.getState();

        toast.success("Logged out");

        if (user) {
          // Preserve only fullName
          set({
            user: {
              id: "",
              fullName: user.fullName,
              email: "",
              phoneNumber: "",
              country: "",
              stateRegion: "",
              profileImage: undefined,
              groups: [],
            },
            isAuthenticated: false,
          });
        } else {
          set({ user: null, isAuthenticated: false });
        }
      },


      resetPassword: async (email) => {
        if (!email) {
          set({ error: "Email is required" });
          return false;
        }

        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(`${baseUrl}${AUTH_ENDPOINTS.RESET_PASSWORD}`, {
            email,
          });

          toast.success(res.data?.message || "Password reset link sent");
          set({ isLoading: false });
          return true;
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
          set({ error: message, isLoading: false });
          return false;
        }
      },

      verifyOTP: async (email, otp) => {
        if (!email || !otp) {
          set({ error: "Email and OTP are required" });
          return false;
        }

        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(`${baseUrl}${AUTH_ENDPOINTS.VERIFY_OTP}`, {
            email,
            otp,
          });

          toast.success(res.data?.message || "OTP verified");
          set({ isLoading: false });
          return true;
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
          set({ error: message, isLoading: false });
          return false;
        }
      },

      setNewPassword: async (email, password) => {
        if (!email || !password) {
          set({ error: "Email and password are required" });
          return false;
        }

        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(`${baseUrl}${AUTH_ENDPOINTS.RESET_PASSWORD}`, {
            email,
            password,
          });

          toast.success(res.data?.message || "Password updated");
          set({ isLoading: false });
          return true;
        } catch (error) {
          const message = getErrorMessage(error);
          toast.error(message);
          set({ error: message, isLoading: false });
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "divvy-user-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;