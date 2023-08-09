export interface Income {
  amount: number;
  description: string;
  date: Date;
  categoryId: string;
  userId: string;
  transactionGroupId?: string | undefined;
}

export interface AccountGroup {
  name: string;
  description: string;
}
