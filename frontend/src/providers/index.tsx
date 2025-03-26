import { ReactNode } from "react";
import { ThemeProvider } from "./themeContext";
import { Toaster } from "sonner";
import ReactQueryProvider from "./reactQueryProvider";

export default function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Toaster position="top-center" visibleToasts={1} />
      <ThemeProvider>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </ThemeProvider>
    </>
  )
}