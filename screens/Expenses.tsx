import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Sentry from 'sentry-expo';

import RealmContext from '../realm';
import { ExpensesList } from '../components/ExpensesList';
import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';
import { Expense } from '../models/expense';
import { getGroupedExpenses } from '../utils/expenses';

const { useQuery } = RealmContext;

export const Expenses = () => {
  const expenses = useQuery(Expense);
  const [recurrence, setRecurrence] = React.useState(Recurrence.Weekly);

  const groupedExpenses = getGroupedExpenses(Array.from(expenses), recurrence);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        paddingHorizontal: 16,
        width: '100%',
        paddingTop: 16,
      }}
    >
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <Text style={{ color: theme.colors.textPrimary, fontSize: 17 }}>
          Total for:
        </Text>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <Text style={{ color: theme.colors.primary, fontSize: 17 }}>
            This week
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 17,
            marginTop: 2,
          }}
        >
          $
        </Text>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: 40,
            fontWeight: '600',
            marginLeft: 2,
          }}
        >
          195
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          throw new Error('My first Sentry error!');
        }}
      >
        <Text style={{ color: theme.colors.primary, fontSize: 17 }}>
          Simulate Crash
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Sentry.Native.nativeCrash();
        }}
      >
        <Text style={{ color: theme.colors.primary, fontSize: 17 }}>
          Simulate Native Crash
        </Text>
      </TouchableOpacity>
      <ExpensesList groups={groupedExpenses} />
    </View>
  );
};
