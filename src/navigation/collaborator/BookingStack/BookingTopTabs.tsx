import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '../../../constants/Demesions';
import Completed from './BookingTab/Completed';
import Confirm from './BookingTab/Confirm';
import Pending from './BookingTab/Pending';

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
          height: 5,
          width: 120,
          left: (ScreenWidth / 3 - 120) / 2,
          borderRadius: 20,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 16,
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={'BOOKING_PENDING'}
        component={Pending}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'All',
        }}
      />
      <Tab.Screen
        name={'BOOKING_CONFIRM'}
        component={Confirm}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Pending',
        }}
      />
      <Tab.Screen
        name={'BOOKING_COMPLETED'}
        component={Completed}
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
