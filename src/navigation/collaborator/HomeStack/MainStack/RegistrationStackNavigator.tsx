import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingTab from '../MainTabs/RegistrationTab';
import RegistrationTab from '../MainTabs/RegistrationTab';
import Registration_Confirm_Detail from '../../../../screens/collaborator/Registration/Confirm/ConfirmDetail';

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
        name={'REGISTRATION_CONFIRM_DETAIL'}
        component={Registration_Confirm_Detail}
        options={{
          headerShown: false,       
        }}
      />
    </Stack.Navigator>
  )
}

export default RegistrationStackNavigator;