import { Expense } from '../models/expense';

export type ExpensesGroup = {
  day: string;
  expenses: Expense[];
  total: number;
};
