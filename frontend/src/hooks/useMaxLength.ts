import { useState, ChangeEvent } from "react";

export const useMaxLength = ({
  maxLength,
  initialValue = "",
}: {
  maxLength?: number;
  initialValue?: string;
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const [charCount, setCharCount] = useState<number>(initialValue.length);

  // Now accepts events from both input and textarea elements
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;

    // Only update if maxLength is not set or within limit
    if (!maxLength || newValue.length <= maxLength) {
      setValue(newValue);
      setCharCount(newValue.length);
    }
  };

  return {
    value,
    charCount,
    handleChange,
    remainingChars: maxLength ? maxLength - charCount : undefined,
  };
};
