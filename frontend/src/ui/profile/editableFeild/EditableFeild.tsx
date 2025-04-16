import { Input } from "@/components/ui/input";

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
      <label className="text-[13px] text-ash-black font-medium">{label}</label>
      {editable ? (
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="border border-gray-300 rounded-full p-2"
        />
      ) : (
        <p className="font-medium text-ash-black text-base">{value}</p>
      )}
    </div>
  );
}
