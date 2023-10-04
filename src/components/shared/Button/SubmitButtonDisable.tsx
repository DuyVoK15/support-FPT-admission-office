import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constants/Colors'
import { FONTS_FAMILY } from '../../../constants/Fonts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type SubmitButtonDisableProps = TouchableOpacity['props'] & {
    titleButton?: string,
}

export default class SubmitButtonDisable extends Component<SubmitButtonDisableProps> {
  render() {
    const {titleButton, style, ...otherProps} = this.props;
    return (
        <TouchableOpacity
        style={{
          height: 55,
          paddingHorizontal: 100,
          backgroundColor: COLORS.light_grey,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        {...otherProps}
      >
        <Text
          style={{
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            fontSize: 18,
            color: 'white',
          }}
        >
          {titleButton}
        </Text>

        <MaterialCommunityIcons
          style={{ position: 'absolute', right: 10 }}
          name="arrow-right-circle"
          size={30}
          color={COLORS.light_black}
        />
      </TouchableOpacity>
    )
  }
}
