import { Icon } from "@iconify/react/dist/iconify.js";
import CommentsDisplay from "../../expensesContainer/CommentsDisplay";
import ExpensesDisplay from "../../expensesDisplay";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useExpenseStore } from "@/store/ExpenseStore";
import { useEffect, useState } from "react";
import { Expense } from "@/store/ExpenseStore";
import Modal from "@/layout/modal";
import ParticipantDetails from "../../expensesContainer/ParticipantDetails";

type ExpensesMobileProps = {
  groupId: string;
}

export default function ExpensesCommentsDiplayMobile({ groupId }: ExpensesMobileProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getExpenseById } = useExpenseStore();
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalToggle = () => {
    setOpenModal(prev => !prev);
  };

  // Handle expense selection
  useEffect(() => {
    const expenseId = searchParams.get('display');
    if (expenseId) {
      const expense = getExpenseById(expenseId);
      if (expense) {
        setSelectedExpense(expense);
      }
    } else {
      setSelectedExpense(null);
    }
  }, [searchParams, getExpenseById]);

  const handleExpenseClick = (expenseId: string) => {
    setSearchParams({ display: expenseId });
  };

  return (
    <>
      <div className="w-full h-full">
        {selectedExpense ? (
          <section className="w-full h-full">
            <header className="w-full flex items-center justify-between p-3 border-b border-floral dark:border-gray-400">
              <aside className="flex items-center gap-2">
                <button
                  type="button"
                  role="button"
                  onClick={() => setSearchParams({})}

                >
                  <Icon icon="ic:sharp-arrow-back" width={24} height={24} />
                </button>
                <h3>{selectedExpense.title}</h3>
              </aside>

              <Button
                type="button"
                role="button"
                variant="secondary"
                className="text-light-red bg-transparent shadow-none hover:bg-transparent dark:hover:bg-transparent"
                onClick={handleModalToggle}
              >
                View Details
                <Icon icon="ic:twotone-read-more" width={18} height={18} />
              </Button>
            </header>
            <CommentsDisplay />
          </section>
        ) : (
          <ExpensesDisplay groupId={groupId} onExpenseClick={handleExpenseClick} />
        )}
      </div>

      <Modal
        show={openModal}
        closeModal={handleModalToggle}
        title={`${selectedExpense?.title} - Details`}
      >
        <ParticipantDetails expenseId={selectedExpense?.id || ""} userId="" />
      </Modal>
    </>
  )
}
