import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { MutableRefObject } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import { ExpensesList } from '../components/ExpensesList';
import { theme } from '../theme';
import { Recurrence } from '../types/recurrence';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { WeeklyChart } from '../components/charts/WeeklyChart';
import { YearlyChart } from '../components/charts/YearlyChart';

type Props = {
  reportsSheetRef: MutableRefObject<BottomSheetMethods>;
};

export const Reports = ({ reportsSheetRef }: Props) => {
  const [recurrence, setRecurrence] = React.useState<Recurrence>(
    Recurrence.Yearly
  );

  const selectRecurrence = (selectedRecurrence: Recurrence) => {
    setRecurrence(selectedRecurrence);
    reportsSheetRef.current.close();
  };

  return (
    <>
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
              12 Sep - 18 Sep
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
              }}
            >
              <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
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
                85
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
              <Text style={{ color: theme.colors.textSecondary, fontSize: 16 }}>
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
                85
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          {recurrence === Recurrence.Weekly && (
            <WeeklyChart
              expenses={[
                {
                  id: '1',
                  amount: 100,
                  category: {
                    id: '1',
                    name: 'Food',
                    color: '#FFD600',
                  },
                  date: new Date('2021-09-12T00:00:00.000Z'),
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
                  date: new Date('2021-09-12T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
                {
                  id: '3',
                  amount: 100,
                  category: {
                    id: '1',
                    name: 'Food',
                    color: '#FFD600',
                  },
                  date: new Date('2021-09-13T00:00:00.000Z'),
                  note: 'Bought some food',
                  recurrence: Recurrence.None,
                },
                {
                  id: '4',
                  amount: 200,
                  category: {
                    id: '2',
                    name: 'Transport',
                    color: '#FF6D00',
                  },
                  date: new Date('2021-09-14T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
              ]}
            />
          )}
          {recurrence === Recurrence.Yearly && (
            <YearlyChart
              expenses={[
                {
                  id: '1',
                  amount: 100,
                  category: {
                    id: '1',
                    name: 'Food',
                    color: '#FFD600',
                  },
                  date: new Date('2021-09-12T00:00:00.000Z'),
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
                  date: new Date('2021-09-12T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
                {
                  id: '3',
                  amount: 100,
                  category: {
                    id: '1',
                    name: 'Food',
                    color: '#FFD600',
                  },
                  date: new Date('2021-09-13T00:00:00.000Z'),
                  note: 'Bought some food',
                  recurrence: Recurrence.None,
                },
                {
                  id: '4',
                  amount: 200,
                  category: {
                    id: '2',
                    name: 'Transport',
                    color: '#FF6D00',
                  },
                  date: new Date('2021-09-14T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
                {
                  id: '5',
                  amount: 200,
                  category: {
                    id: '2',
                    name: 'Transport',
                    color: '#FF6D00',
                  },
                  date: new Date('2021-10-14T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
                {
                  id: '6',
                  amount: 50,
                  category: {
                    id: '2',
                    name: 'Transport',
                    color: '#FF6D00',
                  },
                  date: new Date('2021-10-14T00:00:00.000Z'),
                  note: 'Bought some transport',
                  recurrence: Recurrence.None,
                },
              ]}
            />
          )}
        </View>
        <View style={{ marginTop: 16 }}>
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
      </View>
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
