import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { SHADOWS } from '../../../constants/Shadows';
import { MaterialIcons } from '@expo/vector-icons';

interface CurrentUserLocationButtonProps extends TouchableOpacityProps {}
const CurrentUserLocationButton: FC<CurrentUserLocationButtonProps> = (
  Props
) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 40,
        right: 10,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        height: 50,
        width: 50,
        ...SHADOWS.SHADOW_05,
      }}
    >
      <MaterialIcons name="my-location" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default CurrentUserLocationButton;

const styles = StyleSheet.create({});
