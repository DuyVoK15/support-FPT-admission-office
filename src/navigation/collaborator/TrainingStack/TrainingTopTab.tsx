import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '../../../constants/Demesions';
import { ROUTES } from '../../../constants/Routes';
import PendingTab from './TrainingTabs/PendingTab';
import AssignedTab from './TrainingTabs/AssignedTab';
import PassedTab from './TrainingTabs/PassedTab';
import NotPassedTab from './TrainingTabs/NotPassedTab';
import CanceledTab from './TrainingTabs/CanceledTab';

const Tab = createMaterialTopTabNavigator();

const TrainingTopTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.TRAINING_REGISTRATION_PENDING}
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
          // width: 120,
          // left: (ScreenWidth / 3 - 120) / 2,
          borderRadius: 20,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 15,
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.TRAINING_REGISTRATION_PENDING}
        component={PendingTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Pending',
        }}
      />
      <Tab.Screen
        name={ROUTES.TRAINING_REGISTRATION_ASSIGNED}
        component={AssignedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Assigned',
        }}
      />
      <Tab.Screen
        name={ROUTES.TRAINING_REGISTRATION_PASSED}
        component={PassedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Passed',
        }}
      />
      <Tab.Screen
        name={ROUTES.TRAINING_REGISTRATION_NOTPASSED}
        component={NotPassedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Not Passed',
        }}
      />
      <Tab.Screen
        name={ROUTES.TRAINING_REGISTRATION_CANNCELED}
        component={CanceledTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Cannceled',
        }}
      />
    </Tab.Navigator>
  );
};

export default TrainingTopTabs;

const styles = StyleSheet.create({});
