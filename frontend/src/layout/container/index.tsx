import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[120em] h-screen overflow-hidden mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
