import { Fragment, useEffect, useState, ReactNode } from "react";
import Backdrop from "./Backdrop";
import { useClickOutside } from "../../hooks/useClickOutside";
import ModalHeader from "./ModalHeader";

interface FloatSideModalProps {
  show: boolean;
  closeModal: () => void;
  title?: string;
  desc?: string;
  children: ReactNode;
}

export default function FloatSideModal({
  show,
  closeModal,
  title,
  desc,
  children,
}: FloatSideModalProps) {
  const [delayShow, setDelayShow] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setDelayShow(true), 250);
      return () => clearTimeout(timer);
    } else {
      setDelayShow(false);
    }
  }, [show]);

  const ref = useClickOutside(closeModal, show);

  return (
    <Fragment>
      <Backdrop show={show} />
      <div
        className={`
          w-full max-w-2xl h-fit max-h-[95%] overflow-x-hidden rounded-xl z-[999] py-4 px-4 fixed top-6 right-6 flex flex-col bg-white dark:bg-brand-800 dark:text-gray-200
          transition-all duration-500 ease-out
          ${delayShow ? "translate-x-0" : "translate-x-[120%]"}
        `}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <ModalHeader title={title} desc={desc} closeModal={closeModal} />
        <hr className="my-2" />

        {children}
      </div>
    </Fragment>
  );
}
