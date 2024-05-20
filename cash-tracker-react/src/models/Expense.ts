

export type ExpenseType = "cash" | "card";

export interface Expense {
  date: string;
  amount: number;
  type: ExpenseType;
  categoryId: string;
  description: string;
}

