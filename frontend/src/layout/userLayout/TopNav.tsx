import Image from "@/components/Image";
import { useTheme } from "@/providers/themeContext";
import { Icon } from "@iconify/react";
import { useState } from "react";
import TopnavActions from "./TopnavActions";
import useAuthStore from "@/store/useAuthStore";

export default function TopNav() {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [actions, showActions] = useState<boolean>(false);
  // Get authenticated user details from the store
  const { user } = useAuthStore();
  
  // Use user details if available, otherwise fallback to defaults
  const full_name = user?.fullName || "Guest";
  const email = user?.email || "Not signed in";

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleActionsToggle = () => {
    showActions((prev) => !prev);
  };

  return (
    <div className="absolute top-0 left-0 z-50 w-full px-3 md:px-12 py-3 bg-white text-black flex items-center justify-between">
      <h1>Divvy</h1>

      <aside className="flex items-center gap-4 md:gap-6">
        <Icon icon="basil:notification-on-outline" width={24} height={24} className="hidden md:block" />
        <Icon role="button" icon={theme === "dark" ? "noto-v1:sun" : "logos:moon"} width={24} height={24} onClick={handleToggle} className="cursor-pointer" />

        <span
          className="relative flex items-center gap-2 md:gap-4 cursor-pointer"
          onClick={handleActionsToggle}
        >
          <Image src="/avatar.svg" alt="Avatar" width={48} height={48} className="rounded-full" />
          <span className="hidden md:flex flex-col">
            <h3>{full_name}</h3>
            <p className="opacity-65">{email}</p>
          </span>
          <Icon icon="line-md:chevron-down" width={24} height={24} />
        </span>
      </aside>

      <TopnavActions
        show={actions}
        setShow={handleActionsToggle}
      />
    </div>
  );
}
