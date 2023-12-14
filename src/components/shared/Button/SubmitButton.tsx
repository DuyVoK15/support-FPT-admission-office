import React, { Component, FC } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHADOWS } from '../../../constants/Shadows';

interface SubmitButtonProps extends TouchableOpacityProps {
  titleButton?: string;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
}

const SubmitButton: FC<SubmitButtonProps> = (Props) => {
  const { titleButton, style, textStyle, ...otherProps } = Props;
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          height: 55,
          backgroundColor: COLORS.orange_button,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          ...SHADOWS.SHADOW_05,
        },
        style,
      ]}
      {...otherProps}
    >
      <View style={{ flex: 0 }} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text
          style={[
            {
              fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
              fontSize: 20,
              color: 'white',
            },
            textStyle,
          ]}
        >
          {titleButton}
        </Text>
      </View>
      <View style={{position: 'absolute', right: 10}}>
        <MaterialCommunityIcons
          style={{ flex: 0 }}
          name="arrow-right-circle"
          size={30}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SubmitButton;
