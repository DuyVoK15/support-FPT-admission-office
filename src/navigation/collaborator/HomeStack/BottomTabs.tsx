import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../../../constants/Routes';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountTab from './MainTabs/AccountTab';
import BookingTab from './MainTabs/BookingTab';
import EventTab from './MainTabs/EventTab';
import HomeTab from './MainTabs/HomeTab';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';
import MapTab from './MainTabs/MapTab';
import AccountStackNavigator from './MainStack/AccountStackNavigator';
import HomeStackNavigator from './MainStack/HomeStackNavigator';

const Tab = createBottomTabNavigator<HomeCollaboratorStackNavigatorParamList>();
const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={'HOME'}
      // tabBarPosition='bottom'
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 70,
        },
        tabBarLabelStyle: {
          marginBottom: 0,
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name={'HOME_STACK_NAVIGATOR'}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={'EVENT_STACK_NAVIGATOR'}
        component={EventTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
          tabBarLabel: 'Event',
        }}
      />
      <Tab.Screen
        name={'MAP_STACK_NAVIGATOR'}
        component={MapTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
          tabBarLabel: 'Map',
        }}
      />
      <Tab.Screen
        name={'BOOKING_STACK_NAVIGATOR'}
        component={BookingTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-check-o" color={color} size={size} />
          ),
          tabBarLabel: 'Booking',
        }}
      />
      <Tab.Screen
        name={'ACCOUNT_STACK_NAVIGATOR'}
        component={AccountStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
