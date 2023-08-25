import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Events from './Events'
import MyBooking from './MyBooking'
import { ROUTES } from '../../../constants/Routes'
import Profile from './Profile'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { COLORS } from '../../../constants/Colors'

const Tab = createBottomTabNavigator()
const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.orange_icon,
        tabBarInactiveTintColor: COLORS.grey_icon,
        tabBarIconStyle: {
          marginTop: 5
        },
        tabBarStyle: {
          height: 70
        },
        tabBarLabelStyle:{
          marginBottom: 12,
          fontSize: 12
        }
      }}
    >
      <Tab.Screen name={ROUTES.HOME} component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='home' color={color} size={size} />
        )
      }} />
      <Tab.Screen name={ROUTES.EVENTS} component={Events} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='calendar' color={color} size={size} />
        )
      }} />
      <Tab.Screen name={ROUTES.MY_BOOKING} component={MyBooking} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='bookmark' color={color} size={size} />
        )
      }} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='person' color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default BottomTabs;

const styles = StyleSheet.create({})