export default function NotificationItem({
  title,
  group,
  time,
}: {
  title: string;
  group: string;
  time: string;
}) {
  return (
    <div className="py-[10px] px-3 border mb-4 rounded">
      <p className="font-medium">{title}</p>
      <div className=" flex justify-between mt-1">
        <p className="text-sm text-ash-black">{group}</p>
        <p className="text-xs text-ash-black">{time}</p>
      </div>
    </div>
  );
}
