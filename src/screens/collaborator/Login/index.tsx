import { ImageBackground, SafeAreaView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppIcon from '../../../components/collaborator/Login/AppIcon';
import CampusSelection from '../../../components/collaborator/Login/CampusSelection';
import LoginButton from '../../../components/collaborator/Login/LoginButton';
import AppVersion from '../../../components/collaborator/Login/AppVersion';
import "expo-dev-client";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '../../../app/store';
import { getUserInfo, loginGoogle } from '../../../features/collaborator/authSlice';



const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '799879175588-c3eve1j8aprq6ijv45roetch9huje68f.apps.googleusercontent.com',
      iosClientId: '799879175588-bn0dkiuaid4tv9rr5ms7n05hv5hq4biq.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, [])

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null | undefined>();
  const [idToken, setIdToken] = useState<string | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

  }, []);

  return (
    <ImageBackground style={{ height: "100%", width: "100%" }} source={require("../../../assets/Images/bg_login.png")} >
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
        <AppIcon />
        <CampusSelection />
        <LoginButton onPress={() => onGoogleButtonPress().then(() => {
          console.log("User signed in!");
          const currentUser = auth().currentUser;
          if (currentUser) {
            currentUser
              .getIdToken()
              .then( async (token) => {
                await dispatch(loginGoogle(token)).then( async () => {
                  await dispatch(getUserInfo());
                })
                setIdToken(token);
                console.log("<LoginScreen> JWT: ", token)
              })
              .catch(error => {
                console.error('<LoginScreen> Error getting ID token:', error);
              });
          }
        })} />
        <Text>{user?.displayName}</Text>
        <AppVersion />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Login;

const styles = StyleSheet.create({})