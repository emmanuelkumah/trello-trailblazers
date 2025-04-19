import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

type SplitMethod = 'equal' | 'percentage' | 'manual';
type ExpenseStatus = 'ongoing' | 'completed';

export type ParticipantContribution = {
  id: string;
  name: string;
  amount: number;
  percentage?: number;
  hasPaid: boolean;
};

export type Comment = {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
};

export type Expense = {
  id: string;
  groupId: string;
  title: string;
  amount: number;
  splitMethod: SplitMethod;
  participants: ParticipantContribution[];
  creatorId: string;
  createdAt: string;
  comments: Comment[];
  status: ExpenseStatus;
};

type ExpenseState = {
  expenses: Expense[];

  createExpense: (input: {
    groupId: string;
    title: string;
    amount: number;
    splitMethod: SplitMethod;
    participants: Omit<ParticipantContribution, 'amount' | 'hasPaid'>[];
    creatorId: string;
  }) => void;

  getExpensesByGroupId: (groupId: string) => Expense[];

  getExpenseById: (expenseId: string) => Expense | undefined;

  addCommentToExpense: (expenseId: string, comment: Comment) => void;

  markParticipantPaid: (expenseId: string, userId: string) => void;

  updateExpense: (expenseId: string, updates: Partial<Expense>) => void;

  deleteExpense: (expenseId: string) => void;

  getParticipantProgress: (expenseId: string, userId: string) => number;

  getExpensePaymentStatus: (
    expenseId: string
  ) => { paid: number; total: number; percent: number };
  
  updateExpenseStatus: (expenseId: string) => void;
};

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],

      createExpense: ({
        groupId,
        title,
        amount,
        splitMethod,
        participants,
        creatorId,
      }) => {
        let calculatedParticipants: ParticipantContribution[] = [];

        if (splitMethod === 'equal') {
          const splitAmount = parseFloat((amount / participants.length).toFixed(2));
          calculatedParticipants = participants.map((p) => ({
            ...p,
            amount: splitAmount,
            hasPaid: false,
          }));
        } else if (splitMethod === 'percentage') {
          const totalPercent = participants.reduce((sum, p) => sum + (p.percentage ?? 0), 0);
          if (totalPercent !== 100) throw new Error('Percentages must sum to 100');
          calculatedParticipants = participants.map((p) => ({
            ...p,
            amount: parseFloat(((p.percentage! / 100) * amount).toFixed(2)),
            hasPaid: false,
          }));
        } else if (splitMethod === 'manual') {
          const totalManual = participants.reduce((sum, p) => sum + (p as any).amount, 0);
          if (totalManual !== amount) throw new Error('Manual amounts must sum to total');
          calculatedParticipants = participants.map((p) => ({
            ...p,
            amount: (p as any).amount,
            hasPaid: false,
          }));
        }

        const newExpense: Expense = {
          id: uuidv4(),
          groupId,
          title,
          amount,
          splitMethod,
          participants: calculatedParticipants,
          creatorId,
          createdAt: new Date().toISOString(),
          comments: [],
          status: 'ongoing',
        };

        set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      getExpensesByGroupId: (groupId) =>
        get().expenses.filter((exp) => exp.groupId === groupId),

      getExpenseById: (expenseId) =>
        get().expenses.find((exp) => exp.id === expenseId),

      addCommentToExpense: (expenseId, comment) => {
        set((state) => ({
          expenses: state.expenses.map((exp) =>
            exp.id === expenseId
              ? { ...exp, comments: [...exp.comments, comment] }
              : exp
          ),
        }));
      },

      markParticipantPaid: (expenseId, userId) => {
        set((state) => {
          const updatedExpenses = state.expenses.map((exp) =>
            exp.id === expenseId
              ? {
                  ...exp,
                  participants: exp.participants.map((p) =>
                    p.id === userId ? { ...p, hasPaid: true } : p
                  ),
                }
              : exp
          );
          
          // After updating participant status, check if we need to update the expense status
          const updatedExpense = updatedExpenses.find(exp => exp.id === expenseId);
          if (updatedExpense) {
            // Check if all participants have paid
            const allPaid = updatedExpense.participants.every(p => p.hasPaid);
            if (allPaid) {
              // Update the expense status to completed
              updatedExpenses.forEach(exp => {
                if (exp.id === expenseId) {
                  exp.status = 'completed';
                }
              });
            }
          }
          
          return { expenses: updatedExpenses };
        });
        
        // Check and update expense status after marking participant as paid
        get().updateExpenseStatus(expenseId);
      },

      updateExpense: (expenseId, updates) => {
        set((state) => ({
          expenses: state.expenses.map((exp) =>
            exp.id === expenseId ? { ...exp, ...updates } : exp
          ),
        }));
        
        // Check and update expense status if participants were modified
        if (updates.participants) {
          get().updateExpenseStatus(expenseId);
        }
      },

      deleteExpense: (expenseId) => {
        set((state) => ({
          expenses: state.expenses.filter((exp) => exp.id !== expenseId),
        }));
      },

      // 🔍 [Participant View]
      getParticipantProgress: (expenseId, userId) => {
        const expense = get().getExpenseById(expenseId);
        if (!expense) return 0;
        const participant = expense.participants.find((p) => p.id === userId);
        return participant && participant.hasPaid ? 100 : 0;
      },

      // 📊 [Creator View]
      getExpensePaymentStatus: (expenseId) => {
        const expense = get().getExpenseById(expenseId);
        if (!expense) return { paid: 0, total: 0, percent: 0 };
        const paid = expense.participants.filter((p) => p.hasPaid).length;
        const total = expense.participants.length;
        const percent = Math.round((paid / total) * 100);
        return { paid, total, percent };
      },
      
      // Update expense status based on participant payment status
      updateExpenseStatus: (expenseId) => {
        set((state) => {
          const updatedExpenses = [...state.expenses];
          const expenseIndex = updatedExpenses.findIndex(exp => exp.id === expenseId);
          
          if (expenseIndex !== -1) {
            const expense = updatedExpenses[expenseIndex];
            const allPaid = expense.participants.every(p => p.hasPaid);
            
            // Update status based on payment status
            updatedExpenses[expenseIndex] = {
              ...expense,
              status: allPaid ? 'completed' : 'ongoing'
            };
          }
          
          return { expenses: updatedExpenses };
        });
      }
    }),
    {
      name: 'divvy-expense-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
