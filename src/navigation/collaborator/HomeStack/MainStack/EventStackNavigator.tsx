import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EventTab from '../MainTabs/EventTab';

const Stack = createNativeStackNavigator();
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
    </Stack.Navigator>
  )
}

export default EventStackNavigator