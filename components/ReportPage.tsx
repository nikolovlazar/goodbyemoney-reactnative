import { View, Dimensions, Text } from 'react-native';
import * as Sentry from 'sentry-expo';

import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';
import { type ReportPageProps } from '../types/report-page';
import { calculateRange, formatDateRange } from '../utils/date';
import { groupExpensesByDay } from '../utils/expenses';
import { shortenNumber } from '../utils/number';
import { MonthlyChart } from './charts/MonthlyChart';
import { WeeklyChart } from './charts/WeeklyChart';
import { YearlyChart } from './charts/YearlyChart';
import { ExpensesList } from './ExpensesList';

export const ReportPage = Sentry.Native.withProfiler(
  ({ page, total, average, expenses, recurrence }: ReportPageProps) => {
    const groupedExpenses = groupExpensesByDay(expenses);

    const { start, end } = calculateRange(recurrence, page);
    const periodLabel = formatDateRange(start, end, recurrence);

    return (
      <View
        style={{
          width: Dimensions.get('window').width,
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
                {shortenNumber(total)}
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
                {shortenNumber(average)}
              </Text>
            </View>
          </View>
        </View>
        {expenses.length > 0 ? (
          <>
            <View style={{ marginTop: 16 }}>
              {recurrence === Recurrence.Weekly && (
                <WeeklyChart expenses={expenses} />
              )}
              {recurrence === Recurrence.Monthly && (
                <MonthlyChart date={start} expenses={expenses} />
              )}
              {recurrence === Recurrence.Yearly && (
                <YearlyChart expenses={expenses} />
              )}
            </View>
            <View style={{ marginTop: 16 }}>
              <ExpensesList groups={groupedExpenses} />
            </View>
          </>
        ) : (
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: 18,
              lineHeight: 28,
              marginTop: 40,
              textAlign: 'center',
            }}
          >
            There are no expenses reported for this period.
          </Text>
        )}
      </View>
    );
  }
);
