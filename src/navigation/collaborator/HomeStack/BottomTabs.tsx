import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../../../constants/Routes';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountTab from './MainTabs/AccountTab';
import BookingTab from './MainTabs/BookingTab';
import EventTab from './MainTabs/EventTab';
import HomeTab from './MainTabs/HomeTab';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';

const Tab = createBottomTabNavigator<HomeCollaboratorStackNavigatorParamList>();
const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={"HOME"}
      // tabBarPosition='bottom'
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          height: Platform.OS ==='ios' ? 100 : 70,
        },
        tabBarLabelStyle: {
          marginBottom: 12,
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name={"HOME"}
        component={HomeTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"EVENTS"}
        component={EventTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"BOOKING"}
        component={BookingTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"ACCOUNT"}
        component={AccountTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
