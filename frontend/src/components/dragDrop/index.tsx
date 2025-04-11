import React, { useState, forwardRef, type ForwardedRef, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

// Define the drag-drop styles with proper typing
const dragDropStyles = cva(
  "relative flex flex-col items-center justify-center border-2 rounded-full p-4 cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        plain: "border-gray-300",
        colored: "border-light-red",
      },
      state: {
        idle: "border-gray-300 text-gray-500 dark:border-neutral-600 dark:text-gray-400",
        active: "border-light-red bg-green-50 text-green-700",
      },
      size: {
        full: "w-full",
        half: "w-1/2",
        compact: "w-52 h-52",
      },
    },
    defaultVariants: {
      state: "idle",
      variant: "plain",
      size: "full",
    },
  }
);

// Extract variant types from the cva function
type DragDropStylesProps = VariantProps<typeof dragDropStyles>;

// Define props interface with proper TypeScript types
interface DragAndDropFileProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  Omit<DragDropStylesProps, "state"> {
  onFileDrop: (files: File | File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  icon?: string;
  className?: string;
}

type DragState = "idle" | "active";

const DragAndDropFile = forwardRef<HTMLDivElement, DragAndDropFileProps>(
  (
    {
      onFileDrop,
      accept,
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      icon,
      variant = "plain",
      size = "full",
      className,
      ...props
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [dragState, setDragState] = useState<DragState>("idle");
    const [fileName, setFileName] = useState<string>(
      "Click to upload or drag and drop"
    );
    const [file, setFile] = useState<File | null>(null);

    // Common file validation logic
    const validateFiles = (files: File[]): File[] => {
      return files.filter((file) => {
        if (accept && accept.length > 0) {
          // Handle comma-separated accept values
          const acceptTypes = accept.split(',').map(type => type.trim());
          const isValidType = acceptTypes.some(type => {
            // Handle MIME types with wildcards like "image/*"
            if (type.includes('*')) {
              const [category] = type.split('/');
              return file.type.startsWith(`${category}/`);
            }
            // Handle file extensions like ".pdf"
            if (type.startsWith('.')) {
              return file.name.toLowerCase().endsWith(type.toLowerCase());
            }
            return file.type === type;
          });

          if (!isValidType) {
            toast.error("Invalid file type.");
            return false;
          }
        }
        
        if (maxSize && file.size > maxSize) {
          toast.error(
            `File size exceeds the limit of ${(maxSize / 1024 / 1024).toFixed(1)}MB.`
          );
          return false;
        }
        return true;
      });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState("active");
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState("idle");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState("idle");

      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
        return;
      }

      const files = Array.from(e.dataTransfer.files);
      const validFiles = validateFiles(files);

      if (validFiles.length > 0) {
        const selectedFile = validFiles[0];
        setFileName(selectedFile.name);
        setFile(selectedFile);
        onFileDrop(multiple ? validFiles : selectedFile);
      }
    };

    const handleClick = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept || "";
      input.multiple = multiple;

      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) {
          return;
        }

        const files = Array.from(target.files);
        const validFiles = validateFiles(files);

        if (validFiles.length > 0) {
          const selectedFile = validFiles[0];
          setFileName(selectedFile.name);
          setFile(selectedFile);
          onFileDrop(multiple ? validFiles : selectedFile);
        }
      };

      input.click();
    };

    // Function to handle file removal with proper event typing
    const handleRemoveFile = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent triggering the parent onClick
      setFile(null);
      setFileName("Drag and drop, or Click to add");
      onFileDrop(null);
    };

    return (
      <div
        ref={ref}
        className={cn(
          dragDropStyles({ state: dragState, variant, size }),
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        {...props}
      >
        {/* Delete Icon */}
        {file && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Remove file"
          >
            <Icon icon="tabler:trash" width={24} />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          {icon && (
            <Icon icon={icon} width={56} className="text-green-650 mb-2" />
          )}
          <p className="font-medium text-sm">
            {fileName}
            {file && (
              <span className="block text-xs text-gray-500 mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </span>
            )}
          </p>
        </div>
      </div>
    );
  }
);

DragAndDropFile.displayName = "DragAndDropFile";

export default DragAndDropFile;