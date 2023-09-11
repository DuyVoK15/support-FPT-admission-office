import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppVersion = () => {
  return (
    <View style={{flex: 0.2}}>
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  )
}

export default AppVersion;

const styles = StyleSheet.create({
    versionText: {
        fontSize: 15
    }
})