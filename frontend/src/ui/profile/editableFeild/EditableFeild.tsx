import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditableFieldProps {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export function EditableField({
  label,
  value,
  editable = false,
  onChange,
}: EditableFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="font-medium">{label}</Label>
      {editable ? (
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border border-gray-300 rounded-full p-2"
        />
      ) : (
        <p className="font-medium text-base">{value}</p>
      )}
    </div>
  );
}
