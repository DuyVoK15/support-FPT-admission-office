import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingTab from '../MainTabs/BookingTab';

const Stack = createNativeStackNavigator();
const BookingStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'BOOKING'}
        component={BookingTab}
        options={{
          headerShown: false,       
        }}
      />
    </Stack.Navigator>
  )
}

export default BookingStackNavigator