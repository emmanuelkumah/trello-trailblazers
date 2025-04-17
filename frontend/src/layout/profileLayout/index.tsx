import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface ProfileLayoutProps {
  children?: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div>
      {/* Layout structure */}
      {children} {/* This will render the passed children, if any */}
      {/* The Outlet will render nested routes */}
      <Outlet />
    </div>
  );
}
