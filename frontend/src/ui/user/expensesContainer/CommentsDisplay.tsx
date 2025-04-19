import useDeviceSize from "@/hooks/useDeviceSize";
import { Icon } from "@iconify/react";


export default function CommentsDisplay() {
  const { isMobile } = useDeviceSize();
  return (
    <div className="relative w-full h-full bg-floral dark:bg-ash-black">
      <section
        role="presentation"
        className={`w-full h-full overflow-x-hidden mb-32
          ${isMobile ? "bg-black/10" : ""}
          `}
      >

      </section>

      <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-ash-black dark:border dark:border-gray-500 p-2 flex items-center gap-4">
        <textarea
          name=""
          id=""
          placeholder="Write a comment"
          className="w-full max-w-[75%] resize-none rounded-full  bg-gray-300 dark:bg-black/20 text-md pl-6 pt-1"
        >
        </textarea>
        <button type="button" role="button" className="w-10 h-10 flex items-center justify-center border border-light-red rounded-full">
          <Icon icon="pepicons-pencil:file" width={24} height={24} />
        </button>
        <button type="button" role="button" className="w-10 h-10 flex items-center justify-center text-white bg-light-red rounded-full">
          <Icon icon="carbon:send-alt-filled" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
