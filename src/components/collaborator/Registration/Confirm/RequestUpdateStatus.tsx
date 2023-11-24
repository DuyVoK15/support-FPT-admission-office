import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';

interface RequestUpdateStatusProps {
    title: string | null;
    color: string | "#000";
}
const RequestUpdateStatus: FC<RequestUpdateStatusProps> = (Props) => {
  return (
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: Props.color,
      }}
    >
      <View
        style={{
          width: 13,
          height: 13,
          borderRadius: 100,
          backgroundColor: Props.color,
          marginRight: 5,
        }}
      />
      <Text
        style={{
          fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
          color: Props.color,
        }}
      >
        {Props.title}
      </Text>
    </View>
  );
};

export default RequestUpdateStatus;

const styles = StyleSheet.create({});
