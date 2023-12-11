import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { ScreenWidth } from '../../../constants/Demesions';

export enum TITLE_ENUM {
  SUCCESS = 1,
  ERROR = 2,
  WARNING = 3,
}
interface ConfrimAlert {
  show?: boolean;
  title?: string | null;
  titleType?: number | null;
  message?: string | null;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
}
const ConfirmAlert = (props: ConfrimAlert) => {
  return (
    <AwesomeAlert
      useNativeDriver={true}
      contentContainerStyle={{
        // height: ScreenWidth * 0.6,
        width: ScreenWidth * 0.8,
        paddingBottom: 20
      }}
      show={props.show}
      showProgress={false}
      title={props.title ?? ''}
      titleStyle={{
        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
        fontSize: 20,
        color:
          props.titleType === TITLE_ENUM.SUCCESS
            ? 'green'
            : props.titleType === TITLE_ENUM.ERROR
            ? 'red'
            : COLORS?.orange_icon,
      }}
      message={props.message ?? ''}
      messageStyle={{
        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
      }}
      alertContainerStyle={{margin: 0}}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      actionContainerStyle={{marginTop: 10}}
      cancelText={props.cancelText}
      confirmText={props.confirmText}
      confirmButtonColor={props.confirmButtonColor}
      onCancelPressed={props.onCancelPressed}
      onConfirmPressed={props.onConfirmPressed}
      confirmButtonStyle={{paddingVertical: 12, paddingHorizontal: 16, marginLeft: 15}}
      cancelButtonStyle={{paddingVertical: 12, paddingHorizontal: 16, marginRight: 15}}
      cancelButtonTextStyle={{fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 16}}
      confirmButtonTextStyle={{fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 16}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default ConfirmAlert;
