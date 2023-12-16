import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface ClearTextButtonProps extends TouchableOpacityProps {}
const ClearTextButton: FC<ClearTextButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: COLORS?.light_black,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          fontSize: 15,
          color: '#FFF',
        }}
      >
        Clear
      </Text>
    </TouchableOpacity>
  );
};

export default ClearTextButton;

const styles = StyleSheet.create({});
