import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { theme } from '../theme';

import { ExpensesGroup } from '../types/expenses-group';
import { ExpenseRow } from './ExpenseRow';

type Props = {
  groups: ExpensesGroup[];
};

export const ExpensesList = ({ groups }: Props) => (
  <FlatList
    style={{ height: '100%' }}
    data={groups}
    keyExtractor={(item) => item.day}
    renderItem={({ item: { day, expenses, total } }) => (
      <View
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
            marginBottom: 8,
          }}
        />
        {expenses.map((expense) => (
          <ExpenseRow key={expense._id.toHexString()} expense={expense} />
        ))}
        <View
          style={{
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 2,
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
    )}
  />
);
