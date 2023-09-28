import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PendingTab = () => {
  return (
    <View style={styles.container}>
      <Text>PendingTab</Text>
    </View>
  );
};

export default PendingTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
