import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

type BackwardProps = TouchableOpacity['props'] & {
  titleBackward?: string;
};

export default class Backward extends Component<BackwardProps> {
  render() {
    const { style, titleBackward, ...otherProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity {...otherProps} style={{ flex: 1, paddingRight: 10}}>
          <Entypo name="chevron-left" size={36} color="white" />
        </TouchableOpacity>
        <View style={{ flex: 11 }}>
          <Text
            style={{
              fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
              color: 'white',
              fontSize: 24,
              marginLeft: 5,
            }}
          >
            {titleBackward}
          </Text>
        </View>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Entypo name="dots-three-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
