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
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
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
            fullName: res.data.fullName || res.data.fullname,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber || res.data.phone_number,
            country: res.data.country,
            stateRegion: res.data.stateRegion || res.data.state,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred during login",
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
            id: res.data.id || res.data._id,
            fullName: res.data.fullName || res.data.fullname || userData.fullName,
            email: res.data.email || userData.email,
            phoneNumber: res.data.phoneNumber || res.data.phone_number || userData.phoneNumber,
            country: res.data.country || userData.country,
            stateRegion: res.data.stateRegion || res.data.state || userData.stateRegion,
          };
          
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred during registration",
            isLoading: false,
          });
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null });
          await axios.post("http://localhost:5000/api/auth/logout");
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred during logout",
            isLoading: false,
          });
          // Still logout the user locally even if API call fails
          set({ user: null, isAuthenticated: false });
        }
      },

      resetPassword: async (email: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
            email
          });
          
          if (!res.data.success) {
            throw new Error(res.data.message || "Password reset request failed");
          }
          
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred during password reset",
            isLoading: false,
          });
        }
      },

      verifyOTP: async (email: string, otp: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
            email,
            otp
          });
          
          if (!res.data.success) {
            throw new Error(res.data.message || "Invalid OTP");
          }
          
          set({ isLoading: false });
          return true;
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred during OTP verification",
            isLoading: false,
          });
          return false;
        }
      },

      setNewPassword: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const res = await axios.post("http://localhost:5000/api/auth/set-password", {
            email,
            password
          });
          
          if (!res.data.success) {
            throw new Error(res.data.message || "Failed to set new password");
          }
          
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "An error occurred when setting new password",
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
