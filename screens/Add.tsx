import React, { useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ListItem } from '../components/ListItem';
import { Recurrence } from '../types/recurrence';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { theme } from '../theme';

export const Add = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const [amount, setAmount] = React.useState('');
  const [recurrence, setRecurrence] = React.useState<string>(Recurrence.None);
  const [category, setCategory] = React.useState('');

  const selectRecurrence = (selectedRecurrence: string) => {
    setRecurrence(selectedRecurrence as Recurrence);
    sheetRef.current?.close();
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={112}
        style={{ margin: 16, flex: 1 }}
      >
        <View
          style={{
            borderRadius: 11,
            overflow: 'hidden',
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
        </View>
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
        <BottomSheetFlatList
          data={Object.keys(Recurrence)}
          keyExtractor={(i) => i}
          renderItem={(item) => (
            <TouchableHighlight
              style={{ paddingHorizontal: 18, paddingVertical: 12 }}
              onPress={() => selectRecurrence(item.item)}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>{item.item}</Text>
            </TouchableHighlight>
          )}
          style={{ backgroundColor: theme.colors.card }}
        />
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
