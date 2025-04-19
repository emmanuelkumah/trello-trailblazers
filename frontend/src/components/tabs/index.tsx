import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface Tab {
  label: string;
  component: React.ReactNode;
  inActive?: boolean;
}

interface TabsProps {
  position?: "left" | "center" | "right";
  tabs: Tab[];
  activateParams?: boolean;
  onTabChange?: (index: number) => void;
  activeIndex?: number;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  position = "center",
  activateParams = false,
  onTabChange,
  activeIndex,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getFormattedLabel = (label: string) =>
    label.toLowerCase().replace(/\s+/g, "-");

  // Get initial active tab from URL or default to first tab
  const initialTabLabel = activateParams ? searchParams.get("tab") : null;
  const initialActiveTab = initialTabLabel
    ? tabs.findIndex((tab) => getFormattedLabel(tab.label) === initialTabLabel)
    : 0;

  // Use the activeIndex prop if provided, otherwise use internal state
  const [internalActiveTab, setInternalActiveTab] = useState(
    initialActiveTab !== -1 ? initialActiveTab : 0
  );
  
  // Determine which activeTab to use
  const activeTab = activeIndex !== undefined ? activeIndex : internalActiveTab;

  useEffect(() => {
    if (activateParams) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("tab", getFormattedLabel(tabs[activeTab].label));
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [activeTab, activateParams, setSearchParams, tabs, searchParams]);

  const handleTabClick = (index: number) => {
    if (tabs[index].inActive === true)
      return toast.warning("Hang tight! This feature is coming soon.");
    
    // If we have an external controller, use the callback
    if (onTabChange) {
      onTabChange(index);
    } else {
      // Otherwise use internal state
      setInternalActiveTab(index);
    }
    
    if (activateParams) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("tab", getFormattedLabel(tabs[index].label));
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const positionClass =
    position === "left"
      ? "mr-auto"
      : position === "right"
        ? "ml-auto"
        : "mx-auto";

  return (
    <div>
      <section
        className={`relative flex w-max px-1 py-2 bg-gray-100 dark:bg-ash-black/80 ${positionClass} rounded-full`}
      >
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="button"
            key={tab.label}
            className={`relative w-24 sm:w-32 whitespace-nowrap lg:w-42 py-0.5 text-xs sm:text-sm lg:text-base capitalize z-10 cursor-pointer transition-colors ${
              activeTab === index
                ? "font-medium text-black "
                : "font-medium text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
        <div
          className="absolute top-[0.15em] left-0.5 w-24 sm:w-32 lg:w-42 h-[88%] rounded-full bg-mustard dark:bg-sunglow transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(${activeTab * 101}%)` }}
        />
      </section>
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Tabs;
