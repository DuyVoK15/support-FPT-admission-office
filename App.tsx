import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
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
import usePushNotifications from './usePushNotifications';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { MyContextProvider } from './src/context/stateContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { LogBox } from 'react-native';
import { useEffect } from 'react';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);
import { Linking } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ROUTES } from './src/constants/Routes';

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
  // Check Network Internet Connection
  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     console.log(state);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertNotificationRoot>
        <ToastProvider
          placement="bottom"
          duration={4000}
          animationType="zoom-in"
          animationDuration={250}
          successColor="#00FF87"
          dangerColor="#F74C06"
          warningColor="#FAB430"
          normalColor="gray"
          // successIcon={<AntDesign name="checkcircle" size={24} color="white" />}
          // dangerIcon={
          //   <MaterialIcons name="dangerous" size={30} color="white" />
          // }
          // warningIcon={<FontAwesome name="warning" size={24} color="white" />}
          style={{ bottom: 50, borderRadius: 20, marginHorizontal: 10 }}
          textStyle={{ fontSize: 16, textAlign: 'center', color: '#2f302f' }}
          offset={50} // offset for both top and bottom toasts
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
        >
          <Provider store={store}>
            <MyContextProvider>
              <NavigationContainer
                linking={{
                  prefixes: ["supfamof://"],
                  config: {
                    initialRouteName: 'Home', // Set the initial route to 'Home'
                    screens: {
                      Home: ROUTES.HOME, // Empty string signifies the default path for the 'Home' screen

                      // ... Additional screens and their paths
                    },
                  },
                  async getInitialURL() {
                    // First, you may want to do the default deep link handling
                    // Check if app was opened from a deep link
                    const url = await Linking.getInitialURL();

                    if (url != null) {
                      return url;
                    }

                    // Handle URL from expo push notifications
                    const response =
                      await Notifications.getLastNotificationResponseAsync();

                    return response?.notification.request.content.data.url;
                  },
                  subscribe(listener) {
                    const onReceiveURL = ({ url }: { url: string }) =>
                      listener(url);

                    // Listen to incoming links from deep linking
                    const eventListenerSubscription = Linking.addEventListener(
                      'url',
                      onReceiveURL
                    );

                    // Listen to expo push notifications
                    const subscription =
                      Notifications.addNotificationResponseReceivedListener(
                        (response) => {
                          const url =
                            response.notification.request.content.data.url;

                          // Any custom logic to see whether the URL needs to be handled
                          //...

                          // Let React Navigation handle the URL
                          listener(url);
                        }
                      );

                    return () => {
                      // Clean up the event listeners
                      eventListenerSubscription.remove();
                      subscription.remove();
                    };
                  },
                }}
              >
                <SafeAreaProvider>
                  <AppNavigator />
                  <StatusBar backgroundColor="transparent" translucent={true} />
                </SafeAreaProvider>
              </NavigationContainer>
            </MyContextProvider>
          </Provider>
        </ToastProvider>
      </AlertNotificationRoot>
    </GestureHandlerRootView>
  );
}
