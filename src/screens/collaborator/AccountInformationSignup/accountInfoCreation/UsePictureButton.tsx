import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface UsePictureButtonProps extends TouchableOpacityProps {}
const UsePictureButton: FC<UsePictureButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: 'green',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
          color: 'white',
        }}
      >
        Use picture
      </Text>
    </TouchableOpacity>
  );
};

export default UsePictureButton;

const styles = StyleSheet.create({});
