import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './MainTabs/HomeTab';
import EventTab from './MainTabs/EventTab';
import AccountTab from './MainTabs/AccountTab';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeAdmissionStackNavigatorParamList } from '../../../../type';

const Tab = createBottomTabNavigator<HomeAdmissionStackNavigatorParamList>();
const AdmissionBottomTabs: React.FC = () => {
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
        name={"EVENT"}
        component={EventTab}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ROUTES.MY_BOOKING}
        component={MyBooking}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      /> */}
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

export default AdmissionBottomTabs;

const styles = StyleSheet.create({});
