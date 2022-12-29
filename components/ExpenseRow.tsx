import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme';

import { Expense } from '../models/expense';

type Props = {
  expense: Expense;
};

export const ExpenseRow = ({ expense }: Props) => (
  <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 12 }}>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: theme.colors.textPrimary,
        }}
      >
        {expense.note}
      </Text>
      <Text
        style={{
          fontSize: 17,
          fontWeight: '600',
          color: theme.colors.textPrimary,
        }}
      >
        USD {expense.amount}
      </Text>
    </View>
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: `${expense.category.color}66`,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: expense.category.color, fontSize: 13 }}>
          {expense.category.name}
        </Text>
      </View>
      <Text style={{ fontSize: 17, color: theme.colors.textSecondary }}>
        {`${expense.date.getHours()}`.padStart(2, '0')}:
        {`${expense.date.getMinutes()}`.padStart(2, '0')}
      </Text>
    </View>
  </View>
);
