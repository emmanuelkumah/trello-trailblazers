import { Input } from "@/components/ui/input";
import Modal from "@/layout/modal";
import { ReuseModalTypes } from "@/types";
import EqualSplit from "./EqualSplit";
import PercentageSplit from "./PercentageSplit";
import ManualSplit from "./ManualSplit";
import Tabs from "@/components/tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function CreateExpense({ show, onClose }: ReuseModalTypes) {

  const tabs = [
    { label: "Equal", component: <EqualSplit /> },
    { label: "Percentage", component: <PercentageSplit /> },
    { label: "Manual", component: <ManualSplit /> },
  ]

  return (
    <Modal
      show={show}
      closeModal={onClose}
      title="Add new Expense"
    >
      <form className="w-full flex flex-col gap-4">
        <span>
          <label htmlFor="">Expense Title</label>
          <Input
            type="text"
            placeholder="Dinner at restaurant"
          />
        </span>
        <span>
          <label htmlFor="">Total Amount</label>
          <Input
            type="text"
            placeholder="eg. 300"
          />
        </span>

        <section>
          <h4 className="mb-2">Split Method</h4>
          <Tabs tabs={tabs} position="center" />
        </section>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button variant="default" size="lg" className="w-full bg-gray-400 flex gap-3 rounded-full">
            Cancel
            <Icon icon="tabler:cancel" width={24} height={24} />
          </Button>
          
          <Button variant="default" size="lg" className="w-full bg-light-red flex gap-3 rounded-full">
            Create Expense
            <Icon icon="mdi:users-add-outline" width={24} height={24} />
          </Button>
        </div>
      </form>
    </Modal>
  )
}
