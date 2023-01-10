import { Expense } from '../models/expense';
import { Recurrence } from './recurrence';

export type ReportPageProps = {
  page: number;
  total: number;
  average: number;
  expenses: Expense[];
  recurrence: Recurrence;
};
