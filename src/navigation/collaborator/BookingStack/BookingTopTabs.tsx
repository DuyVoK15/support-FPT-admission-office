import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '../../../constants/Demesions';
import PendingTab from './BookingTab/PendingTab';
import ConfirmTab from './BookingTab/ConfirmTab';
import CompletedTab from './BookingTab/CompletedTab';

const Tab = createMaterialTopTabNavigator();

const BookingTopTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="BOOKING_PENDING"
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        // tabBarStyle: {
        //   backgroundColor: 'red',
        //   alignItems: 'center',
        // },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.orange_icon,
          height: 4,
          width: 120,
          left: (ScreenWidth / 3 - 120) / 2,
          borderRadius: 20,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 15,
          textTransform: 'none'
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={'BOOKING_PENDING'}
        component={PendingTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Pending',
        }}
      />
      <Tab.Screen
        name={'BOOKING_CONFIRM'}
        component={ConfirmTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Confirm',
        }}
      />
      <Tab.Screen
        name={'BOOKING_COMPLETED'}
        component={CompletedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Completed',
        }}
      />
   
    </Tab.Navigator>
  );
};

export default BookingTopTabs;

const styles = StyleSheet.create({});
