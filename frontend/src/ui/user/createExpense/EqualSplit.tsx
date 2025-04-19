import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { participants } from "../_data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface EqualSplitProps {
  totalAmount?: number;
}

const EqualSplit = forwardRef<any, EqualSplitProps>(({ totalAmount = 0 }, ref) => {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [amountPerPerson, setAmountPerPerson] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    getSelectedParticipants: () => selectedParticipants
  }));

  // Calculate per-person amount when total or selected participants change
  useEffect(() => {
    if (totalAmount > 0 && selectedParticipants.length > 0) {
      const perPerson = parseFloat((totalAmount / selectedParticipants.length).toFixed(2));
      setAmountPerPerson(perPerson);
    } else {
      setAmountPerPerson(0);
    }
  }, [totalAmount, selectedParticipants.length]);

  const handleToggleParticipant = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        The total amount will be split equally among all selected participants.
      </p>
      
      <div className="mt-4 space-y-2">
        <h5 className="font-medium">Select Participants</h5>
        <div className="">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center space-x-3 px-2 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-ash-black">
              <Checkbox
                id={`participant-${participant.id}`}
                checked={selectedParticipants.includes(participant.id)}
                onCheckedChange={() => handleToggleParticipant(participant.id)}
              />
              <Label htmlFor={`participant-${participant.id}`} className="flex-1 cursor-pointer">
                <div className="flex justify-between">
                  <span>{participant.name}</span>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {selectedParticipants.length > 0 && totalAmount > 0 && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-600/30 rounded-md">
          <p className="text-sm">
            Each person will pay: <span className="font-semibold">${amountPerPerson.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
});

EqualSplit.displayName = "EqualSplit";

export default EqualSplit;
