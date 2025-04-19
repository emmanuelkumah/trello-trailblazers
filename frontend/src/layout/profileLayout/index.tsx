import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface ProfileLayoutProps {
  children?: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="w-full h-full">
      {children}
      <Outlet />
    </div>
  );
}
