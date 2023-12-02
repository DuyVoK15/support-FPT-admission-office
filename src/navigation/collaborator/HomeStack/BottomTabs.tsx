import { Platform, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import {
  HomeCollaboratorScreenNavigationProp,
  HomeCollaboratorStackNavigatorParamList,
} from '../../../../type';
import MapTab from './MainTabs/MapTab';
import AccountStackNavigator from './MainStack/AccountStackNavigator';
import HomeStackNavigator from './MainStack/HomeStackNavigator';
import EventStackNavigator from './MainStack/EventStackNavigator';
import RegistrationStackNavigator from './MainStack/RegistrationStackNavigator';
import TrainingStackNavigator from './MainStack/TrainingStackNavigator';
import { ROUTES } from '../../../constants/Routes';

const Tab = createBottomTabNavigator<HomeCollaboratorStackNavigatorParamList>();
const BottomTabs: React.FC = () => {
  return (
    // <View style={{height: Platform.OS === 'android' ? ScreenHeight + 40 : ScreenHeight, width: ScreenWidth}}>
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
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
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          switch (route.name) {
            case ROUTES.REGISTRATION_STACK_NAVIGATOR:
              e.preventDefault();
              console.log('object');
              navigation.navigate(ROUTES.REGISTRATION_STACK_NAVIGATOR);
              break;
              // case ROUTES.ACCOUNT_STACK_NAVIGATOR:
              // e.preventDefault();
              // console.log('object');
              // navigation.navigate(ROUTES.ACCOUNT_STACK_NAVIGATOR, {screen: ROUTES.ACCOUNT});
              // break;
            // case 'REGISTRATION_CONFIRM':
            //   e.preventDefault();
            //   navigation.navigate('REGISTRATION_CONFIRM');
            //   break;
            // case 'REGISTRATION_COMPLETED':
            //   e.preventDefault();
            //   navigation.navigate('REGISTRATION_COMPLETED');
            //   break;
            // case 'REGISTRATION_CANCELLED':
            //   e.preventDefault();
            //   navigation.navigate('REGISTRATION_CANCELLED');
            //   break;

            default:
              break;
          }
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_STACK_NAVIGATOR}
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
        name={ROUTES.EVENT_STACK_NAVIGATOR}
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
        name={ROUTES.TRAINING_STACK_NAVIGATOR}
        component={TrainingStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timetable" color={color} size={26} />
          ),
          tabBarLabel: 'Training',
        }}
      />
      <Tab.Screen
        name={ROUTES.MAP_STACK_NAVIGATOR}
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
        name={ROUTES.REGISTRATION_STACK_NAVIGATOR}
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
        name={ROUTES.ACCOUNT_STACK_NAVIGATOR}
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
