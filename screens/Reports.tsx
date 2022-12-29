import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { MutableRefObject, useEffect } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import RealmContext from '../realm';
import { ExpensesList } from '../components/ExpensesList';
import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { WeeklyChart } from '../components/charts/WeeklyChart';
import { YearlyChart } from '../components/charts/YearlyChart';
import { MonthlyChart } from '../components/charts/MonthlyChart';
import { LazyViewPager } from '../components/LazyPagerView';
import { calculateRange, formatDateRange } from '../utils/date';
import { Expense } from '../models/expense';
import { filterExpensesInPeriod, groupExpensesByDay } from '../utils/expenses';

const { useQuery } = RealmContext;

type Props = {
  reportsSheetRef: MutableRefObject<BottomSheetMethods>;
};

export const Reports = ({ reportsSheetRef }: Props) => {
  const expenses = useQuery(Expense);

  const [recurrence, setRecurrence] = React.useState<Recurrence>(
    Recurrence.Weekly
  );

  const [numberOfPages, setNumberOfPages] = React.useState(53);
  const [page, setPage] = React.useState(0);

  const selectRecurrence = (selectedRecurrence: Recurrence) => {
    setRecurrence(selectedRecurrence);
    reportsSheetRef.current.close();
  };

  useEffect(() => {
    switch (recurrence) {
      case Recurrence.Weekly:
        setNumberOfPages(53);
        break;
      case Recurrence.Monthly:
        setNumberOfPages(12);
        break;
      case Recurrence.Yearly:
        setNumberOfPages(1);
        break;
    }
  }, [recurrence, page]);

  const { start, end } = calculateRange(recurrence, page);
  const periodLabel = formatDateRange(start, end, recurrence);

  const filteredExpenses = filterExpensesInPeriod(
    Array.from(expenses),
    recurrence,
    page
  );

  const groupedExpenses = groupExpensesByDay(filteredExpenses);

  const totalForPeriod = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const averageForPeriod = totalForPeriod / filteredExpenses.length;

  return (
    <>
      <LazyViewPager
        buffer={3}
        data={Array.from({ length: numberOfPages })}
        initialPage={numberOfPages - 1}
        onPageSelected={(newPage) => setPage(numberOfPages - newPage - 1)}
        style={{ width: '100%', height: '100%' }}
        renderItem={() => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ color: theme.colors.textPrimary, fontSize: 20 }}>
                  {periodLabel}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: 16,
                    }}
                  >
                    USD
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: 17,
                      fontWeight: '600',
                      marginLeft: 4,
                    }}
                  >
                    {totalForPeriod.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ color: theme.colors.textPrimary, fontSize: 20 }}>
                  Avg/Day
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: 16,
                    }}
                  >
                    USD
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: 17,
                      fontWeight: '600',
                      marginLeft: 4,
                    }}
                  >
                    {averageForPeriod.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              {recurrence === Recurrence.Weekly && (
                <WeeklyChart expenses={filteredExpenses} />
              )}
              {recurrence === Recurrence.Monthly && (
                <MonthlyChart date={start} expenses={filteredExpenses} />
              )}
              {recurrence === Recurrence.Yearly && (
                <YearlyChart expenses={filteredExpenses} />
              )}
            </View>
            <View style={{ marginTop: 16 }}>
              <ExpensesList groups={groupedExpenses} />
            </View>
          </View>
        )}
      />
      <BottomSheet
        ref={reportsSheetRef}
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
          data={[Recurrence.Weekly, Recurrence.Monthly, Recurrence.Yearly]}
          renderItem={({ item }) => (
            <TouchableHighlight
              style={{ paddingHorizontal: 18, paddingVertical: 12 }}
              onPress={() => selectRecurrence(item)}
            >
              <Text
                style={{
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: recurrence === item ? theme.colors.primary : 'white',
                }}
              >
                {item}
              </Text>
            </TouchableHighlight>
          )}
        />
      </BottomSheet>
    </>
  );
};
