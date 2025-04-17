import { Button } from "@/components/ui/button";
import useDeviceSize from "@/hooks/useDeviceSize";
import { analytics, groupCardData } from "@/ui/user/_data";
import AnalyticsCard from "@/ui/user/analyticsCard";
import CreateGroupModal from "@/ui/user/createGroupModal";
import GroupCard from "@/ui/user/groupCard";
import JoinGroupModal from "@/ui/user/joinGroupModal";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Dashboard() {
  const user = "Franklin";
  // const isMobile = useDeviceSize();
  const isTablet = useDeviceSize();

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
            >
              View More
              <Icon icon="ic:twotone-read-more" width={32} height={32} />
            </Button>
          </header>

          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-4 lg:gap-0">
            {groupCardData?.map((item, idx) => (
              <GroupCard
                key={idx}
                title={item?.title}
                description={item?.description}
                image={item?.image}
                total={item?.total}
                members={item?.members}
                content={item?.content}
              />
            ))}
          </section>
        </section>
      </main>

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

      <CreateGroupModal
        show={openModal.create}
        onClose={handleCreateModalToggle}
      />
      <JoinGroupModal show={openModal.join} onClose={handleJoinModalToggle} />
    </>
  );
}
