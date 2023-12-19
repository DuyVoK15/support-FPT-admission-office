import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { TouchableOpacityProps } from 'react-native';

interface ViewEventButtonProps extends TouchableOpacityProps {}
const ViewEventButton: FC<ViewEventButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        backgroundColor: COLORS?.orange_button,
      }}
    >
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          fontSize: 15,
        }}
      >
        View Event
      </Text>
    </TouchableOpacity>
  );
};

export default ViewEventButton;

const styles = StyleSheet.create({});
