import React from 'react';
import { View, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { ListItem } from '../components/ListItem';
import { theme } from '../theme';

export const Settings = ({ navigation }) => {
  return (
    <View
      style={{
        margin: 16,
        borderRadius: 11,
        overflow: 'hidden',
      }}
    >
      <ListItem
        label='Categories'
        detail={
          <Entypo
            name='chevron-thin-right'
            color='white'
            style={{ opacity: 0.3 }}
            size={20}
          />
        }
        onClick={() => {
          navigation.navigate('Categories');
        }}
      />
      <ListItem
        isDestructive
        label='Erase all data'
        onClick={() => {
          Alert.alert(
            'Are you sure?',
            'This action cannot be undone',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Erase data',
                style: 'destructive',
                onPress: () => console.log('Erase data Pressed'),
              },
            ],
            {
              userInterfaceStyle: 'dark',
            }
          );
        }}
      />
    </View>
  );
};
