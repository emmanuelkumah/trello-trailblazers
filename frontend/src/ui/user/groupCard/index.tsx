import Image from "@/components/Image";
import { Button } from "@/components/ui/button";
import { GroupCardType } from "@/types";
import { Icon } from "@iconify/react";
import CreateExpense from "../createExpense";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GroupCardProps extends GroupCardType {
  slug: string;
  id: string;
  code: string;
}

export default function GroupCard({ 
  image, 
  title, 
  description, 
  members, 
  total, 
  content,
  slug,
  id,
  code
}: GroupCardProps) {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleShowToggle = () => {
    setShow(prev => !prev);
  };

  const handleViewGroup = () => {
    navigate(`/user/groups/${slug}?code=${code}`);
  };

  return (
    <>
      <div className="w-full max-w-sm h-full max-h-[30em] bg-white dark:bg-ash-black rounded-2xl overflow-hidden">
        <section className="relative w-full h-[35%]">
          <Image
            src={image}
            width="100%"
            height="100%"
            alt={title}
            divClassName="w-full h-full"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col text-white px-2 py-1.5">
            <h2 className="mt-auto font-semibold">{title}</h2>
            <p>{description}</p>
          </div>
        </section>

        <div className="w-full p-4 flex flex-col gap-3">
          <span className="w-full flex items-center justify-between">
            <aside className="flex items-center gap-2">
              <Icon icon="ion:people" width={24} height={24} color="#62D2A2" />
              <p className="text-sm">{members} {members === 1 ? "Member" : "Members"}</p>
            </aside>
            <aside className="flex items-center gap-2">
              <Icon icon="grommet-icons:money" width={24} height={24} color="#FF6B6B" />
              <h4 className="">{total} Total</h4>
            </aside>
          </span>

          <section className="w-full flex flex-col gap-4">
            <h3>Recent Expenses</h3>

            <div className="flex flex-col gap-3">
              {content?.slice(0, 2)?.map((item) => (
                <div
                  role="contentinfo"
                  key={item?.id}
                  className="bg-mustard/10 dark:bg-sunglow/10 w-full px-4 py-2 rounded-lg dark:text-white flex items-center justify-between"
                >
                  <aside>
                    <h3 className="whitespace-nowrap">{item?.title}</h3>
                    <span className="w-full flex items-center gap-2">
                      <Icon icon="ion:people" width={18} height={18} color="#62D2A2" />
                      <p className="text-sm"><p className="text-sm">{item?.members} {item?.members === 1 ? "Member" : "Members"}</p></p>
                    </span>
                  </aside>
                  <aside className="text-right">
                    <div role="group" className="flex items-center gap-2">
                      <span>{item?.price}</span>
                      <span className={`text-xs dark:text-white rounded-2xl px-3 py-0.5  ${item?.status === "ongoing" ? "bg-emerald" : "bg-light-red"}`}>{item?.status}</span>
                    </div>
                    <span className={`text-sm capitalize whitespace-nowrap ${item?.action === "contributed" ? "text-emerald" : "text-light-red"}`}>{item?.action}</span>
                  </aside>
                </div>
              ))}
            </div>

            <div className="w-max ml-auto flex items-center gap-3">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-light-red flex items-center gap-3 rounded-full"
                onClick={handleViewGroup}
              >
                View Group
                <Icon icon="lucide:view" width={24} height={24} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-mustard dark:border-mustard dark:bg-transparent text-mustard dark:text-mustard flex items-center gap-3 rounded-full"
                onClick={handleShowToggle}
              >
                Add Expense
                <Icon icon="arcticons:day-to-day-expenses" stroke="2" width={24} height={24} color="#FFD93D" />
              </Button>
            </div>
          </section>
        </div>
      </div>

      <CreateExpense
        show={show}
        onClose={handleShowToggle}
        groupId={id}
      />
    </>
  )
}
