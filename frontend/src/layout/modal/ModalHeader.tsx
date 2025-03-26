import { Icon } from "@iconify/react";
import { ModalProps } from "../../types";
import { Fragment, useCallback, useEffect } from "react";

type ModalHeaderTypes = Pick<
  ModalProps,
  "title" | "desc" | "isSideModal" | "closeModal" | "hasBorder"
>;

export default function ModalHeader({
  title,
  desc,
  isSideModal,
  hasBorder,
  closeModal,
}: ModalHeaderTypes) {
  // Use useCallback to memoize the function and avoid unnecessary re-renders
  const handleModalClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleModalClose);
    return () => {
      window.removeEventListener("keydown", handleModalClose);
    };
  }, [handleModalClose]);

  return (
    <Fragment>
      {isSideModal ? (
        <>
          <button
            type="button"
            className="p-1.5 text-white-900 cursor-pointer border border-white-900 rounded-md flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            <Icon icon="ri:skip-right-line" width={24} />
          </button>
          <span className="flex">
            <h1 className="!text-[5em]">{title}</h1>
          </span>
        </>
      ) : (
        <header
          className={`flex items-start justify-between border-b py-2 ${hasBorder ? "border-gray-400" : "border-none"}`}
        >
          <span className="flex flex-col">
            <h3>{title}</h3>
            {desc && (
              <div className="-mt-2 w-full md:w-[80%]">
                <p>{desc}</p>
              </div>
            )}
          </span>

          <button className="cursor-pointer" onClick={closeModal}>
            <Icon icon="iconoir:cancel" width={24} />
          </button>
        </header>
      )}
    </Fragment>
  );
}
