import { Icon } from "@iconify/react";


export default function ActionsModal() {
  return (
    <div className="block md:hidden">
      <>
        <button
          type="button"
          role="button"
          className="fixed bottom-6 right-6 z-50 w-15 h-15 flex items-center justify-center rounded-full bg-light-red shadow-md"
        >
          <Icon icon="tdesign:focus" width={32} height={32} color="#f2f2f2" />
        </button>
      </>
    </div>
  )
}
