import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface ResetFilterButtonProps extends TouchableOpacityProps {}
const ResetFilterButton: FC<ResetFilterButtonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        width: ScreenWidth * 0.4,
        paddingVertical: 12,
        backgroundColor: '#8DE9D5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          color: COLORS?.light_grey,
        }}
      >
        Reset
      </Text>
    </TouchableOpacity>
  );
};

export default ResetFilterButton;

const styles = StyleSheet.create({});
