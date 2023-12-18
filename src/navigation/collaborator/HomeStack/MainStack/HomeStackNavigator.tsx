import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PositionRegistration from '../../../../screens/collaborator/PositionRegistration/PositionRegistration';
import HomeTab from '../MainTabs/HomeTab';
import Event from '../../../../screens/collaborator/Event/Event';
import EventUpcomming from '../../../../screens/collaborator/Event/EventUpcomming/EventUpcomming';
import EventTopTabs from '../../EventStack/EventTopTabs';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../../type';
import HomeNotification from '../../../../screens/collaborator/Notification/HomeNotitìication/HomeNotification';
import HomeEventDetail from '../../../../screens/collaborator/Home/homeEventDetail/HomeEventDetail';
import { ROUTES } from '../../../../constants/Routes';
import CertificateHistory from '../../../../screens/collaborator/Certificate';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.HOME_EVENT_DETAIL}
        component={HomeEventDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.POSITION_REGISTRATION}
        component={PositionRegistration}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ROUTES.HOME_NOTIFICATION}
        component={HomeNotification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
