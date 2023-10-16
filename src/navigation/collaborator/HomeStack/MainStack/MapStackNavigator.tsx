import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapTab from '../MainTabs/MapTab';

const Stack = createNativeStackNavigator();
const MapStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"MAP"}
        component={MapTab}
        options={{
          headerShown: false,       
        }}
      />
    </Stack.Navigator>
  )
}

export default MapStackNavigator;