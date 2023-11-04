import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventTab from '../MainTabs/EventTab';
import EventDetail from '../../../../screens/collaborator/Event/EventDetail';
import HomeEventDetail from '../../../../screens/collaborator/Home/HomeEventDetail';
import PositionRegistration from '../../../../screens/collaborator/PositionRegistration';
import { HomeCollaboratorStackNavigatorParamList } from '../../../../../type';
import EventNotification from '../../../../screens/collaborator/Notification/EventNotification';

const Stack =
  createNativeStackNavigator<HomeCollaboratorStackNavigatorParamList>();
const EventStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'EVENT'}
        component={EventTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'HOME_EVENT_DETAIL'}
        component={HomeEventDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'POSITION_REGISTRATION'}
        component={PositionRegistration}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'EVENT_NOTIFICATION'}
        component={EventNotification}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default EventStackNavigator;
