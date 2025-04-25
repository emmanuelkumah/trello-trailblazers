import { useTheme } from "@/providers/themeContext";
import { Icon } from "@iconify/react";
import type React from "react";
import Image from "../Image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="flex items-center justify-center w-full h-screen bg-floral dark:bg-ash-black">
      {/* Left side - Form */}
      <section className="w-full h-full mx-auto md flex overflow-hidden gap-6 p-6">
        <div className="w-full md:w-1/2 max-w-lg md:max-w-full mx-auto flex items-center justify-center bg-white dark:bg-black rounded-4xl shadow-md">
          <div className="w-full max-w-md h-full py-8">{children}</div>
        </div>

        {/* Right side - Colorful background with message */}
        <div className="hidden md:block md:w-1/2 bg-black relative overflow-hidden rounded-4xl">
          {/* Colorful abstract shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/auth/auth_bg.svg"
              alt="colorful pattern"
              width={0}
              height={0}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text overlay */}
          <div className="absolute top-0 left-0 w-full h-full inset-0 flex flex-col justify-center p-12 text-white z-10 bg-black/50 ">
            <h1 className="text-6xl font-bold mt-auto">{title}</h1>
            <p className="text-lg mb-12">{subtitle}</p>
            <Icon
              role="button"
              icon={theme === "dark" ? "noto-v1:sun" : "logos:moon"}
              width={32}
              height={32}
              onClick={handleToggle}
              className="cursor-pointer"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
