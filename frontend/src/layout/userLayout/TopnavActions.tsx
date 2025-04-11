import Actions from "@/components/actions";
// import { useLogout } from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";

type ActionTypes = {
  show: boolean;
  setShow: (show: boolean) => void;
  // actionId: string;
};

export default function TopnavActions({ show, setShow }: ActionTypes) {
  const navigate = useNavigate();
  // const { logout } = useLogout();

  const actions = [
    { id: "profile-settings", icon: "grommet-icons:user-settings", label: "Profile Settings", },
    { id: "logout", icon: "solar:logout-3-broken", label: "Log Out" },
  ];

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case "profile-settings":
        navigate("/user/profile");
        break;
      case "logout":
        // logout();
        navigate("/");
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
        // isIconReverse
        // buttonClass={actions}
      />
    </div>
  )
}
