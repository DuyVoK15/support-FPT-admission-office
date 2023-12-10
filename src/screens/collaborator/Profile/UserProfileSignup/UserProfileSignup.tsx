import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import Header from '../../../../components/shared/Header/Back';
import ProfileSignupTextInput from '../../../../components/collaborator/Profile/UserProfileSignup/ProfileSignupTextInput';
import { COLORS } from '../../../../constants/Colors';
import {
  formatDateToDDMMYYYY,
  formatDateTypeToIOSDateString,
} from '../../../../utils/formats';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import DashedLine from 'react-native-dashed-line';
import { Controller, useForm } from 'react-hook-form';
import useUserProfileSignup from './useUserProfileSignup';
import DatePickerField from '../../../../components/collaborator/Profile/UserProfileSignup/DatePickerModal';
import { ScreenWidth } from '../../../../constants/Demesions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorText from './ErrorText';
import { imageNotFoundUri } from '../../../../utils/images';

const UserProfileSignup = () => {
  const { state, handlers, props } = useUserProfileSignup();
  const ERRORS = props.errors;
  // IdentityIssueDate
  const [
    isIdentityIssueDatePickerVisible,
    setIsIdentityIssueDatePickerVisible,
  ] = useState<boolean>(false);

  const showIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(true);
  };

  const hideIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(false);
  };

  const handleConfirmIdentityIssueDatePicker = (date: Date) => {
    handlers.setValue('identityIssueDate', formatDateTypeToIOSDateString(date));
    // setIdentityIssueDate(formatToDate({ dateProp: date }));
    hideIdentityIssueDatePicker();
  };

  return (
    <View style={styles.container}>
      <Header style={{ justifyContent: 'center' }}>
        <Text style={styles.titleHeader}>Sign-up Account Information</Text>
      </Header>
      <View style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                fontSize: 20,
              }}
            >
              {state.userInfo?.name && 'Hello, '}
            </Text>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                fontSize: 20,
              }}
            >
              {state.userInfo?.name ? state.userInfo?.name + '!' : 'No name!'}
            </Text>
          </View>
          <View style={{ marginTop: 5, maxWidth: ScreenWidth * 0.8 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                color: COLORS?.red_date,
                textAlign: 'center',
              }}
            >
              Please fill your all information before exploring! Thank you!
            </Text>
          </View>
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableAutomaticScroll={true}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <Controller
              control={props.control}
              rules={{ required: '*This field is required' }} // Định nghĩa quy tắc kiểm tra lỗi
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Citizen Identification Number"
                  placeholder="Citizen Identification Number *"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="identityNumber"
            />
            {ERRORS?.identityNumber && (
              <ErrorText message={String(ERRORS?.identityNumber?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Citizen Identification Issue Address"
                  placeholder="Citizen Identification Issue Address *"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="address"
            />
            {ERRORS?.address && (
              <ErrorText message={String(ERRORS?.address?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { value } }) => (
                <DatePickerField
                  label="Identity Issue Date"
                  id={'3'}
                  isVisible={isIdentityIssueDatePickerVisible}
                  onPress={showIdentityIssueDatePicker}
                  onConfirm={handleConfirmIdentityIssueDatePicker}
                  onCancel={hideIdentityIssueDatePicker}
                  value={value}
                  // onChange={onChange}
                />
              )}
              name="identityIssueDate"
            />
            {ERRORS?.identityIssueDate && (
              <ErrorText message={String(ERRORS?.identityIssueDate?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Citizen Identification Issue Place"
                  placeholder="Citizen Identification Issue Place *"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="placeOfIssue"
            />
            {ERRORS?.placeOfIssue && (
              <ErrorText message={String(ERRORS?.placeOfIssue?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Student ID"
                  placeholder="Student ID *"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="idStudent"
            />
            {ERRORS?.idStudent && (
              <ErrorText message={String(ERRORS?.idStudent?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Facebook Profile URL"
                  placeholder="Facebook Profile URL *"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="fbUrl"
            />
            {ERRORS?.fbUrl && (
              <ErrorText message={String(ERRORS?.fbUrl?.message)} />
            )}
            <Controller
              control={props.control}
              rules={{
                required: '*This field is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ProfileSignupTextInput
                  label="Tax Number"
                  placeholder="Tax Number"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="taxNumber"
            />
            {ERRORS?.taxNumber && (
              <ErrorText message={String(ERRORS?.taxNumber?.message)} />
            )}
            <View style={styles.containerCitizenICP}>
              <Text style={styles.citizenICP}>
                Citizen Identification Card Picture
              </Text>
            </View>

            <View style={styles.containerCardImage}>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => console.log('a')}
              >
                <View>
                  <Image
                    style={{ height: 100, width: 150, resizeMode: 'cover', borderRadius: 10 }}
                    source={{
                      uri: state.userInfo?.accountInformation?.identityFrontImg
                        ? state.userInfo?.accountInformation?.identityFrontImg
                        : imageNotFoundUri,
                    }}
                  />
                </View>
                <View style={styles.containerTextImage}>
                  <Text style={styles.textImage}>Front Image</Text>
                </View>
              </TouchableOpacity>
              <DashedLine
                axis="vertical"
                dashGap={0}
                dashThickness={1}
                dashLength={8}
                dashColor={COLORS.light_grey}
              />
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <View>
                  <Image
                    style={{ height: 100, width: 150, resizeMode: 'cover', borderRadius: 10 }}
                    source={{
                      uri: state.userInfo?.accountInformation?.identityBackImg
                        ? state.userInfo?.accountInformation?.identityBackImg
                        : imageNotFoundUri,
                    }}
                  />
                </View>
                <View style={styles.containerTextImage}>
                  <Text style={styles.textImage}>Back Image</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.containerButton}>
              <SubmitButton
                onPress={handlers.handleSubmit(handlers.onSubmit)}
                titleButton="SUBMIT"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default UserProfileSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backwardButton: {
    marginHorizontal: 15,
  },
  titleHeader: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 24,
    color: 'black',
    marginBottom: 15,
  },
  containerCitizenICP: {
    alignItems: 'center',
    marginVertical: 20,
  },
  citizenICP: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 16,
  },
  containerCardImage: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  containerTextImage: {
    position: 'absolute',
    bottom: -20,
  },
  textImage: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    color: COLORS.light_black,
  },
  containerButton: {
    marginVertical: 20,
  },
});
