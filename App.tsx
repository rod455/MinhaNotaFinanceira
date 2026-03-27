import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B1838" />
      <AppNavigator />
    </>
  );
}
