import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';
import MapTab from './MainTabs/MapTab';
import AccountStackNavigator from './MainStack/AccountStackNavigator';
import HomeStackNavigator from './MainStack/HomeStackNavigator';
import EventStackNavigator from './MainStack/EventStackNavigator';
import RegistrationStackNavigator from './MainStack/RegistrationStackNavigator';

const Tab = createBottomTabNavigator<HomeCollaboratorStackNavigatorParamList>();
const BottomTabs: React.FC = () => {
  return (
    // <View style={{height: Platform.OS === 'android' ? ScreenHeight + 40 : ScreenHeight, width: ScreenWidth}}>
      <Tab.Navigator
        initialRouteName={'HOME'}
        // tabBarPosition='bottom'
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.orange_icon,
          tabBarInactiveTintColor: COLORS.grey_icon,
          tabBarIconStyle: {
            marginTop: 5,
          },
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 30 + 50 : 60,
          },
          tabBarLabelStyle: {
            marginBottom: Platform.OS === 'ios' ? 0 : 10,
            fontSize: 10,
          },
        }}
      >
        <Tab.Screen
          name={'HOME_STACK_NAVIGATOR'}
          component={HomeStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={26} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name={'EVENT_STACK_NAVIGATOR'}
          component={EventStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={26} />
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
              <Ionicons name="map" color={color} size={26} />
            ),
            tabBarLabel: 'Map',
          }}
        />
        <Tab.Screen
          name={'REGISTRATION_STACK_NAVIGATOR'}
          component={RegistrationStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="calendar-check-o" color={color} size={26} />
            ),
            tabBarLabel: 'Registration',
          }}
        />
        <Tab.Screen
          name={'ACCOUNT_STACK_NAVIGATOR'}
          component={AccountStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={26} />
            ),
            tabBarLabel: 'Account',
          }}
        />
      </Tab.Navigator>
    // </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
