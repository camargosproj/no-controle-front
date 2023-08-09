export type Income = {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  transactionGroupId: string;
  category: {
    name: string;
  };
};

export type IncomeResponse = {
  incomes: Income[];
};
