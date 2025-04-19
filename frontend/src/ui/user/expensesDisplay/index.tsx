import { ParticipantContribution, useExpenseStore } from '@/store/ExpenseStore';
import { useSearchParams } from 'react-router-dom';

interface ExpensesDisplayProps {
  groupId: string;
  onExpenseClick?: (expenseId: string) => void;
}

export default function ExpensesDisplay({ groupId, onExpenseClick }: ExpensesDisplayProps) {
  const { getExpensesByGroupId } = useExpenseStore();
  const [searchParams] = useSearchParams();
  const expenses = getExpensesByGroupId(groupId);
  const activeExpenseId = searchParams.get('display');

  const handleExpenseClick = (expenseId: string) => {
    if (onExpenseClick) {
      onExpenseClick(expenseId);
    }
  };

  return (
    <div className="w-full">
      <h3 className="font-medium mb-3">Expenses</h3>
      <div className="mt-2">
        {expenses.length > 0 ? (
          <section className="space-y-2">
            {expenses.map(expense => (
              <button
                role="button"
                type="button"
                key={expense.id}
                className={`w-full text-left p-2 space-y-2 border dark:border-gray-400 rounded-sm transition-colors ${
                  activeExpenseId === expense.id 
                    ? 'bg-floral dark:bg-black/30 border-mustard dark:border-sunglow' 
                    : 'hover:bg-floral dark:hover:bg-black/30'
                }`}
                onClick={() => handleExpenseClick(expense.id)}
              >
                <aside className='flex items-center justify-between'>
                  <h3>{expense?.title}</h3>
                  <span>${expense?.amount}</span>
                </aside>
                <aside className='flex items-center justify-between'>
                  <span>
                    <small>{expense?.participants?.length} participants</small>
                    <div className="text-xs">
                      {expense?.participants.filter((p: ParticipantContribution) => p.hasPaid).length} of {expense?.participants.length} paid
                    </div>
                  </span>

                  <span className={expense?.status === "completed" ? "text-emerald" : "text-mustard dark:text-sunglow"}>
                    {expense?.status === "completed" ? "Completed" : "Ongoing"}
                  </span>
                </aside>
              </button>
            ))}
          </section>
        ) : (
          <p className="text-sm text-gray-500">No expenses yet for this group.</p>
        )}
      </div>
    </div>
  );
}
