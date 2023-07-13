export type Expenses = {
  id: string;
  amount: string;
  description: string;
  date: string;
  categoryId: string;
  userId: string;
  sharedAccountGroupId: string;
  accountGroupId: string;
};

export type ExpensesResponse = {
  expenses: Expenses[];
};
