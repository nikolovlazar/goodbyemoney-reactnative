import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from './theme';
import { Categories } from './screens/Categories';
import { Home } from './screens/Home';
import RealmContext from './realm';

const Stack = createNativeStackNavigator();
const { RealmProvider } = RealmContext;

export default function App() {
  return (
    <RealmProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style='light' />
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name='Home'
            component={Home}
          />
          <Stack.Screen name='Categories' component={Categories} />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}
