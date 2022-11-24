import React from 'react';
import { View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { ListItem } from '../components/ListItem';
import { theme } from '../theme';

export const Settings = () => (
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
      onClick={() => {}}
    />
    <ListItem label='Erase all data' isDestructive onClick={() => {}} />
  </View>
);
