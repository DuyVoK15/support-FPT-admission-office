import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={"large"} color={'orange'} />
    </View>
  )
}

export default LoadingScreen;

const styles = StyleSheet.create({})