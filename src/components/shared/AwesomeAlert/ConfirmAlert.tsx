import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

interface ConfrimAlert {
  show?: boolean;
  title?: string;
  message?: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
  onCancelPressed?: () => void;
  onConfirmPressed?: () => void;
}
const ConfirmAlert = (props: ConfrimAlert) => {
  // const [showAlert, setShowAlert] = useState<boolean>(false);

  // const showAlertHandler = () => {
  //   setShowAlert(true);
  // };

  // const hideAlertHandler = () => {
  //   setShowAlert(false);
  // };

  return (
    <View style={styles.container}>

      <AwesomeAlert
      
        show={props.show}
        showProgress={false}
        title={props.title}
        message={props.message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={props.cancelText}
        confirmText={props.confirmText}
        confirmButtonColor={props.confirmButtonColor}
        onCancelPressed={props.onCancelPressed}
        onConfirmPressed={props.onConfirmPressed}
      />
    </View>
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
