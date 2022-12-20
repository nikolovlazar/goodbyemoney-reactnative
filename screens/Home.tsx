import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';

import { Expenses, Reports, Add, Settings } from '../screens';
import { TabBarIcon } from '../components/TabBarIcon';
import { theme } from '../theme';
import React, { useRef } from 'react';

const Tab = createBottomTabNavigator();

export const Home = () => {
  const reportsSheetRef = useRef<BottomSheet>(null);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type='expenses' />,
        }}
        name='Expenses'
        component={Expenses}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type='reports' />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => reportsSheetRef.current.expand()}
              style={{ marginRight: 16 }}
            >
              <MaterialCommunityIcons
                name='calendar-month-outline'
                size={24}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          ),
        }}
        name='Reports'
      >
        {() => <Reports reportsSheetRef={reportsSheetRef} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type='add' />,
        }}
        name='Add'
        component={Add}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabBarIcon {...props} type='settings' />,
        }}
        name='Settings'
        component={Settings}
      />
    </Tab.Navigator>
  );
};
