import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Sentry from 'sentry-expo';

import { theme } from './theme';
import { Categories } from './screens/Categories';
import { Home } from './screens/Home';
import RealmContext from './realm';
import { useRef } from 'react';

const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://4d8e522ac187444fa51215c63949cc74@o1418292.ingest.sentry.io/4504486326370304',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: true,
  enableAutoPerformanceTracking: true,
  enableAutoSessionTracking: true,
  debug: true,

  integrations: [
    new Sentry.Native.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
    }),
  ],
});

const Stack = createNativeStackNavigator();
const { RealmProvider } = RealmContext;

function App() {
  const navigation = useRef();

  return (
    <RealmProvider>
      <NavigationContainer
        theme={theme}
        ref={navigation}
        onReady={() => {
          // Register the navigation container with the instrumentation
          routingInstrumentation.registerNavigationContainer(navigation);
        }}
      >
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

export default Sentry.Native.wrap(App);
