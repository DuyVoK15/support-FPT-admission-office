import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { ScreenHeight } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';

interface PickBackImageTouchableProps extends TouchableOpacityProps {}
const PickBackImageTouchable: FC<PickBackImageTouchableProps> = (Props) => {
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
        CCCD Back Image
      </Text>
    </TouchableOpacity>
  );
};

export default PickBackImageTouchable;

const styles = StyleSheet.create({});
