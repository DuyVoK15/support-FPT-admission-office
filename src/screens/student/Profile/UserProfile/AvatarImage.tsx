import { Image, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

type AvatarImageProps = Image['props'] & {}
export default class AvatarImage extends Component<AvatarImageProps> {
  render() {
    const {style, ...otherProps} = this.props;

    return (
      <View
        style={{
          borderRadius: 100,
          borderColor: '#242760',
          borderWidth: 3,
        }}
      >
        <Image
          style={{
            height: 145,
            width: 145,
            borderRadius: 100,
            borderColor: 'white',
            borderWidth: 3,
            resizeMode: 'stretch',
          }}
          {...otherProps}         
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
