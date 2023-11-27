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
        paddingVertical: 10,
        width: 115,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: COLORS?.blue_date,
      }}
    >
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
          }}
        >
          Check Out
        </Text>
      </View>

      <View style={{ flex: 0, marginRight: 10 }}>
        <Feather name="log-out" size={20} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default CheckOutButton;

const styles = StyleSheet.create({});
