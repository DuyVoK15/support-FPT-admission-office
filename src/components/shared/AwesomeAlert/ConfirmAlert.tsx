import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

interface ConfrimAlert {
  show?: boolean;
  title?: string | null;
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
      show={props.show}
      showProgress={false}
      title={props.title ?? ''}
      titleStyle={{
        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
        color: COLORS?.orange_icon,
      }}
      message={props.message ?? ''}
      messageStyle={{
        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
        color: 'black',
        textAlign: 'center',
      }}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText={props.cancelText}
      confirmText={props.confirmText}
      confirmButtonColor={props.confirmButtonColor}
      onCancelPressed={props.onCancelPressed}
      onConfirmPressed={props.onConfirmPressed}
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
