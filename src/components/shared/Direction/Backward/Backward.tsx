import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { Component, FC } from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface BackwardProps extends TouchableOpacityProps {
  titleBackward?: string;
}

const Backward: FC<BackwardProps> = (Props) => {
  const { style, titleBackward, ...otherProps } = Props;

  return (
    <View style={[styles.container, style, {}]}>
      <TouchableOpacity
        {...otherProps}
        style={{ flex: 1, paddingHorizontal: 10 }}
      >
        <AntDesign name="arrowleft" size={36} color="#FFF" />
      </TouchableOpacity>
      <View style={{ flex: 10, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
            color: 'white',
            fontSize: 24,
          }}
        >
          {titleBackward}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          paddingHorizontal: 10,
          // backgroundColor: 'red',
          alignItems: 'flex-end',
        }}
      >
        <Entypo name="dots-three-vertical" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
export default Backward;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 15,
    marginBottom: 11,
  },
});
