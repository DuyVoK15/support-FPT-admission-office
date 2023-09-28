import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CompletedTab = () => {
  return (
    <View style={styles.container}>
      <Text>CompletedTab</Text>
    </View>
  )
}

export default CompletedTab

const styles = StyleSheet.create({container: {
  flex: 1,
  backgroundColor: "white"
}})