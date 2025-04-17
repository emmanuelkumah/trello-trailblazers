import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useDeviceSize from "@/hooks/useDeviceSize";
import { analytics } from "@/ui/user/_data";
import AnalyticsCard from "@/ui/user/analyticsCard";
import CreateGroupModal from "@/ui/user/createGroupModal";
import GroupCard from "@/ui/user/groupCard";
import JoinGroupModal from "@/ui/user/joinGroupModal";
import { Icon } from "@iconify/react";
import ActionsModal from "@/ui/user/mobile/actionsModal";
import { useDivvyGroupStore } from "@/store/GroupStore";
import { useExpenseStore } from "@/store/ExpenseStore";
import { ContentType } from "@/types";

export default function Dashboard() {
  let user = "Franklin";
  const navigate = useNavigate();
  const isTablet = useDeviceSize();
  const { data: groups } = useDivvyGroupStore();
  const { getExpensesByGroupId } = useExpenseStore();

  const [openModal, setModalOpen] = useState({
    create: false,
    join: false,
  });

  const handleCreateModalToggle = () => {
    setModalOpen((prev) => ({ ...prev, create: !prev.create }));
  };

  const handleJoinModalToggle = () => {
    setModalOpen((prev) => ({ ...prev, join: !prev.join }));
  };

  const navigateToGroups = () => {
    navigate("/user/all-groups");
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
          <aside>
            <h1>Hello {user},</h1>
            <p>Let's get you up to speed</p>
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

        <section
          className={`w-full ${
            isTablet
              ? "flex overflow-x-auto gap-4 scrollbar-hide pb-2"
              : "grid grid-cols-3 gap-6"
          }`}
        >
          {analytics.map((item, idx) => (
            <AnalyticsCard
              key={idx}
              title={item?.title}
              content={item?.content}
              description={item?.description}
            />
          ))}
        </section>

        <section className="w-full flex flex-col gap-4">
          <header className="w-full flex items-center justify-between">
            <h3>Your Groups</h3>
            <Button
              variant="secondary"
              size="lg"
              className="bg-transparent shadow-none hover:bg-transparent dark:bg-transparent border-none text-light-red"
              // onClick={handleCreateModalToggle}
              onClick={navigateToGroups}
            >
              View More
              <Icon icon="ic:twotone-read-more" width={32} height={32} />
            </Button>
          </header>

          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4 lg:gap-0">
            {groups.slice(0, 3).map((group) => {
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

          {groups.length > 3 && (
            <div className="w-full flex justify-center mt-4">
              <Button
                variant="default"
                className="bg-light-red rounded-full"
                onClick={navigateToGroups}
              >
                See All Groups
                <Icon icon="tabler:arrow-right" className="ml-1" width={16} />
              </Button>
            </div>
          )}
        </section>
      </main>

      <ActionsModal />

      <CreateGroupModal
        show={openModal.create}
        onClose={handleCreateModalToggle}
      />
      <JoinGroupModal show={openModal.join} onClose={handleJoinModalToggle} />
    </>
  );
}
