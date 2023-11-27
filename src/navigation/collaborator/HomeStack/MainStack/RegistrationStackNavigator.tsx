import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingTab from '../MainTabs/RegistrationTab';
import RegistrationTab from '../MainTabs/RegistrationTab';
import Registration_Confirm_Detail from '../../../../screens/collaborator/Registration/Confirm/confirmDetail/RegistrationConfirmDetail';
import Registration_Pending_Detail from '../../../../screens/collaborator/Registration/Pending/pendingDetail/RegistrationPendingDetail';
import RequestChangePosition from '../../../../screens/collaborator/Registration/Confirm/reqChangePosition/RequestChangePosition';
import RequestChangePositionPending from '../../../../screens/collaborator/Registration/Pending/reqChangePosition/RequestChangePosition';
import RequestUpdateHistory from '../../../../screens/collaborator/Registration/Confirm/reqUpdateHistory/RequestUpdateHistory';

const Stack = createNativeStackNavigator();
const RegistrationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'REGISTRATION'}
        component={RegistrationTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'REGISTRATION_PENDING_DETAIL'}
        component={Registration_Pending_Detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'REGISTRATION_CONFIRM_DETAIL'}
        component={Registration_Confirm_Detail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'REQUEST_CHANGE_POSITION_CONFIRM'}
        component={RequestChangePosition}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'REQUEST_UPDATE_HISTORY'}
        component={RequestUpdateHistory}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'REQUEST_CHANGE_POSITION_PENDING'}
        component={RequestChangePositionPending}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegistrationStackNavigator;
