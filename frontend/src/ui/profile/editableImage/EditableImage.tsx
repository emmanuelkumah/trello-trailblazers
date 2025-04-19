import { useRef } from "react";
import { Camera } from "lucide-react";
import Image from "@/components/Image";

export default function EditableImage({
  src,
  editable,
  onChange,
}: {
  src: string;
  editable: boolean;
  onChange: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-[128px] h-[128px]">
      <Image
        src={src}
        width={128}
        height={126}
        alt="profile"
        className={`rounded-lg ${editable ? "cursor-pointer" : ""}`}
      />

      {editable && (
        <>
          {/* Camera Icon */}
          <button
            type="button"
            className="absolute -right-0.5 bottom-1 bg-floral dark:bg-ash-black dark:border rounded-full p-2 
                         hover:bg-platinum/50 hover:text-floral
                        w-8 h-8 flex items-center justify-center z-20"
            onClick={handleClick}
          >
            <Camera className="h-8 w-8" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
            className="hidden"
            accept="image/*"
          />
        </>
      )}
    </div>
  );
}
