import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingTab from '../MainTabs/RegistrationTab';
import RegistrationTab from '../MainTabs/RegistrationTab';

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
    </Stack.Navigator>
  )
}

export default RegistrationStackNavigator;