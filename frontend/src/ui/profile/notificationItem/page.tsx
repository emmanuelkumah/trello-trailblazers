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
    <div className="py-3 px-3 border dark:border-gray-500 hover:bg-floral/25 dark:hover:bg-black/25 mb-4 rounded-lg">
      <p className="font-medium">{title}</p>
      <div className=" flex justify-between mt-1">
        <p className="text-sm text-ash-black dark:text-platinum">{group}</p>
        <p className="text-xs text-ash-black dark:text-platinum">{time}</p>
      </div>
    </div>
  );
}
