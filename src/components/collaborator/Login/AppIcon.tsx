import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';

interface AppIconProps {
  style?: StyleProp<ViewStyle>;
}
const AppIcon: FC<AppIconProps> = (props) => {
  return (
    <View style={[{ marginTop: 0 }, props.style]}>
      <Image
        style={{ height: 185, width: 195, resizeMode: 'contain' }}
        source={require('../../../assets/Images/ic_app.png')}
      />
    </View>
  );
};

export default AppIcon;

const styles = StyleSheet.create({});
