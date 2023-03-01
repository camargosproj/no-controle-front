export type Income = {
  id: string;
  amount: string;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  sharedAccountGroupId: string;
  accountGroupId: string;
};

export type IncomeResponse = {
  incomes: Income[];
};
