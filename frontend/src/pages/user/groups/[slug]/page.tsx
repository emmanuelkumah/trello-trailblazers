import { useEffect, useState } from "react";
import { useDivvyGroupStore } from "@/store/GroupStore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import Image from "@/components/Image";
import GroupActions from "@/ui/user/groupActions";
import CreateExpense from "@/ui/user/createExpense";
import { useExpenseStore, Expense } from "@/store/ExpenseStore";
import ExpensesDisplay from "@/ui/user/expensesDisplay";
import ExpensesContainer from "@/ui/user/expensesContainer";
import { participants } from "@/ui/user/_data";
import useDeviceSize from "@/hooks/useDeviceSize";
import ExpensesCommentsDiplayMobile from "@/ui/user/mobile/expenseCommentsDisplay";

export default function GroupDisplay() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useDeviceSize();

  const [searchParams, setSearchParams] = useSearchParams();
  const { getGroupBySlug } = useDivvyGroupStore();
  const { getExpenseById } = useExpenseStore();
  const [show, setShow] = useState({
    modal: false,
    actions: false
  });

  const [group, setGroup] = useState<any>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const showActions = () => {
    setShow((prev) => ({ ...prev, actions: !prev.actions }));
  };

  const handleModalClose = () => {
    setShow((prev) => ({ ...prev, modal: !prev.modal }));
  };

  // Load group data
  useEffect(() => {
    if (slug) {
      const groupData = getGroupBySlug(slug);
      if (groupData) {
        setGroup(groupData);
      } else {
        toast.error("Group not found");
      }
      setIsLoading(false);
    }
  }, [slug, getGroupBySlug]);

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

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin">
          <Icon icon="tabler:loader" width={48} height={48} />
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Icon icon="tabler:alert-circle" width={64} height={64} className="text-red-500" />
        <h2 className="text-xl font-semibold">Group not found</h2>
        <p className="text-gray-500">The group you're looking for doesn't exist or has been removed.</p>
        <Button
          variant="default"
          className="mt-4 bg-light-red rounded-full"
          onClick={() => navigate('/user/groups')}
        >
          Go Back
          <Icon icon="tabler:arrow-left" className="ml-1" width={16} />
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full flex gap-4">
        <aside role="presentation" className="w-full h-full bg-white dark:bg-ash-black flex flex-col gap-4 rounded-lg py-3">
          <header className="w-full flex flex-col gap-3">
            <section className="relative w-full flex items-center justify-between px-3">
              <aside className="flex items-center gap-2">
                <button role="button" type="button" onClick={() => navigate("/user")}>
                  <Icon icon="ic:sharp-arrow-back" width={24} height={24} />
                </button>
                <h4>Go Back</h4>
              </aside>

              <button onClick={showActions}>
                <Icon icon="solar:settings-broken" width={24} height={24} />
              </button>
              <GroupActions
                show={show.actions}
                setShow={showActions}
                groupId={group.id}
              />
            </section>

            <div className="relative w-full h-36 md:h-56 flex items-center gap-4">
              {group.image && (
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={group.image}
                    alt={group.name}
                    width={0}
                    height={0}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="absolute top-0 left-0 w-full h-full flex flex-col bg-black/40 text-white p-6">
                <h1 className="mt-auto">{group.name}</h1>
                <p>{group.desc}</p>
              </div>
            </div>
          </header>

          <section className="w-full flex items-center justify-between px-6">
            <aside className="flex items-center gap-2">
              <Icon icon="ion:people" width={24} height={24} color="#62D2A2" />
              <p>{participants?.length} Members</p>
            </aside>
            <Button
              type="button"
              role="button"
              className="bg-light-red gap-2 rounded-full"
              onClick={handleModalClose}
            >
              Create Expense
              <Icon icon="game-icons:expense" width={24} height={24} />
            </Button>
          </section>

          {isMobile ? (
            <div className="w-full h-full max-h-full overflow-x-hidden px-4">
              <ExpensesCommentsDiplayMobile 
                groupId={group.id} 
                // title={selectedExpense?.title} 
              />
            </div>
          ) : (
            <section className="w-[96%] h-full border-2 border-floral dark:border-gray-400 rounded-lg overflow-hidden mx-auto">
              {selectedExpense ? (
                <ExpensesContainer
                  data={selectedExpense}
                  title={selectedExpense.title}
                  mode={selectedExpense.splitMethod}
                  participants={selectedExpense.participants.length.toString()}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">Select an expense, or create one to view full details here</span>
                </div>
              )}
            </section>
          )}
        </aside>
        <aside
          role="log"
          className="sticky w-full max-w-84 h-max py-4 px-2 rounded-lg bg-white dark:bg-ash-black hidden md:flex flex-col gap-3"
        >
          {group && <ExpensesDisplay groupId={group.id} onExpenseClick={handleExpenseClick} />}
        </aside>


      </div>

      <CreateExpense
        show={show.modal}
        onClose={handleModalClose}
        groupId={group?.id}
      />
    </>
  );
}
