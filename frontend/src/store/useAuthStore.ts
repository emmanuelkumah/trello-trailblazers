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
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // In a real app, these would make API calls
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // For demo purposes, we'll just check if the email contains "error"
          if (email.includes("error")) {
            throw new Error("Invalid credentials");
          }

          // Mock user data
          const user: User = {
            id: "123",
            fullName: email.includes("franklin") ? "Franklin" : "New User",
            email,
            phoneNumber: "",
            country: "",
            stateRegion: "",
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null });

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // For demo purposes, we'll just check if the email contains "error"
          if (userData.email.includes("error")) {
            throw new Error("Email already in use");
          }

          // Mock user data with generated ID
          const user: User = {
            id: Math.random().toString(36).substring(2, 9),
            ...userData,
          };

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred",
            isLoading: false,
          });
        }
      },

      logout: () => {
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
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
