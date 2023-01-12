import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as Sentry from 'sentry-expo';

import RealmContext from '../realm';
import { ExpensesList } from '../components/ExpensesList';
import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';
import { Expense } from '../models/expense';
import { getGroupedExpenses } from '../utils/expenses';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { getPlainRecurrence } from '../utils/recurrences';

const { useQuery } = RealmContext;

export const Expenses = () => {
  const expenses = useQuery(Expense);
  const recurrenceSheetRef = useRef<BottomSheet>();
  const [recurrence, setRecurrence] = React.useState(Recurrence.Weekly);

  const groupedExpenses = getGroupedExpenses(Array.from(expenses), recurrence);
  const total = groupedExpenses.reduce((sum, group) => (sum += group.total), 0);

  const changeRecurrence = (newRecurrence: Recurrence) => {
    setRecurrence(newRecurrence);
    recurrenceSheetRef.current?.close();
  };

  return (
    <>
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
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => recurrenceSheetRef.current?.expand()}
          >
            <Text style={{ color: theme.colors.primary, fontSize: 17 }}>
              This {getPlainRecurrence(recurrence)}
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
            {total}
          </Text>
        </View>
        <ExpensesList groups={groupedExpenses} />
      </View>
      <BottomSheet
        ref={recurrenceSheetRef}
        index={-1}
        handleStyle={{
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{ backgroundColor: '#FFFFFF55' }}
        enablePanDownToClose
        snapPoints={['25%', '50%']}
      >
        <BottomSheetFlatList
          style={{ backgroundColor: theme.colors.card }}
          data={[
            Recurrence.Daily,
            Recurrence.Weekly,
            Recurrence.Monthly,
            Recurrence.Yearly,
          ]}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={{ paddingHorizontal: 18, paddingVertical: 12 }}
              onPress={() => changeRecurrence(item)}
            >
              <Text
                style={{
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: recurrence === item ? theme.colors.primary : 'white',
                }}
              >
                This {getPlainRecurrence(item)}
              </Text>
            </TouchableHighlight>
          )}
        />
      </BottomSheet>
    </>
  );
};
