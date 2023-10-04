import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

const Verification = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const [otp, setOtp] = useState<string>('');

  const handleOtpChange = (text: string, index: number) => {
    let newOtp = otp;
    newOtp = newOtp.substr(0, index) + text + newOtp.substr(index + 1);
    setOtp(newOtp);
    console.log(otp);
  };

  const handleVerifyOtp = async () => {
    try {
      console.log(otp);
      // navigation.push("NewPassword");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Verification"
        />
      </Header>
      <View style={styles.containerBox}>
        <View style={styles.containerTextTitle}>
          <Text style={styles.textTitle}>
            The OTP code has been sent to the email you linked to your account.
            Please check mailbox.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[0]}
            onChangeText={(text) => handleOtpChange(text, 0)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[1]}
            onChangeText={(text) => handleOtpChange(text, 1)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[2]}
            onChangeText={(text) => handleOtpChange(text, 2)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[3]}
            onChangeText={(text) => handleOtpChange(text, 3)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[4]}
            onChangeText={(text) => handleOtpChange(text, 4)}
          />
          <TextInput
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[5]}
            onChangeText={(text) => handleOtpChange(text, 5)}
          />
        </View>

        <View style={styles.containerCountDownTime}>
          <View style={{flex: 1}}>
            <Text style={styles.countDownTime}>Time Remaining: 01:20</Text>
          </View>
          <View style={{flex: 0}}>
            <Text style={styles.resendOtp}>Resend OTP</Text>
          </View>
        </View>

        <View style={styles.containerButton}>
          <SubmitButton titleButton="Verify OTP" />
        </View>
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerBox: {
    marginHorizontal: 15,
  },
  containerTextTitle: {
    marginTop: 20,
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  otpInput: {
    width: ScreenWidth * 0.1,
    height: ScreenWidth * 0.1,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,

    elevation: 6,
    borderRadius: 5,
    fontSize: 28,
    marginRight: 10,
    textAlign: 'center',
  },
  containerCountDownTime: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: "space-evenly"
  },
  countDownTime: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    marginLeft: 20
  },
  resendOtp: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    marginRight: 20
  },
  containerButton: {
    marginHorizontal: 30,
  },
});
