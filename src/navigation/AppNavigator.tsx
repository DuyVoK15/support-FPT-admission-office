import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants/Routes'
import BottomTabs from './student/MainTab/BottomTabs'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/student/Login'
import UserProfileSignup from '../screens/student/Profile/UserProfileSignup'
import { useAppSelector } from '../app/hooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppConstants from '../enums/student/app'



const AuthStackScreen: React.FC = () => {
    return (
        <Login />
    )
}

const HomeStudentStack = createNativeStackNavigator();
const HomeStudentStackScreen: React.FC = () => {
    return (
        <HomeStudentStack.Navigator>
            <HomeStudentStack.Screen name={ROUTES.HOME_TAB} component={BottomTabs} options={{
                headerShown: false,
            }}/>
        </HomeStudentStack.Navigator>
    )
}

const HomeAdmissionStack = createNativeStackNavigator(); 
const HomeAdmissionStackScreen: React.FC = () => {
    return (
        <HomeAdmissionStack.Navigator>
            <HomeAdmissionStack.Screen name={ROUTES.HOME_TAB} component={BottomTabs} options={{
                headerShown: false,
            }}/>
        </HomeAdmissionStack.Navigator>
    )
}

const AppNavigator: React.FC = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const [isLoggined, setIsLoggined] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            
            const access_token = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
            console.log("<APP NAVIGATOR> ACCESS TOKEN: ", access_token)
            if(access_token){
                setIsLoggined(true);
            } else {
                setIsLoggined(false);
            } 
             
            // Do something with isLoggined
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
    
        fetchData();
      }, []);
    useEffect(() => { 
        console.log("Authen: ", isAuthenticated) 
    },[])
    return ( 
        isAuthenticated ? <HomeStudentStackScreen /> : <AuthStackScreen /> 


    )
}

export default AppNavigator

const styles = StyleSheet.create({})