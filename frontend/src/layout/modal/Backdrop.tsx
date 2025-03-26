import { useEffect, useState } from "react";

export default function Backdrop({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) setVisible(true);
    else setTimeout(() => setVisible(false), 200);
  }, [show]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen transition-all duration-200 ease-in-out
        ${show ? "bg-black/40 dark:bg-white/10 backdrop-blur-[2px] z-[99]" : "bg-none dark:bg-none backdrop-blur-none"}
      `}
      style={{
        display: visible ? "block" : "none",
      }}
    />
  );
}
