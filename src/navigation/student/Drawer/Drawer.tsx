import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerScreen from './DrawerScreen';

const DrawerTab = createDrawerNavigator();
const Drawer = () => {
  return (
    <DrawerTab.Navigator>
        <DrawerTab.Screen name='a' component={DrawerScreen}/>
    </DrawerTab.Navigator>
  )
}

export default Drawer;

const styles = StyleSheet.create({})