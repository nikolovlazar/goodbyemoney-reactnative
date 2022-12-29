import type { Expense } from '../types/expense';
import { Recurrence } from '../types/recurrence';
import { calculateRange } from './date';

export const filterExpensesInPeriod = (
  expenses: Expense[],
  period: Recurrence,
  periodIndex: number
) => {
  const { start, end } = calculateRange(period, periodIndex);
};
