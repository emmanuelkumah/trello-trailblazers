import axios from "axios";
import { AUTH_ENDPOINTS } from "@/api/endpoints";
import useAuthStore from "@/store/useAuthStore";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL;

const logout = async (): Promise<boolean> => {
  const clearAuth = useAuthStore.getState().logout;

  try {
    await axios.post(`${baseURL}${AUTH_ENDPOINTS.LOGOUT}`);
    toast.success("Server logout successful");
  } catch (error) {
    console.error("Logout API failed:", error);
    toast.error("Server logout failed. You have been logged out locally.");
  } finally {
    clearAuth();
  }

  return true;
};

export default logout;
