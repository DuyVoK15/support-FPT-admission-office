import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface SendProblemButtonProps extends TouchableOpacityProps {}
const SendProblemButton: FC<SendProblemButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: 'green',
      }}
    >
      <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_400Regular}}>Send</Text>
    </TouchableOpacity>
  );
};

export default SendProblemButton;

const styles = StyleSheet.create({});
