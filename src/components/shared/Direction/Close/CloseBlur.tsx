import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

type CloseBlurProps = TouchableOpacity['props'];
export default class CloseBlur extends Component<CloseBlurProps> {
  render() {
    const { style, ...otherProps } = this.props;

    return (
      <TouchableOpacity style={[styles.container, style]} {...otherProps}>
        <AntDesign name="close" size={30} color="white" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
  },
});
