import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface CheckOutButtonProps extends TouchableOpacityProps {}

const CheckOutButton: FC<CheckOutButtonProps> = (props) => {
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
        backgroundColor: COLORS?.brown_status,
      }}
    >
      <View style={{ flex: 0 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
            color: 'white',
          }}
        >
          Check Out
        </Text>
      </View>

      <View style={{ flex: 0, marginLeft: 5 }}>
        <Feather name="log-out" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CheckOutButton;

const styles = StyleSheet.create({});
