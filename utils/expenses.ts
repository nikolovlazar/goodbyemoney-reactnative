import { format, isThisYear, isToday, isYesterday } from 'date-fns';

import { Expense } from '../models/expense';
import { ExpensesGroup } from '../types/expenses-group';
import { Recurrence } from '../types/recurrence';
import { calculateRange } from './date';

export const filterExpensesInPeriod = (
  expenses: Expense[],
  period: Recurrence,
  periodIndex: number
) => {
  const { start, end } = calculateRange(period, periodIndex);

  return expenses.filter((expense) => {
    const { date } = expense;
    return date >= start && date <= end;
  });
};

export const groupExpensesByDay = (expenses: Expense[]): ExpensesGroup[] => {
  const groupedExpenses: { [key: string]: Expense[] } = {};

  expenses.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  expenses.forEach((expense) => {
    const { date } = expense;
    let key = '';
    if (isToday(date)) {
      key = 'Today';
    } else if (isYesterday(date)) {
      key = 'Yesterday';
    } else if (isThisYear(date)) {
      key = format(date, 'E, d MMM');
    } else {
      key = format(date, 'E, d MMM yyyy');
    }

    if (!groupedExpenses[key]) {
      groupedExpenses[key] = [];
    }

    groupedExpenses[key].push(expense);
  });

  return Object.keys(groupedExpenses).map((key) => ({
    day: key,
    expenses: groupedExpenses[key],
    total: groupedExpenses[key].reduce(
      (acc, expense) => acc + expense.amount,
      0
    ),
  }));
};

export const getGroupedExpenses = (
  expenses: Expense[],
  recurrence: Recurrence
) => {
  const filteredExpenses = filterExpensesInPeriod(
    Array.from(expenses),
    recurrence,
    0
  );

  return groupExpensesByDay(filteredExpenses);
};

export const getAverageAmountInPeriod = (total: number, period: Recurrence) => {
  switch (period) {
    case Recurrence.Weekly:
      return total / 7;
    case Recurrence.Monthly:
      return total / 30;
    case Recurrence.Yearly:
      return total / 365;
    default:
      return total;
  }
};
