import { Button, Image, ImageBackground, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginButton from './LoginButton';
import AppIcon from './AppIcon';
import CampusSelection from './CampusSelection';
import AppVersion from './AppVersion';
import "expo-dev-client";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '../../../app/store';
import { loginGoogle } from '../../../features/student/authSlice';



const Login: React.FC = () => {

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '799879175588-c3eve1j8aprq6ijv45roetch9huje68f.apps.googleusercontent.com',
      
      
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
    console.log(JSON.stringify(user)) 
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

  }, []);

  // useEffect(() => {
  //   const currentUser = auth().currentUser ;
  //   if (currentUser) {
  //     currentUser
  //       .getIdToken()
  //       .then(token => {
  //         console.log(token)
  //         dispatch(loginGoogle(token));
  //         setIdToken(token);
  //       })
  //       .catch(error => {
  //         console.error('Error getting ID token:', error);
  //       });
  //   }
  // }, []);

  return (
    <ImageBackground style={{ height: "100%", width: "100%" }} source={require("../../assets/Images/bg_login.png")} >
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
        <AppIcon />
        <CampusSelection />
        <LoginButton onPress={() => onGoogleButtonPress().then(() => {
          console.log("User signed in!")
          const currentUser = auth().currentUser;
          if (currentUser) {
            currentUser
              .getIdToken()
              .then(token => {
                console.log(token)
                dispatch(loginGoogle(token));
                setIdToken(token);
              })
              .catch(error => {
                console.error('Error getting ID token:', error);
              });
          }
        })} />
        <Text>{user?.displayName}</Text>
        <Button title='Logout' onPress={() => auth()
          .signOut()
          .then(() => console.log('User signed out! '))} />
        <AppVersion />
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Login;

const styles = StyleSheet.create({})