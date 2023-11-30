import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTab from './CertificateTab/AllTab';
import CompletedTab from './CertificateTab/CompletedTab';
import RejectedTab from './CertificateTab/RejectedTab';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { ScreenWidth } from '../../../constants/Demesions';
import { ROUTES } from '../../../constants/Routes';

const Tab = createMaterialTopTabNavigator();

const CertificateTopTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CERTIFICATE_ALL"
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
          fontSize: 13,
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.CERTIFICATE_ALL}
        component={AllTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'All',
        }}
      />
      <Tab.Screen
        name={ROUTES.CERTIFICATE_COMPLETED}
        component={CompletedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Completed',
        }}
      />
      <Tab.Screen
        name={ROUTES.CERTIFICATE_REJECTED}
        component={RejectedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Rejected',
        }}
      />
    </Tab.Navigator>
  );
};

export default CertificateTopTabs;

const styles = StyleSheet.create({});
