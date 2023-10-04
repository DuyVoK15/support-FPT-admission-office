import React, { Component, ReactNode } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions'
import { COLORS } from '../../../constants/Colors'

type HeaderProps = {
    children?: ReactNode;
    style?: StyleProp<ViewStyle>
}

export default class Header extends Component<HeaderProps> {
  render() {
    const {children, style} = this.props;
    return (
      <View style={[{
        // height: ScreenHeight/ 5,
        // width: ScreenWidth,
        backgroundColor: "white",
        borderRadius: 40,
    }, style]}>
        {children}
      </View>
    )
  }
}

