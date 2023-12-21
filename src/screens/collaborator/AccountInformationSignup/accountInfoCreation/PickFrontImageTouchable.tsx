import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import { ScreenHeight } from '../../../../constants/Demesions';

interface PickFrontImageTouchableProps extends TouchableOpacityProps {}
const PickFrontImageTouchable: FC<PickFrontImageTouchableProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        height: ScreenHeight * 0.3,
        borderWidth: 4,
        borderColor: COLORS?.grey_underline,
        borderRadius: 20,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          fontSize: 18,
          color: COLORS?.grey_underline,
        }}
      >
        CCCD Front Image
      </Text>
    </TouchableOpacity>
  );
};

export default PickFrontImageTouchable;

const styles = StyleSheet.create({});
