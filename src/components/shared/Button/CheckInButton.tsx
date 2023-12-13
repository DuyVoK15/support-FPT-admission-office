import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';

interface CheckInButtonProps extends TouchableOpacityProps {}

const CheckInButton: FC<CheckInButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 15,
        backgroundColor: '#02cc3b',
      }}
    >
      <View style={{ flex: 0 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
            color: '#FFF',
          }}
        >
          Check In
        </Text>
      </View>

      <View style={{ flex: 0, marginLeft: 5 }}>
        <Feather name="log-in" size={20} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

export default CheckInButton;

const styles = StyleSheet.create({});
