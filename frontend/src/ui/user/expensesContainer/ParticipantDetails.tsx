import { useExpenseStore } from "@/store/ExpenseStore";
import { useState } from "react";
import Modal from "@/layout/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import ProgressBar from "@/components/progressBar";

type ExpenseDetails = {
  expenseId: string;
}

export default function ParticipantDetails({ expenseId, userId }: ExpenseDetails & { userId: string }) {
  const { markParticipantPaid, getExpenseById, getExpensePaymentStatus } = useExpenseStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<{ id: string, name: string } | null>(null);

  const data = getExpenseById(expenseId);
  const paymentStatus = getExpensePaymentStatus(expenseId);
  const isCreator = data?.creatorId === userId;

  const handleCheckboxClick = (participantId: string, participantName: string) => {
    setSelectedParticipant({ id: participantId, name: participantName });
    setShowConfirmModal(true);
  };

  const confirmPayment = () => {
    if (selectedParticipant) {
      markParticipantPaid(expenseId, selectedParticipant.id);
    }
    setShowConfirmModal(false);
    setSelectedParticipant(null);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
    setSelectedParticipant(null);
  };

  return (
    <>
      <div className="relative w-full max-md:max-w-full max-w-[45%] h-full bg-white dark:bg-ash-black dark:border p-2">
        <div className="w-full border-b dark:border-gray-400 pt-2 pb-4 px-1 mb-1.5">
          <div className="flex justify-between">
            <h3>₦{data?.amount}</h3>
            <span>{paymentStatus.percent}% there</span>
          </div>
          <ProgressBar currentStep={paymentStatus.percent} totalSteps={100} />
        </div>

        <section>
          <h3>Participants ({data?.participants?.length})</h3>
          <p>{paymentStatus.total - paymentStatus.paid} person(s) till payment completion</p>

          <div className="w-full flex flex-col gap-2 mt-3">
            {data?.participants.map((item) => (
              <div key={item?.id} className="flex items-center justify-between bg-gray-100 dark:bg-black/30 px-2 py-3 rounded-3xl">
                <div className="flex items-center gap-2">
                  {isCreator && (
                    <Label className="cursor-pointer">
                      <Checkbox
                        checked={item.hasPaid}
                        onCheckedChange={() => !item.hasPaid && handleCheckboxClick(item.id, item.name)}
                        disabled={item.hasPaid}
                        className="data-[state=checked]:bg-emerald data-[state=checked]:text-white dark:data-[state=checked]:bg-emerald data-[state=checked]:border-emerald"
                      />
                      <span>{item?.name}</span>
                    </Label>
                  )}
                  {!isCreator &&
                    <span
                      className={`flex items-center gap-1 ${item?.hasPaid === true ? "opacity-45" : "opacity-100"}`}
                    >
                      <Icon
                        icon={item?.hasPaid === true ? "lets-icons:check-fill" : "lsicon:timing-shelf-down-outline"}
                        width={18} height={18}
                        color={item?.hasPaid === true ? "#62D2A2" : "#FFD93D "}
                      />
                      {item?.name}
                    </span>
                  }
                </div>
                <span>₦{item?.amount}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Modal
        show={showConfirmModal}
        closeModal={closeModal}
        title={`Confirm Payment for ${selectedParticipant?.name}`}
        isSmall
      >
        <p className="my-3">Are you sure you want to mark {selectedParticipant?.name} as paid?</p>

        <section className="w-full grid grid-cols-2 gap-4 mt-4">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-full border-gray-300 flex items-center gap-2"
            onClick={closeModal}
          >
            Cancel
            <Icon icon="mdi:close" width={18} height={18} />
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full rounded-full bg-emerald flex items-center gap-2"
            onClick={confirmPayment}
          >
            Confirm
            <Icon icon="mdi:check" width={18} height={18} />
          </Button>
        </section>
      </Modal>
    </>
  );
}
