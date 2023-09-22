import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type AvatarImageProps = Image['props'] & {
  onPressCamera?: () => void;
};
export default class AvatarImage extends Component<AvatarImageProps> {
  render() {
    const { style, onPressCamera, ...otherProps } = this.props;

    return (
      <View
        style={{
          height: 147,
          width: 147,
          borderRadius: 100,
          borderColor: '#242760',
          borderWidth: 2,
          alignItems: 'center',
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
        <TouchableOpacity
          onPress={onPressCamera}
          style={{
            position: 'absolute',
            bottom: 4,
            left: 52,
            // backgroundColor: 'rgba(255,255,255,0.8)',
          }}
        >
          <MaterialCommunityIcons
            name="camera-plus-outline"
            size={36}
            color="rgba(255,255,255,0.5)"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
