

export type IncomeType = "cash" | "card";

export interface Income {
  date: string;
  amount: number;
  type: IncomeType;
  categoryId: string;
  description: string;
}

