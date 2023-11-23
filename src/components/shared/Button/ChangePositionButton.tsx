import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface ChangePositionButtonProps extends TouchableOpacityProps {
  titleButton: string | null;
}
const ChangePositionButton: FC<ChangePositionButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity {...otherProps}>
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic,
          fontSize: 13,
          textDecorationLine: 'underline',
        }}
      >
        {Props.titleButton}
      </Text>
    </TouchableOpacity>
  );
};

export default ChangePositionButton;

const styles = StyleSheet.create({});
