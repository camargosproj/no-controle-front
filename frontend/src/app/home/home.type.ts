export type SummaryResponse = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  balance: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
};
