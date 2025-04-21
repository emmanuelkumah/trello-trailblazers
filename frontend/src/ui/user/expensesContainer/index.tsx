import { Button } from "@/components/ui/button";
import Modal from "@/layout/modal";
import { useExpenseStore } from "@/store/ExpenseStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useState } from "react";
import CommentsDisplay from "./CommentsDisplay";
import ParticipantDetails from "./ParticipantDetails";
import { useSearchParams } from "react-router-dom";

type ExpensesContainerProps = {
  data: {
    id: string;
    title: string;
  };
  title: string;
  mode: string;
  participants: string;
}
// & ReuseModalTypes;

export default function DefaultExpencesDisplayContainer({ data, title, mode, participants }: ExpensesContainerProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { deleteExpense } = useExpenseStore();
  const [, setSearchParams] = useSearchParams();

  const toggleDeleteModal = useCallback(() => {
    setOpenModal(prev => !prev)
  }, [openModal]);

  const handleDeleteExpense = () => {
    deleteExpense(data?.id);
    // Remove the display query parameter to return to the expenses list
    setSearchParams({});
    toggleDeleteModal();
  };

  return (
    <>
      <div className="relative w-full h-full bg-floral dark:bg-ash-black flex flex-col">
        <header className="w-full bg-white dark:bg-ash-black flex items-center justify-between px-3 py-2 border-b border-floral dark:border-gray-400">
          <aside className="flex items-center gap-3">
            <h2>{title}</h2>

            <div className="w-max whitespace-nowrap hidden md:block">
              <span>Mode: {mode}</span> {" "}
              <span>Participants: {participants}</span>
            </div>
          </aside>

          <button type="button" className="text-light-red" onClick={toggleDeleteModal}>
            <Icon icon="hugeicons:delete-04" width={24} height={24} color="" />
          </button>
        </header>

        <section className="w-full h-full flex flex-row">
          <CommentsDisplay />
          <ParticipantDetails expenseId={data?.id} userId="current-user" />
        </section>

      </div>

      <Modal
        show={openModal}
        closeModal={toggleDeleteModal}
        isSmall
        title={`Delete an expense`}
      >
        <p className="my-3">Are you sure you want to delete <b>{data?.title}</b></p>

        <section className="w-full grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="default"
            className="w-full rounded-full bg-emerald flex items-center gap-2"
            onClick={toggleDeleteModal}
          >
            No
            <Icon icon="icon-park-outline:good-two" width={18} height={18} />
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full rounded-full bg-light-red flex items-center gap-2"
            onClick={handleDeleteExpense}
          >
            Yes
            <Icon icon="icon-park-solid:caution" width={18} height={18} />
          </Button>
        </section>
      </Modal>
    </>
  )
}
