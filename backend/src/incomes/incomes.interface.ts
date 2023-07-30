export interface Income {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  userId: string;
  transactionGroupId: string | null;
}

export interface AccountGroup {
  name: string;
  description: string;
}
