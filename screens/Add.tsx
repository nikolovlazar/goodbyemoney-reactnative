import React, { useEffect, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  InputAccessoryView,
  Keyboard,
  Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import RealmContext from '../realm';
import { ListItem } from '../components/ListItem';
import { Recurrence } from '../types/recurrence';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../theme';
import { Category } from '../models/category';
import { Expense } from '../models/expense';

const { useRealm } = RealmContext;

export const Add = () => {
  const realm = useRealm();
  const categories = realm.objects<Category>('Category');

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const [sheetView, setSheetView] = React.useState<'recurrence' | 'category'>(
    'recurrence'
  );
  const [amount, setAmount] = React.useState('');
  const [recurrence, setRecurrence] = React.useState(Recurrence.None);
  const [date, setDate] = React.useState(new Date());
  const [note, setNote] = React.useState('');
  const [category, setCategory] = React.useState<Category>(categories[0]);

  const onCategoriesChange = (newCategories) => {
    setCategory(newCategories[0] ?? []);
  };

  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    sheetRef.current?.close();
  };

  const selectCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    sheetRef.current?.close();
  };

  const clearForm = () => {
    setAmount('');
    setRecurrence(Recurrence.None);
    setDate(new Date());
    setNote('');
    setCategory(categories[0]);
  };

  const submitExpense = () => {
    realm.write(() => {
      realm.create(
        'Expense',
        Expense.generate(parseFloat(amount), recurrence, date, note, category)
      );
    });

    clearForm();
  };

  useEffect(() => {
    if (categories.isValid()) {
      categories.addListener(onCategoriesChange);
    }

    return () => {
      categories.removeListener(onCategoriesChange);
    };
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={112}
        style={{ margin: 16, flex: 1, alignItems: 'center' }}
      >
        <View
          style={{
            borderRadius: 11,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <ListItem
            label='Amount'
            detail={
              <TextInput
                placeholder='Amount'
                onChange={(event) => setAmount(event.nativeEvent.text)}
                value={amount}
                textAlign='right'
                keyboardType='numeric'
                inputAccessoryViewID='dismissKeyboard'
                style={{
                  height: 40,
                  color: 'white',
                  flex: 1,
                  borderRadius: 8,
                  paddingLeft: 8,
                  fontSize: 16,
                }}
              />
            }
          />
          <ListItem
            label='Recurrence'
            detail={
              <TouchableOpacity
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setSheetView('recurrence');
                  sheetRef.current?.snapToIndex(1);
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    textTransform: 'capitalize',
                    fontSize: 16,
                  }}
                >
                  {recurrence}
                </Text>
              </TouchableOpacity>
            }
          />
          <ListItem
            label='Date'
            detail={
              Platform.OS === 'ios' && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  themeVariant='dark'
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().getFullYear() - 1,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  onChange={(event, newDate) => setDate(newDate)}
                />
              )
            }
          />
          <ListItem
            label='Note'
            detail={
              <TextInput
                placeholder='Note'
                onChange={(event) => setNote(event.nativeEvent.text)}
                value={note}
                textAlign='right'
                inputAccessoryViewID='dismissKeyboard'
                style={{
                  height: 40,
                  color: 'white',
                  flex: 1,
                  borderRadius: 8,
                  paddingLeft: 8,
                  fontSize: 16,
                }}
              />
            }
          />
          <ListItem
            label='Category'
            detail={
              <TouchableOpacity
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setSheetView('category');
                  sheetRef.current?.snapToIndex(1);
                }}
              >
                <Text
                  style={{
                    color: category?.color,
                    textTransform: 'capitalize',
                    fontSize: 16,
                  }}
                >
                  {category?.name}
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 32,
          }}
          onPress={submitExpense}
        >
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 17 }}>
            Submit expense
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        handleStyle={{
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
        handleIndicatorStyle={{ backgroundColor: '#FFFFFF55' }}
        enablePanDownToClose
        snapPoints={snapPoints}
      >
        {sheetView === 'recurrence' && (
          <BottomSheetFlatList
            data={Object.keys(Recurrence)}
            keyExtractor={(i) => i}
            renderItem={(item) => (
              <TouchableHighlight
                style={{ paddingHorizontal: 18, paddingVertical: 12 }}
                onPress={() => selectRecurrence(item.item)}
              >
                <Text style={{ color: 'white', fontSize: 18 }}>
                  {item.item}
                </Text>
              </TouchableHighlight>
            )}
            style={{ backgroundColor: theme.colors.card }}
          />
        )}
        {sheetView === 'category' && (
          <BottomSheetFlatList
            data={categories[0]?.isValid() ? categories : []}
            keyExtractor={({ _id }) => _id.toHexString()}
            renderItem={({ item }) => (
              <TouchableHighlight
                style={{ paddingHorizontal: 18, paddingVertical: 12 }}
                onPress={() => selectCategory(item)}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: item.color,
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                    }}
                  />
                  <Text
                    style={{ color: 'white', fontSize: 18, marginLeft: 12 }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableHighlight>
            )}
            style={{ backgroundColor: theme.colors.card }}
          />
        )}
      </BottomSheet>
      <InputAccessoryView nativeID='dismissKeyboard'>
        <View
          style={{
            height: 44,
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 16,
            alignItems: 'flex-end',
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity onPress={() => Keyboard.dismiss()}>
            <MaterialIcons
              name='keyboard-hide'
              size={28}
              style={{ color: theme.colors.primary }}
            />
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </>
  );
};
