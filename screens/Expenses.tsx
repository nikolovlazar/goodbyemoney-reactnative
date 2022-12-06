import { Text } from 'react-native';
import { ExpensesList } from '../components/ExpensesList';
import { Recurrence } from '../types/recurrence';

export const Expenses = () => (
  <ExpensesList
    groups={[
      {
        day: 'Today',
        expenses: [
          {
            id: '1',
            amount: 100,
            category: {
              id: '1',
              name: 'Food',
              color: '#FFD600',
            },
            date: new Date(),
            note: 'Bought some food',
            recurrence: Recurrence.None,
          },
          {
            id: '2',
            amount: 200,
            category: {
              id: '2',
              name: 'Transport',
              color: '#FF6D00',
            },
            date: new Date(),
            note: 'Bought some transport',
            recurrence: Recurrence.None,
          },
        ],
        total: 300,
      },
      {
        day: 'Yesterday',
        expenses: [
          {
            id: '3',
            amount: 300,
            category: {
              id: '3',
              name: 'Entertainment',
              color: '#00C853',
            },
            date: new Date(),
            note: 'Bought some entertainment',
            recurrence: Recurrence.None,
          },
        ],
        total: 300,
      },
    ]}
  />
);
