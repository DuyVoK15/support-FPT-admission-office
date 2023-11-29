import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../../../../constants/Colors';
import ProfileTextInput from '../../../../components/collaborator/Profile/UserProfile/ProfileTextInput';
import DatePickerField from '../../../../components/collaborator/Profile/UserProfile/DatePickerModal';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import DashedLine from 'react-native-dashed-line';
import ErrorPopup from '../../../../components/shared/PopupNotification/ErrorPopup';
import useUserProfile from './useUserProfile';
import { Controller } from 'react-hook-form';
import FrontImagePicker from '../../../../components/collaborator/Profile/UserProfile/FrontImagePicker';
import BackImagePicker from '../../../../components/collaborator/Profile/UserProfile/BackImagePicker';
import AvatarImagePicker from '../../../../components/collaborator/Profile/UserProfile/AvatarImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SubmitButtonDisable from '../../../../components/shared/Button/SubmitButtonDisable';

const UserProfile: React.FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const { handlers, props, state, setState, datePickerHandlers } =
    useUserProfile();
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="My Profile"
        />
      </Header>
      <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <AvatarImagePicker setValue={handlers.setValue} imgUrl={value} />
            )}
            name="imgUrl"
          />
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={props.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          // style={{width: ScreenWidth*0.9}}
          // contentContainerStyle={{width: ScreenWidth*0.9}}
        >
          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Name"
                placeholder="Name"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="name"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Phone Number"
                placeholder="Phone Number"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="phone"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <DatePickerField
                id="1"
                onPress={() => datePickerHandlers.showDateOfBirthPicker()}
                label="Date Of Birth"
                value={value}
                isVisible={state.isDateOfBirthPickerVisible}
                onConfirm={datePickerHandlers.handleConfirmDateOfBirthPicker}
                onCancel={datePickerHandlers.hideDateOfBirthPicker}
              />
            )}
            name="dateOfBirth"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Citizen Identification Number"
                placeholder="Citizen Identification Number"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.identityNumber"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Citizen Identification Issue Address"
                placeholder="Citizen Identification Issue Address"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.address"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { value } }) => (
              <DatePickerField
                id="2"
                onPress={datePickerHandlers.showIdentityIssueDatePicker}
                label="Citizen Identification Issue Date"
                value={value}
                isVisible={state.isIdentityIssueDatePickerVisible}
                onConfirm={
                  datePickerHandlers.handleConfirmIdentityIssueDatePicker
                }
                onCancel={datePickerHandlers.hideIdentityIssueDatePicker}
              />
            )}
            name="accountInformation.identityIssueDate"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Citizen Identification Issue Place"
                placeholder="Citizen Identification Issue Place"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.placeOfIssue"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Student ID"
                placeholder="Student ID"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.idStudent"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Facebook Profile URL"
                placeholder="Facebook Profile URL"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.fbUrl"
          />

          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <ProfileTextInput
                label="Tax Number"
                placeholder="Tax Number"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="accountInformation.taxNumber"
          />

          <View style={styles.containerCitizenICP}>
            <Text style={styles.citizenICP}>
              Citizen Identification Card Picture
            </Text>
          </View>

          <View style={styles.containerCardImage}>
            <Controller
              control={props.control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, value } }) => (
                <FrontImagePicker
                  setValue={handlers.setValue}
                  identityFrontImg={value}
                />
              )}
              name="accountInformation.identityFrontImg"
            />

            <DashedLine
              axis="vertical"
              dashGap={0}
              dashThickness={1}
              dashLength={8}
              dashColor={COLORS.light_grey}
            />
            <Controller
              control={props.control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, value } }) => (
                <BackImagePicker
                  setValue={handlers.setValue}
                  identityBackImg={value}
                />
              )}
              name="accountInformation.identityBackImg"
            />
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          {!props.isDirty || !props.isValid ? (
            <SubmitButtonDisable titleButton="SAVE CHANGE" />
          ) : (
            <SubmitButton
              titleButton="SAVE CHANGE"
              onPress={handlers.handleSubmit(handlers.onSubmit)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
});
