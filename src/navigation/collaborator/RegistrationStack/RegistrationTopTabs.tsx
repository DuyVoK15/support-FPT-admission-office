import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '../../../constants/Demesions';
import PendingTab from './RegistrationTab/PendingTab';
import ConfirmTab from './RegistrationTab/ConfirmTab';
import CompletedTab from './RegistrationTab/CompletedTab';
import CancelledTab from './RegistrationTab/CancelledTab';

const Tab = createMaterialTopTabNavigator();
interface RegistrationTopTabProps {
  item: string | null;
}
const RegistrationTopTabs: FC<RegistrationTopTabProps> = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="REGISTRATION_PENDING"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        // tabBarStyle: {
        //   backgroundColor: 'red',
        //   alignItems: 'center',
        // },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.orange_icon,
          height: 4,
          // width: ScreenWidth / 4.2,
          // left: (ScreenWidth / 4 - (ScreenWidth / 4.2)) / 2,
          borderRadius: 20,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 15,
          textTransform: 'none',
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={'REGISTRATION_PENDING'}
        // component={PendingTab}
        children={() => <PendingTab item={props.item} />}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Pending',
        }}
      />
      <Tab.Screen
        name={'REGISTRATION_CONFIRM'}
        component={ConfirmTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Confirmed',
        }}
      />
      <Tab.Screen
        name={'REGISTRATION_COMPLETED'}
        component={CompletedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Completed',
        }}
      />
      <Tab.Screen
        name={'REGISTRATION_CANCELLED'}
        component={CancelledTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Cancelled',
        }}
      />
    </Tab.Navigator>
  );
};

export default RegistrationTopTabs;

const styles = StyleSheet.create({});
