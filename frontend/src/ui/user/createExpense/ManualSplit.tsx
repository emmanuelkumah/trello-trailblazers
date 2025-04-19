import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { participants } from "../_data";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ManualSplitProps {
  targetAmount?: number;
}

const ManualSplit = forwardRef<any, ManualSplitProps>(({ targetAmount = 0 }, ref) => {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<Record<string, number>>({});
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    getParticipantsWithAmounts: () => {
      return selectedParticipants.map(id => {
        const participant = participants.find(p => p.id === id);
        return {
          id,
          name: participant?.name || "",
          amount: amounts[id] || 0
        };
      });
    }
  }));

  const handleToggleParticipant = (participantId: string) => {
    setSelectedParticipants(prev => {
      if (prev.includes(participantId)) {
        // Remove participant
        const newSelected = prev.filter(id => id !== participantId);
        // Update amounts by removing this participant
        const { [participantId]: removed, ...restAmounts } = amounts;
        setAmounts(restAmounts);
        return newSelected;
      } else {
        // Add participant with zero amount
        return [...prev, participantId];
      }
    });
  };

  // Recalculate total amount whenever amounts change
  useEffect(() => {
    const total = Object.values(amounts).reduce((sum, value) => sum + (value || 0), 0);
    setTotalAmount(total);
  }, [amounts]);

  // Initialize amounts when selected participants change
  useEffect(() => {
    if (selectedParticipants.length > 0) {
      const newAmounts: Record<string, number> = {};
      selectedParticipants.forEach(id => {
        // Initialize with existing amount or 0
        newAmounts[id] = amounts[id] || 0;
      });
      
      setAmounts(newAmounts);
    } else {
      setAmounts({});
    }
  }, [selectedParticipants.length]);

  // When targetAmount changes, try to distribute it
  useEffect(() => {
    if (targetAmount > 0 && selectedParticipants.length > 0) {
      // Only reset if total is 0 (initial setup)
      if (totalAmount === 0) {
        const equalShare = parseFloat((targetAmount / selectedParticipants.length).toFixed(2));
        const newAmounts: Record<string, number> = {};
        
        selectedParticipants.forEach((id, index) => {
          if (index === selectedParticipants.length - 1) {
            // Give the last person the remainder to ensure exact total
            const currentTotal = equalShare * (selectedParticipants.length - 1);
            newAmounts[id] = parseFloat((targetAmount - currentTotal).toFixed(2));
          } else {
            newAmounts[id] = equalShare;
          }
        });
        
        setAmounts(newAmounts);
      }
    }
  }, [targetAmount, selectedParticipants.length, totalAmount]);

  const handleAmountChange = (participantId: string, value: string) => {
    const parsedValue = parseFloat(value) || 0;
    setAmounts(prev => ({
      ...prev,
      [participantId]: parsedValue
    }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Specify the exact amount each participant will contribute.
      </p>
      
      <div className="mt-4 space-y-2">
        <h5 className="font-medium">Select Participants</h5>
        <div className="space-y-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-ash-black">
              <Checkbox
                id={`participant-${participant.id}`}
                checked={selectedParticipants.includes(participant.id)}
                onCheckedChange={() => handleToggleParticipant(participant.id)}
              />
              <Label htmlFor={`participant-${participant.id}`} className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center w-full">
                  <span>{participant.name}</span>
                  {selectedParticipants.includes(participant.id) && (
                    <div className="flex items-center space-x-2">
                      <span>$</span>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amounts[participant.id] || 0}
                        onChange={(e) => handleAmountChange(participant.id, e.target.value)}
                        className="w-20 h-8 text-center"
                      />
                    </div>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 p-3 rounded-md ${targetAmount > 0 && Math.abs(totalAmount - targetAmount) < 0.01 ? 'bg-green-50 dark:bg-green-700/25' : 'bg-blue-50 dark:bg-blue-700/25'}`}>
        <p className="text-sm">
          Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          {targetAmount > 0 && Math.abs(totalAmount - targetAmount) >= 0.01 && (
            <span className="ml-2 text-yellow-600">
              (Target: ${targetAmount.toFixed(2)}, Remaining: ${(targetAmount - totalAmount).toFixed(2)})
            </span>
          )}
        </p>
      </div>
    </div>
  );
});

ManualSplit.displayName = "ManualSplit";

export default ManualSplit;
