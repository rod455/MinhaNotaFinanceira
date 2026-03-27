import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizAnswers, ScoreResult } from '../types';

import SplashScreen from '../screens/SplashScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import LoadingScreen from '../screens/LoadingScreen';
import ResultScreen from '../screens/ResultScreen';
import ActionPlanScreen from '../screens/ActionPlanScreen';
import DetailedPlanScreen from '../screens/DetailedPlanScreen';
import ShareScreen from '../screens/ShareScreen';
import SimulationScreen from '../screens/SimulationScreen';

export type RootStackParamList = {
  Splash: undefined;
  Questionnaire: undefined;
  Loading: { answers: QuizAnswers };
  Result: { answers: QuizAnswers; score: ScoreResult };
  ActionPlan: { answers: QuizAnswers; score: ScoreResult };
  DetailedPlan: { answers: QuizAnswers; score: ScoreResult };
  Share: { score: ScoreResult };
  Simulation: { answers: QuizAnswers; score: ScoreResult };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0B1838' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="ActionPlan" component={ActionPlanScreen} />
        <Stack.Screen name="DetailedPlan" component={DetailedPlanScreen} />
        <Stack.Screen name="Share" component={ShareScreen} />
        <Stack.Screen name="Simulation" component={SimulationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
