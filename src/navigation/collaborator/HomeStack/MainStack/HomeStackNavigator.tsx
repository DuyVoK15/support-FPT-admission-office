import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetail from '../../../../screens/collaborator/EventDetail';
import PositionRegistration from '../../../../screens/collaborator/PositionRegistration';
import HomeTab from '../MainTabs/HomeTab';

const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'HOME'}
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'EVENT_DETAIL'}
        component={EventDetail}
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
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
