import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

type BackwardProps = TouchableOpacity['props'] & {
  titleBackward?: string;
};

export default class Backward extends Component<BackwardProps> {
  render() {
    const { style, titleBackward, ...otherProps } = this.props;

    return (
    <View style={[styles.container, style]}>
      <TouchableOpacity  style={[styles.container, style]} {...otherProps}>
        <Ionicons name="chevron-back" size={36} color="white" />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20 }}>
          {titleBackward}
        </Text>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
});
