import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

type BackwardProps = TouchableOpacity['props'] & {
  titleBackward?: string;
};

export default class Backward extends Component<BackwardProps> {
  render() {
    const { style, titleBackward, ...otherProps } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} {...otherProps}>
        <View>
          <AntDesign name="arrowleft" size={32} color="white" />
        </View>
        <Text
          style={{
            fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
            color: 'white',
            fontSize: 24,
            marginLeft: 15,
          }}
        >
          {titleBackward}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },
});
