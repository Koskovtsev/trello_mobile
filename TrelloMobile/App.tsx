import React, { JSX } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { BoardScreen } from './src/screens/board/BoardScreen';
import { HomeScreen, RootStackParamList } from './src/screens/home/HomeScreen';
import { store } from './src/store/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Мої дошки' }} />
            <Stack.Screen name="Board" component={BoardScreen} options={{ title: 'Деталі дошки' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
