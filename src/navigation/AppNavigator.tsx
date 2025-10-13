import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useApp } from '../context/AppContext';
import { TabIcon } from '../components/TabIcon';

// Screens
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { StoriesScreen } from '../screens/StoriesScreen';
import { StoryDetailScreen } from '../screens/StoryDetailScreen';
import { SavedScreen } from '../screens/SavedScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { state } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
          position: 'absolute',
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#ff4444',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 5,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconPath={require('../assets/img/HistoryBook.png')}
              emoji="📖"
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconPath={require('../assets/img/Heart.png')}
              emoji={focused ? '❤️' : '🤍'}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconPath={require('../assets/img/Stats.png')}
              emoji="📊"
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              iconPath={require('../assets/img/Settings.png')}
              emoji="⚙️"
              size={24}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { state } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="StoryDetail"
          component={StoryDetailScreen}
          options={{
            presentation: 'card',
            cardStyle: { backgroundColor: '#1a1a1a' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
