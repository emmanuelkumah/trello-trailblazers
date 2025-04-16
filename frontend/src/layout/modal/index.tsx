import { Fragment, useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import { ModalProps } from "../../types";
import ModalHeader from "./ModalHeader";

export default function Modal({
  children,
  show,
  title,
  desc,
  isSideModal,
  hasBorder,
  isSmall,
  closeModal,
}: ModalProps) {
  const [delayShow, setDelayShow] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setDelayShow(true), 250);
      return () => clearTimeout(timer);
    } else {
      setDelayShow(false);
    }
  }, [show]);

  return (
    <Fragment>
      <Backdrop show={show} />
      {isSideModal ? (
        <div
          className={`w-[50%] h-screen px-[3%] z-[999] py-4 fixed top-0 right-0 flex flex-col items-start border border-slate-300 bg-white dark:bg-black transition-all duration-500
            ${delayShow ? "translate-x-0" : "translate-x-[100%]"}
            `}
        >
          <ModalHeader
            title={title}
            desc={desc}
            closeModal={closeModal}
            isSideModal={isSideModal}
          />
          {children}
        </div>
      ) : (
        <div
          id="modal"
          className={`relative h-max max-h-[90%] z-[999] bg-transparent rounded-3xl overflow-x-hidden transition-all duration-500 ease-out 
          ${delayShow ? "seen" : "not-seen"}
          ${isSmall ? "max-md:w-[80%] w-[45%] lg:w-[25%]" : "w-[95%] md:max-w-2xl"}
          `}
        >
          <div className="w-full h-full px-[3%] py-6 flex flex-col gap-4 bg-white dark:bg-black overflow-x-hidden">
            <ModalHeader title={title} desc={desc} closeModal={closeModal} hasBorder={hasBorder} />
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
