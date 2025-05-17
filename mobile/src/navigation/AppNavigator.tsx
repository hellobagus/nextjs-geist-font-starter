import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import UMKMStoreScreen from '../screens/main/UMKMStoreScreen';
import PaymentScreen from '../screens/main/PaymentScreen';
import DonationScreen from '../screens/main/DonationScreen';
import CooperativeScreen from '../screens/main/CooperativeScreen';
import BlogScreen from '../screens/main/BlogScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { userRole } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2C5E1A',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="UMKM"
        component={UMKMStoreScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🏪</Text>,
        }}
      />
      <Tab.Screen
        name="Donation"
        component={DonationScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🤲</Text>,
        }}
      />
      {(userRole === 'admin_pusat' || userRole === 'admin_cabang') && (
        <Tab.Screen
          name="Members"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👥</Text>,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Main Stack
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen}
              options={{ 
                headerShown: true,
                title: 'Payment',
                headerStyle: {
                  backgroundColor: '#2C5E1A',
                },
                headerTintColor: '#FFFFFF',
              }} 
            />
            <Stack.Screen 
              name="Cooperative" 
              component={CooperativeScreen}
              options={{ 
                headerShown: true,
                title: 'Cooperative',
                headerStyle: {
                  backgroundColor: '#2C5E1A',
                },
                headerTintColor: '#FFFFFF',
              }} 
            />
            <Stack.Screen 
              name="Blog" 
              component={BlogScreen}
              options={{ 
                headerShown: true,
                title: 'Blog',
                headerStyle: {
                  backgroundColor: '#2C5E1A',
                },
                headerTintColor: '#FFFFFF',
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
