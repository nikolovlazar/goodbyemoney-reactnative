import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { ExpensesList } from '../components/ExpensesList';
import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';

export const Expenses = () => (
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
  </View>
);
