import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  stateRegion: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (
    userData: Omit<User, "id"> & { password: string }
  ) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  setNewPassword: (email: string, password: string) => Promise<void>;
  clearError: () => void;
}

// Create the store
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // In a real app, these would make API calls
      login: async (email: string, password: string) => {
        if (!email || !password) return;
        try {
          set({ isLoading: true, error: null });
          const res = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
          });
          if (!res.data) throw new Error(`${res.status} ${res.statusText}`);

          const user: User = {
            id: res.data.id,
            fullName: res.data.fullName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            country: res.data.country,
            stateRegion: res.data.stateRegion,
          };
          localStorage.setItem("user", JSON.stringify(user));
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      register: async (userData) => {
        if (!userData.email || !userData.password) return;
        try {
          set({ isLoading: true, error: null });

          const res = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              fullname: userData.fullName,
              phone_number: userData.phoneNumber,
              country: userData.country,
              state: userData.stateRegion,
              email: userData.email,
              password: userData.password,
            }
          );
          if (!res.data) throw new Error(`${res.status} ${res.statusText}`);

          const user: User = {
            id: res.data.id,
            fullName: res.data.fullName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            country: res.data.country,
            stateRegion: res.data.stateRegion,
          };
          localStorage.setItem("user", JSON.stringify(user));
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await axios.post("http://localhost:5000/api/auth/logout");

          localStorage.setItem("user", JSON.stringify(null));
          set({ user: null, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
        set({ user: null, isAuthenticated: false });
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true, error: null });

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // For demo purposes, we'll just check if the email contains "error"
          if (email.includes("error")) {
            throw new Error("Email not found");
          }

          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      verifyOTP: async (email: string, otp: string) => {
        console.log(email);
        try {
          set({ isLoading: true, error: null });

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // For demo purposes, we'll just check if the OTP is "123456"
          if (otp !== "123456") {
            throw new Error("Invalid OTP");
          }

          set({ isLoading: false });
          return true;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
          return false;
        }
      },

      setNewPassword: async (email: string, password: string) => {
        console.log(email, password);
        try {
          set({ isLoading: true, error: null });

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "divvy-auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
