import { Recurrence } from '../types/recurrence';

export const getPlainRecurrence = (recurrence: Recurrence) => {
  switch (recurrence) {
    case Recurrence.Daily:
      return 'Day';
    case Recurrence.Weekly:
      return 'Week';
    case Recurrence.Monthly:
      return 'Month';
    case Recurrence.Yearly:
      return 'Year';
    default:
      return '';
  }
};
