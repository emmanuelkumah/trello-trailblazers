import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { participants } from "../_data";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react/dist/iconify.js";

interface PercentageSplitProps {
  totalAmount?: number;
}

const PercentageSplit = forwardRef<any, PercentageSplitProps>(({ totalAmount = 0 }, ref) => {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [percentages, setPercentages] = useState<Record<string, number>>({});
  const [totalPercentage, setTotalPercentage] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    getParticipantsWithPercentages: () => {
      return selectedParticipants.map(id => {
        const participant = participants.find(p => p.id === id);
        return {
          id,
          name: participant?.name || "",
          percentage: percentages[id] || 0
        };
      });
    }
  }));

  const handleToggleParticipant = (participantId: string) => {
    setSelectedParticipants(prev => {
      if (prev.includes(participantId)) {
        // Remove participant
        const newSelected = prev.filter(id => id !== participantId);
        // Update percentages by removing this participant
        const { [participantId]: removed, ...restPercentages } = percentages;
        setPercentages(restPercentages);
        return newSelected;
      } else {
        // Add participant with default equal percentage
        return [...prev, participantId];
      }
    });
  };

  // Recalculate total percentage whenever percentages change
  useEffect(() => {
    const total = Object.values(percentages).reduce((sum, value) => sum + (value || 0), 0);
    setTotalPercentage(total);
  }, [percentages]);

  // Reset percentages when selected participants change
  useEffect(() => {
    if (selectedParticipants.length > 0) {
      const equalPercentage = Math.floor(100 / selectedParticipants.length);
      const lastAdditional = 100 - (equalPercentage * selectedParticipants.length);

      const newPercentages: Record<string, number> = {};
      selectedParticipants.forEach((id, index) => {
        // Add the remainder to the last participant
        if (index === selectedParticipants.length - 1) {
          newPercentages[id] = equalPercentage + lastAdditional;
        } else {
          newPercentages[id] = equalPercentage;
        }
      });

      setPercentages(newPercentages);
    } else {
      setPercentages({});
    }
  }, [selectedParticipants.length]);

  const handlePercentageChange = (participantId: string, value: string) => {
    const parsedValue = parseInt(value, 10) || 0;
    setPercentages(prev => ({
      ...prev,
      [participantId]: parsedValue
    }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Allocate the percentage each participant will contribute to the total amount.
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
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={percentages[participant.id] || 0}
                        onChange={(e) => handlePercentageChange(participant.id, e.target.value)}
                        className="w-16 h-8 text-center"
                      />
                      <span>%</span>
                    </div>
                  )}
                </div>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 p-3 rounded-md flex items-center ${totalPercentage === 100 ? 'bg-green-50 dark:bg-green-700/30' : 'bg-red-50 dark:bg-red-600/25'}`}>
        <p className="text-sm">
          Total: <span className="font-semibold">{totalPercentage}%</span>
          {totalPercentage !== 100 && (
            <span className="ml-2 text-red-500">(Must equal 100%)</span>
          )}
        </p>
        <Icon
          icon={totalPercentage === 100 ? "solar:check-circle-bold-duotone" : "weui:error-filled"}
          width={24} height={24}
          color={totalPercentage === 100 ? "#62D2A2" : "#FF6B6B"}
          className="ml-auto"
        />
      </div>

      {totalAmount > 0 && totalPercentage === 100 && (
        <div className="mt-2 space-y-2">
          <h5 className="font-medium">Amount breakdown:</h5>
          <div className="space-y-1">
            {selectedParticipants.map(id => {
              const participant = participants.find(p => p.id === id);
              const percent = percentages[id] || 0;
              const amount = (percent / 100) * totalAmount;

              return (
                <div key={id} className="flex justify-between text-sm">
                  <span>{participant?.name}</span>
                  <span>${amount.toFixed(2)} ({percent}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

PercentageSplit.displayName = "PercentageSplit";

export default PercentageSplit;
