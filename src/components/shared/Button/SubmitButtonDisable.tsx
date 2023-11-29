import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SHADOWS } from '../../../constants/Shadows';

type SubmitButtonDisableProps = View['props'] & {
  titleButton?: string;
};

export default class SubmitButtonDisable extends Component<SubmitButtonDisableProps> {
  render() {
    const { titleButton, style, ...otherProps } = this.props;
    return (
      <View
        style={{
          height: 55,
            backgroundColor: COLORS.light_black,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            ...SHADOWS.SHADOW_05
        }}
        {...otherProps}
      >
        <Text
          style={{
            fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
            fontSize: 20,
            color: 'white',
          }}
        >
          {titleButton}
        </Text>

        <MaterialCommunityIcons
          style={{ position: 'absolute', right: 10 }}
          name="arrow-right-circle"
          size={30}
          color={'#FFF'}
        />
      </View>
    );
  }
}
