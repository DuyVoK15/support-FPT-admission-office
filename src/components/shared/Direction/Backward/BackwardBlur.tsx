import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

type BackwardBlurProps = TouchableOpacity['props'];
export default class BackwardBlur extends Component<BackwardBlurProps> {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity {...otherProps}>
          <AntDesign name="arrowleft" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    marginLeft: 15,
    borderRadius: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 40,
    height: 40
  },
});
