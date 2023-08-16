export type SummaryResponse = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  month: {
    totalExpense: number;
    totalIncome: number;
    totalBalance: number;
  };
  year: SummaryResponseByYear[];
};

export type SummaryResponseByYear = {
  id: string;
  month: string;
  year: string;
  balance: number;
  expenseTotal: number;
  incomeTotal: number;
};
