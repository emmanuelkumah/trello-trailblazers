import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Modal from "@/layout/modal";
import { ReuseModalTypes } from "@/types";
import EqualSplit from "./EqualSplit";
import PercentageSplit from "./PercentageSplit";
import ManualSplit from "./ManualSplit";
import Tabs from "@/components/tabs";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useExpenseStore } from "@/store/ExpenseStore";
import { participants } from "../_data";
import { toast } from "sonner";

interface CreateExpenseProps extends ReuseModalTypes {
  groupId?: string;
}

export default function CreateExpense({ show, onClose, groupId }: CreateExpenseProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [parsedAmount, setParsedAmount] = useState(0);
  
  const createExpense = useExpenseStore(state => state.createExpense);
  
  // Refs to child components
  const equalSplitRef = useRef<any>(null);
  const percentageSplitRef = useRef<any>(null);
  const manualSplitRef = useRef<any>(null);

  // Update parsedAmount whenever amount changes
  useEffect(() => {
    const numValue = parseFloat(amount);
    setParsedAmount(isNaN(numValue) ? 0 : numValue);
  }, [amount]);

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      setTitle("");
      setAmount("");
      setActiveTabIndex(0);
    }
  }, [show]);

  const getSplitMethod = () => {
    switch (activeTabIndex) {
      case 0: return "equal";
      case 1: return "percentage";
      case 2: return "manual";
      default: return "equal";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter an expense title");
      return;
    }
    
    if (parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!groupId) {
      toast.error("Group ID is missing");
      return;
    }

    setLoading(true);
    
    try {
      // Get selected participants and amounts/percentages from the active split component
      let selectedParticipantIds: string[] = [];
      let participantData: any[] = [];
      
      switch (activeTabIndex) {
        case 0: // Equal split
          if (equalSplitRef.current?.getSelectedParticipants) {
            selectedParticipantIds = equalSplitRef.current.getSelectedParticipants();
          }
          participantData = selectedParticipantIds.map(id => {
            const participant = participants.find(p => p.id === id);
            return {
              id,
              name: participant?.name || "",
            };
          });
          break;
          
        case 1: // Percentage split
          if (percentageSplitRef.current?.getParticipantsWithPercentages) {
            participantData = percentageSplitRef.current.getParticipantsWithPercentages();
            
            // Validate total percentage is 100%
            const totalPercentage = participantData.reduce((sum, p) => sum + (p.percentage || 0), 0);
            if (Math.abs(totalPercentage - 100) > 0.01) {
              toast.error("Percentages must add up to 100%");
              setLoading(false);
              return;
            }
          }
          break;
          
        case 2: // Manual split
          if (manualSplitRef.current?.getParticipantsWithAmounts) {
            participantData = manualSplitRef.current.getParticipantsWithAmounts();
            
            // Validate total amount matches
            const totalManual = participantData.reduce((sum, p) => sum + (p.amount || 0), 0);
            if (Math.abs(totalManual - parsedAmount) > 0.01) {
              toast.error("Manual amounts must add up to the total amount");
              setLoading(false);
              return;
            }
          }
          break;
      }
      
      if (participantData.length === 0) {
        toast.error("Please select at least one participant");
        setLoading(false);
        return;
      }
      
      // Use the provided groupId and a dummy creator ID
      // In a real app, the creatorId would come from auth context
      const dummyCreatorId = "current-user";
      
      // Create the expense
      createExpense({
        groupId,
        title,
        amount: parsedAmount,
        splitMethod: getSplitMethod(),
        participants: participantData,
        creatorId: dummyCreatorId,
      });
      
      toast.success("Expense created successfully!");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create expense");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  // Prepare tab components with refs
  const renderEqualSplit = () => <EqualSplit ref={equalSplitRef} totalAmount={parsedAmount} />;
  const renderPercentageSplit = () => <PercentageSplit ref={percentageSplitRef} totalAmount={parsedAmount} />;
  const renderManualSplit = () => <ManualSplit ref={manualSplitRef} targetAmount={parsedAmount} />;
  
  const tabs = [
    { label: "Equal", component: renderEqualSplit() },
    { label: "Percentage", component: renderPercentageSplit() },
    { label: "Manual", component: renderManualSplit() },
  ];

  return (
    <Modal
      show={show}
      closeModal={onClose}
      title="Add new Expense"
    >
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        <span>
          <label htmlFor="expense-title">Expense Title</label>
          <Input
            id="expense-title"
            type="text"
            placeholder="Dinner at restaurant"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </span>
        <span>
          <label htmlFor="expense-amount">Total Amount</label>
          <Input
            id="expense-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="eg. 300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </span>

        <section>
          <h4 className="mb-2">Split Method</h4>
          <Tabs 
            tabs={tabs} 
            position="center"
            onTabChange={handleTabChange}
            activeIndex={activeTabIndex}
          />
        </section>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button 
            type="button"
            variant="default" 
            size="lg" 
            className="w-full bg-gray-400 flex gap-3 rounded-full"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
            <Icon icon="tabler:cancel" width={24} height={24} />
          </Button>
          
          <Button 
            type="submit"
            variant="default" 
            size="lg" 
            className="w-full bg-light-red flex gap-3 rounded-full"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Expense'}
            <Icon icon="mdi:users-add-outline" width={24} height={24} />
          </Button>
        </div>
      </form>
    </Modal>
  );
}
