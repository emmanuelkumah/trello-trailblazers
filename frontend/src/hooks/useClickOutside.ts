import { useEffect, useRef, RefObject } from "react";

type EventType = MouseEvent | TouchEvent;

export const useClickOutside = (
  onClickOutside: () => void,
  isActive: boolean
): RefObject<HTMLElement> => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: EventType) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    // Attach event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClickOutside, isActive]);

  return ref as RefObject<HTMLElement>;

}
