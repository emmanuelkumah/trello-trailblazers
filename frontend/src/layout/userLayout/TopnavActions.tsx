import Actions from "@/components/actions";
import logout from "@/lib/logout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ActionTypes = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function TopnavActions({ show, setShow }: ActionTypes) {
  const navigate = useNavigate();

  const actions = [
    { id: "profile-settings", icon: "grommet-icons:user-settings", label: "Profile Settings" },
    { id: "logout", icon: "solar:logout-3-broken", label: "Log Out" },
  ];

  const handleActionClick = async (actionId: string) => {
    switch (actionId) {
      case "profile-settings":
        navigate("/user/profile");
        break;
      case "logout":
        toast.loading("Logging out...");
        const success = await logout();
        
        if (success) {
          toast.success("Logged out successfully");
        } else {
          toast.error("Logout failed on server, but you've been logged out locally");
        }
        
        navigate("/", { replace: true });
        break;
      default:
        break;
    }
  };

  return (
    <div className="absolute right-3 md:right-10 mt-18">
      <Actions
        actions={actions}
        onActionClick={(action) => handleActionClick(action.id as string)}
        show={show}
        setShow={setShow}
        positionThreshold={500}
      />
    </div>
  );
}