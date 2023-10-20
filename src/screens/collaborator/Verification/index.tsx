import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/shared/Header/Back';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  collab_enableAccount,
  collab_verifyAccount,
} from '../../../features/collaborator/collab.accountSlice';
import UpdateEnableAccountResponse from '../../../dtos/collaborator/response/updateEnableAccount.dto';
import { useAppDispatch } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
// import Constants from 'expo-constants';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { SHADOWS } from '../../../constants/Shadows';

const Verification = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const dispatch = useAppDispatch();
  const enableResponse = useAppSelector(
    (state) => state.collab_account.enableResponse
  );

  const handleEnableAccount = async () => {
    try {
      await dispatch(collab_enableAccount()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async (code: number) => {
    try {
      console.log(code);
      await dispatch(collab_verifyAccount({ code })).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header style={{ justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
            fontSize: 26,
            marginBottom: 10,
            color: '#FFF',
          }}
        >
          Verification
        </Text>
      </Header>
      {enableResponse?.status?.success ===true ? (
        <View style={styles.containerBox}>
          <View style={styles.containerTextTitle}>
            <Text style={styles.textTitle}>
              The OTP code has been sent to the email you linked to your
              account. Please check mailbox.
            </Text>
          </View>

          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                style={[styles.cell, isFocused && styles.focusCell]}
              >
                <Text style={styles.textCell}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <View style={styles.containerCountDownTime}>
            <View style={{ flex: 1 }}>
              <Text style={styles.countDownTime}>
                {enableResponse
                  ? 'Time Remaining: ' + enableResponse?.data?.expirationDate
                  : ''}
              </Text>
            </View>
            <TouchableOpacity style={{ flex: 0 }}>
              <Text style={styles.resendOtp}>Resend OTP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerButton}>
            <SubmitButton
              onPress={() => handleVerifyOtp(parseInt(value))}
              titleButton="Verify OTP"
            />
          </View>
        </View>
      ) : (
        <View style={styles.containerBox}>
          <View style={[styles.containerTextTitle, { marginVertical: 30 }]}>
            <Text style={styles.textTitle}>
              You must send OTP for verifying your account first! Click above.
            </Text>
          </View>

          <View style={styles.containerButton}>
            <SubmitButton
              onPress={handleEnableAccount}
              titleButton="Send OTP"
            />
          </View>
        </View>
      )}
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
  containerCountDownTime: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  countDownTime: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    marginLeft: 20,
  },
  resendOtp: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    marginRight: 20,
  },
  containerButton: {
    marginHorizontal: 30,
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    // borderWidth: 2,
    // borderColor: '#00000030',
    borderRadius: 5,
    backgroundColor: '#FFF',
    ...SHADOWS.SHADOW_03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCell: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 24,
  },
  focusCell: {
    ...SHADOWS.SHADOW_06,
    top: -3,
  },
  containerCountDown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
