import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';

import { ExpensesGroup } from '../types/expenses-group';
import { ExpenseRow } from './ExpenseRow';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({ groups }: Props) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'scroll',
      paddingHorizontal: 16,
    }}
  >
    {groups.map(({ day, expenses, total }) => (
      <View
        key={day}
        style={{ display: 'flex', flexDirection: 'column', marginBottom: 24 }}
      >
        <Text
          style={{
            marginBottom: 4,
            color: theme.colors.textSecondary,
            fontSize: 17,
            fontWeight: '600',
          }}
        >
          {day}
        </Text>
        <View
          style={{
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 2,
            marginBottom: 12,
          }}
        />
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            marginBottom: 4,
          }}
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: theme.colors.textSecondary,
            }}
          >
            Total:
          </Text>
          <Text
            style={{
              fontSize: 17,
              color: theme.colors.textSecondary,
              fontWeight: '600',
            }}
          >
            USD {total}
          </Text>
        </View>
      </View>
    ))}
  </View>
);
