import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CaptureScreen } from '../features/capture/screens/CaptureScreen';
import { ProcessingScreen } from '../features/capture/screens/ProcessingScreen';
import { ResultScreen } from '../features/capture/screens/ResultScreen';

export type MainTabParamList = {
  Capture: undefined;
  Processing: undefined;
  Result: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 20,
          paddingTop: 10,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Capture"
        component={CaptureScreen}
        options={{
          tabBarLabel: 'Capture',
          tabBarIcon: ({ color, size }) => (
            // You can add custom icons here
            <></>
          ),
        }}
      />
      <Tab.Screen
        name="Processing"
        component={ProcessingScreen}
        options={{
          tabBarLabel: 'Processing',
          tabBarIcon: ({ color, size }) => (
            <></>
          ),
        }}
      />
      <Tab.Screen
        name="Result"
        component={ResultScreen}
        options={{
          tabBarLabel: 'Results',
          tabBarIcon: ({ color, size }) => (
            <></>
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 