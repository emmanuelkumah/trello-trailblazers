import { HTMLAttributes, ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
  tight?: boolean;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Wrapper({ children, tight, className }: WrapperProps) {
  return (
    <div
      className={`w-full h-full flex mx-auto ${className}`}
      style={{
        maxWidth: tight ? "48em" : "120em",
        padding: tight ? "0 2%" : "",
      }}
    >
      {children}
    </div>
  );
}
