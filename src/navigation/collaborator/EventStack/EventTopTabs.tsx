import { View, Text } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../../constants/Colors';
import { ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import EventUpcommingTab from './EventTab/EventUpcommingTab';
import EventMissingSlotTab from './EventTab/EventMissingSlotTab';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../type';

const EventTab =
  createMaterialTopTabNavigator<HomeCollaboratorStackNavigatorParamList>();
const EventTopTabs = () => {
  return (
    <EventTab.Navigator
      initialRouteName="EVENT_UPCOMMING"
      screenOptions={{
        tabBarItemStyle: {
          // borderRadius: 100,
          backgroundColor: '#FFF',
          // marginHorizontal: 10
          // ...SHADOWS.SHADOW_01
        },
        tabBarPressColor: 'blue',
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        // tabBarStyle: {
        //   backgroundColor: 'red',
        //   alignItems: 'center',
        // },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },

        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 15,
          textTransform: 'none',
          // color: COLORS.orange_icon
        },
      }}
    >
      <EventTab.Screen
        name={'EVENT_UPCOMMING'}
        component={EventUpcommingTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Upcomming Event',
        }}
      />
      <EventTab.Screen
        name={'EVENT_MISSING_SLOT'}
        component={EventMissingSlotTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Re-Open Event',
        }}
      />
    </EventTab.Navigator>
  );
};

export default EventTopTabs;
