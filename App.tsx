import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { useCallback, useEffect } from 'react';
import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import usePushNotifications from './usePushNotifications';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { MyContextProvider } from './src/context/stateContext';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertNotificationRoot>
        <ToastProvider
          placement="bottom"
          duration={5000}
          animationType="zoom-in"
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          successIcon={<AntDesign name="checkcircle" size={24} color="white" />}
          dangerIcon={
            <MaterialIcons name="dangerous" size={30} color="white" />
          }
          warningIcon={<FontAwesome name="warning" size={24} color="white" />}
          style={{ bottom: 50 }}
          textStyle={{ fontSize: 20 }}
          offset={50} // offset for both top and bottom toasts
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
        >
          <Provider store={store}>
            <MyContextProvider>
              <NavigationContainer>
                <AppNavigator />
                <StatusBar backgroundColor="transparent" translucent={true} />
              </NavigationContainer>
            </MyContextProvider>
          </Provider>
        </ToastProvider>
      </AlertNotificationRoot>
    </GestureHandlerRootView>
  );
}
