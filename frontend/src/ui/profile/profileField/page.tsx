export const page = () => {
  return function ProfileField({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div className="pb-3">
        <p className="text-sm text-ash-black">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    );
  };
};
