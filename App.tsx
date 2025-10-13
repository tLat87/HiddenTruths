/**
 * Hidden Truths - React Native App
 * Explore the stories between fact and fable
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
