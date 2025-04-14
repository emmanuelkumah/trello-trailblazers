import { useState } from "react";
import { Button } from "@/components/ui/button";
import CreateGroupModal from "@/ui/user/createGroupModal";
import GroupCard from "@/ui/user/groupCard";
import JoinGroupModal from "@/ui/user/joinGroupModal";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useDivvyGroupStore } from "@/store/GroupStore";
import { useExpenseStore } from "@/store/ExpenseStore";
import { ContentType } from "@/types";

export default function AllGroups() {
  const navigate = useNavigate();
  const [openModal, setModalOpen] = useState({
    create: false,
    join: false
  });
  
  // Get groups from store
  const { data: groups } = useDivvyGroupStore();
  const { getExpensesByGroupId } = useExpenseStore();

  const handleCreateModalToggle = () => {
    setModalOpen((prev) => ({ ...prev, create: !prev.create }));
  };

  const handleJoinModalToggle = () => {
    setModalOpen((prev) => ({ ...prev, join: !prev.join }));
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  // Process expenses for each group
  const getGroupExpensesInfo = (groupId: string) => {
    const expenses = getExpensesByGroupId(groupId);
    
    // Get total amount from all expenses
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    
    // Get unique participants count
    const participantIds = new Set();
    expenses.forEach(expense => {
      expense.participants.forEach(participant => {
        participantIds.add(participant.id);
      });
    });
    
    // Format recent expenses for display
    const recentExpenses = expenses.slice(0, 5).map(expense => {
      // Map expense status to ContentType status
      let status: "ongoing" | "ended";
      if (expense.status === "completed") {
        status = "ended";
      } else {
        status = "ongoing";
      }
      
      return {
        id: expense.id,
        title: expense.title,
        price: expense.amount,
        status: status,
        members: expense.participants.length,
        action: expense.participants.every(p => p.hasPaid) 
          ? "contributed" as const
          : "pending contribution" as const
      };
    });
    
    return {
      total: totalAmount,
      members: participantIds.size || 0,
      content: recentExpenses as ContentType[]
    };
  };

  return (
    <>
      <main className="w-full flex flex-col gap-6">
        <header className="w-full flex items-center justify-between">
          <aside className="flex items-center gap-2">
            <Icon
              role="link"
              icon="ic:sharp-arrow-back"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleNavigateBack}
            />
            <h2>Your Groups</h2>
          </aside>
          <aside className="hidden md:flex items-center gap-8">
            <Button
              variant="default"
              size="lg"
              className="bg-light-red gap-4 rounded-full"
              onClick={handleJoinModalToggle}
            >
              Join Group
              <Icon icon="fluent:cube-add-20-filled" width={24} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent dark:bg-transparent border-light-red dark:border-light-red dark:text-light-red text-light-red rounded-full"
              onClick={handleCreateModalToggle}
            >
              Create Group
              <Icon icon="mdi:users-add-outline" width={24} />
            </Button>
          </aside>
        </header>
        
        {groups.length > 0 ? (
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4 lg:gap-0">
            {groups.map((group) => {
              const { total, members, content } = getGroupExpensesInfo(group.id);
              return (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  title={group.name}
                  code={group.code}
                  description={group.desc}
                  image={group.image}
                  total={total}
                  members={members}
                  content={content}
                  slug={group.slug}
                />
              );
            })}
          </section>
        ) : (
          <div className="w-full py-12 flex flex-col items-center justify-center">
            <Icon icon="carbon:no-data" width={64} height={64} className="text-gray-400 mb-4" />
            <h3 className="text-xl font-medium">No Groups Yet</h3>
            <p className="text-gray-500 mt-2">Create or join a group to get started</p>
            <div className="flex gap-4 mt-6">
              <Button
                variant="default"
                className="bg-light-red gap-2 rounded-full"
                onClick={handleCreateModalToggle}
              >
                Create Group
                <Icon icon="mdi:users-add-outline" width={20} />
              </Button>
              <Button
                variant="outline"
                className="border-mustard text-mustard gap-2 rounded-full"
                onClick={handleJoinModalToggle}
              >
                Join Group
                <Icon icon="fluent:cube-add-20-filled" width={20} />
              </Button>
            </div>
          </div>
        )}
      </main>

      <CreateGroupModal
        show={openModal.create}
        onClose={handleCreateModalToggle}
      />
      <JoinGroupModal
        show={openModal.join}
        onClose={handleJoinModalToggle}
      />
    </>
  );
}
