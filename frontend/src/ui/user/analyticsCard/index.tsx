import { ReactNode } from "react";

type AnalyticsCardType = {
  title: string;
  content: ReactNode | string;
  description: string
}

export default function AnalyticsCard({ title, content, description }: AnalyticsCardType) {
  return (
    <div className="w-full min-w-xs max-w-full h-56 bg-white dark:bg-ash-black rounded-xl flex flex-col items-start justify-between px-4 py-6">
      <h3>{title}</h3>
      <div className={typeof content === 'string' ? 'text-6xl font-bold' : ''}>{content}</div>
      <p>{description}</p>
    </div>
  )
}
