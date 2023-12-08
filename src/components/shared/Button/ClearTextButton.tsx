import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';

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
        backgroundColor: 'grey',
      }}
    >
      <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>Clear</Text>
    </TouchableOpacity>
  );
};

export default ClearTextButton;

const styles = StyleSheet.create({});
