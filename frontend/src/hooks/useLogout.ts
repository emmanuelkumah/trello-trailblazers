import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import { USER_ENDPOINTS } from "../api/_endpoints";
import { postFunction } from "@/api/apiFunctions";
import { toast } from "sonner";

export const useLogout = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      return await postFunction("logout endpoint here", "logout");
    },
    onSuccess: () => {
      removeCookie("token", { path: "/" });
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error("Failed to log out. Try again.");
      console.error("Logout Error:", error);
    },
  });

  return { logout, isPending };
};
