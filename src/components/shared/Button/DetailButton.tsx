import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { TouchableOpacityProps } from 'react-native';

interface DetailButtonProps extends TouchableOpacityProps {}
const DetailButton: FC<DetailButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: COLORS?.orange_button,
      }}
    >
      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
          }}
        >
          Details
        </Text>
      </View>

      <View style={{ flex: 0, marginRight: 15 }}>
        <MaterialCommunityIcons
          name="google-circles-extended"
          size={20}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
};

export default DetailButton;

const styles = StyleSheet.create({});
