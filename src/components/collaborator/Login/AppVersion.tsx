import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface AppVersionProps {
  style?: StyleProp<ViewStyle>;
}
const AppVersion: FC<AppVersionProps> = (props) => {
  return (
    <View style={props.style}>
      <Text style={styles.versionText}>Version 1.0.0</Text>
    </View>
  );
};

export default AppVersion;

const styles = StyleSheet.create({
  versionText: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 15,
  },
});
