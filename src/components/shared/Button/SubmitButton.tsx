import React, { Component } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHADOWS } from '../../../constants/Shadows';

type SubmitButtonProps = TouchableOpacity['props'] & {
  titleButton?: string;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
};

export default class SubmitButton extends Component<SubmitButtonProps> {
  render() {
    const { titleButton, style, textStyle, ...otherProps } = this.props;
    return (
      <TouchableOpacity
        style={[
          {
            height: 55,
            backgroundColor: COLORS.orange_button,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            ...SHADOWS.SHADOW_05
          },
          style,
        ]}
        {...otherProps}
      >
        <Text
          style={[{
            fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
            fontSize: 20,
            color: 'white',
          }, textStyle]}
        >
          {titleButton}
        </Text>

        <MaterialCommunityIcons
          style={{ position: 'absolute', right: 10 }}
          name="arrow-right-circle"
          size={30}
          color="black"
        />
      </TouchableOpacity>
    );
  }
}
