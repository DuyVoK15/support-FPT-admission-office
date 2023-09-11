import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const AppIcon = () => {
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Image
        style={{ height: 185, width: 195 }}
        source={require('../../../assets/Images/ic_app.png')}
      />
    </View>
  );
};

export default AppIcon;

const styles = StyleSheet.create({});
