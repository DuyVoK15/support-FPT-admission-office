import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useToast } from 'react-native-toast-notifications';

const ToastNotification = () => {
    const toast = useToast();

  useEffect(() => {
    toast.show("Hello World");
  }, []);
  return (
    <View>
      <Text>ToastNotification</Text>
    </View>
  )
}

export default ToastNotification

const styles = StyleSheet.create({})