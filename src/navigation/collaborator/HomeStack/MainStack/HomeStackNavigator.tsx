import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetail from '../../../../screens/collaborator/Home/HomeEventDetail';
import PositionRegistration from '../../../../screens/collaborator/PositionRegistration';
import HomeTab from '../MainTabs/HomeTab';
import HomeEventDetail from '../../../../screens/collaborator/Home/HomeEventDetail';

const Stack = createNativeStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='HOME' >
      <Stack.Screen
        name={'HOME'}
        component={HomeTab}
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
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
