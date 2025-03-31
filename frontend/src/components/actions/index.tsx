import React, { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";

export interface Action {
  id: string | number;
  icon?: string | React.ReactNode;
  label: string;
}

interface ActionsProps {
  actions?: Action[];
  show: boolean;
  setShow: (show: boolean) => void;
  positionThreshold?: number;
  containerClass?: string;
  buttonClass?: string;
  isIconReverse?: boolean;
  onActionClick?: (action: Action) => void;
}

/**
 * Example usage:
 *
 * <Actions
 *   actions={[
 *     { id: "1", icon: "mdi:home", label: "Home" },
 *     { id: "2", icon: "mdi:settings", label: "Settings" }
 *   ]}
 *   show={true}
 *   setShow={(show) => console.log(show)}
 *   onActionClick={(action) => console.log(action)}
 * />
 */

export default function Actions({
  actions = [],
  show,
  setShow,
  positionThreshold = 0.7,
  containerClass = "",
  buttonClass = "",
  isIconReverse = false,
  onActionClick,
}: ActionsProps) {
  const actionRef = useRef<HTMLDivElement | null>(null);
  const [isBottom, setIsBottom] = useState(false);

  const checkPosition = useCallback(() => {
    if (actionRef.current) {
      const rect = actionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setIsBottom(rect.top > viewportHeight * positionThreshold);
    }
  }, [positionThreshold]);

  useEffect(() => {
    if (!show) return;

    checkPosition();
    const handleResizeOrScroll = checkPosition;

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);

    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, [show, checkPosition]);

  const handleActionClick = (action: Action) => {
    if (onActionClick) onActionClick(action);
    setShow(false);
  };

  return (
    <div
      ref={actionRef}
      className={`absolute ${isBottom ? "bottom-2" : "-top-2"} right-full w-48 h-max py-2 flex flex-col gap-y-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-gray-500 z-50 rounded-xl shadow-md transition-all duration-150 ease-in-out 
        ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"} 
        ${containerClass}`}
      aria-haspopup="true"
      aria-expanded={show}
      style={{
        transformOrigin: isBottom ? "bottom left" : "top left",
      }}
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={`w-full flex gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-600 transition ${isIconReverse ? "items-start w-max flex-row-reverse" : "items-center flex-row"} ${buttonClass}`}
          onClick={() => handleActionClick(action)}
        >
          {action.icon ? (
            <span className="text-base">
              {typeof action.icon === "string" ? (
                <Icon icon={action.icon} width={24} height={24} />
              ) : (
                action.icon
              )}
            </span>
          ) : null}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
