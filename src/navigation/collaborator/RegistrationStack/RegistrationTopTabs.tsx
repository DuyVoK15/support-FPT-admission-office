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
import RejectedTab from './RegistrationTab/RejectedTab';
import { ROUTES } from '../../../constants/Routes';

const Tab = createMaterialTopTabNavigator();
interface RegistrationTopTabProps {
  // item: string | null;
}
const RegistrationTopTabs: FC<RegistrationTopTabProps> = (props) => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.REGISTRATION}
      screenListeners={({ navigation, route }) => ({
        tabPress: (e) => {
          switch (route.name) {
            case ROUTES.REGISTRATION_PENDING:
              e.preventDefault();
              navigation.navigate(ROUTES.REGISTRATION_PENDING);
              break;
            case ROUTES.REGISTRATION_CONFIRM:
              e.preventDefault();
              navigation.navigate(ROUTES.REGISTRATION_CONFIRM);
              break;
            case ROUTES.REGISTRATION_COMPLETED:
              e.preventDefault();
              navigation.navigate(ROUTES.REGISTRATION_COMPLETED);
              break;
            case ROUTES.REGISTRATION_CANCELLED:
              e.preventDefault();
              navigation.navigate(ROUTES.REGISTRATION_CANCELLED);
              break;
            case ROUTES.REGISTRATION_REJECTED:
              e.preventDefault();
              navigation.navigate(ROUTES.REGISTRATION_REJECTED);
              break;
            default:
              break;
          }
        },
      })}
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
          height: 5,
          // width: ScreenWidth / 4.2,
          // left: (ScreenWidth / 3 - (ScreenWidth / 4.2)),
          borderRadius: 20,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarLabelStyle: {
          fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
          fontSize: 16,
          textTransform: 'none',
          // color: COLORS.orange_icon
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.REGISTRATION_PENDING}
        // component={PendingTab}
        children={() => <PendingTab />}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Pending',
        }}
      />
      <Tab.Screen
        name={ROUTES.REGISTRATION_CONFIRM}
        component={ConfirmTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Confirmed',
        }}
      />
      <Tab.Screen
        name={ROUTES.REGISTRATION_COMPLETED}
        component={CompletedTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Completed',
        }}
      />
      <Tab.Screen
        name={ROUTES.REGISTRATION_CANCELLED}
        component={CancelledTab}
        options={{
          tabBarStyle: {
            // marginTop: 50,
          },
          tabBarLabel: 'Cancelled',
        }}
      />
      <Tab.Screen
        name={ROUTES.REGISTRATION_REJECTED}
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

export default RegistrationTopTabs;

const styles = StyleSheet.create({});
