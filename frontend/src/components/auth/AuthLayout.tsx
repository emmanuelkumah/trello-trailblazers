import type React from "react";

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
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#FFF8F0] dark:bg-[#1E1E1E]">
      {/* Left side - Form */}
      <section className="w-full max-w-7xl mx-auto md flex overflow-hidden gap-6 p-6">
        <div className="w-full md:w-1/2 max-w-lg md:max-w-full mx-auto flex items-center justify-center bg-white dark:bg-[#0F0F0F] rounded-4xl shadow-md">
          <div className="w-full max-w-md h-[75vh] py-8">{children}</div>
        </div>

        {/* Right side - Colorful background with message */}
        <div className="hidden md:block md:w-1/2 bg-black relative overflow-hidden rounded-4xl">
          {/* Colorful abstract shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/auth/auth_bg.svg"
              alt="colorful pattern"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-center p-12 text-white z-10 bg-black/50 backdrop-blur-lg">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg">{subtitle}</p>
            {/* Decorative dot */}
            <div className="absolute bottom-8 left-8 flex opacity-60 hover:opacity-100 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-[#220066]" />
              <div className="w-6 h-6 rounded-full bg-[#320194] -ml-[18px] -translate-y-[1px]" />
              <div className="w-6 h-6 rounded-full bg-[#220066] -ml-[18px] -translate-y-[2px]" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
