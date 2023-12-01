import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface TakeAgainButtonProps extends TouchableOpacityProps {}
const TakeAgainButton: FC<TakeAgainButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: 'red',
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
          color: 'white',
        }}
      >
        Take again
      </Text>
    </TouchableOpacity>
  );
};

export default TakeAgainButton;

const styles = StyleSheet.create({});
