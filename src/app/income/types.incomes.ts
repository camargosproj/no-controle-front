export type Income = {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  transactionGroupId: string;
  paidAt : string | null;
  updatedAt: string;
	createdAt: string;
  category: {
    name: string;
  };
};

export type IncomeResponse = {
  incomes: Income[];
  balance: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
};
