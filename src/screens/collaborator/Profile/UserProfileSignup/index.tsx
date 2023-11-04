import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../../components/shared/Header/Back';
import ProfileSignupTextInput from '../../../../components/collaborator/Profile/UserProfileSignup/ProfileSignupTextInput';
import { COLORS } from '../../../../constants/Colors';
import {
  formatDateToDDMMYYYY,
} from '../../../../utils/formats';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import DashedLine from 'react-native-dashed-line';
import { Controller, useForm } from 'react-hook-form';
import useUserProfileSignup from './useIndex';
import DatePickerField from '../../../../components/collaborator/Profile/UserProfileSignup/DatePickerModal';

const UserProfileSignup = () => {
  const { handlers, props } = useUserProfileSignup();
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
    handlers.setValue('identityIssueDate', formatDateToDDMMYYYY(date));
    // setIdentityIssueDate(formatToDate({ dateProp: date }));
    hideIdentityIssueDatePicker();
  };
  return (
    <View style={styles.container}>
      <Header style={{ justifyContent: 'center' }}>
        <Text style={styles.titleHeader}>Sign-up Account Information</Text>
      </Header>
      <View style={{ marginTop: 20, marginBottom: 110 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={{ marginHorizontal: 20 }}>
            <Controller
              control={props.control}
              rules={{
                required: true,
              }}
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
            <Controller
              control={props.control}
              rules={{
                required: true,
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
            <Controller
              control={props.control}
              rules={{
                required: true,
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

            <Controller
              control={props.control}
              rules={{
                required: true,
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

            <Controller
              control={props.control}
              rules={{
                required: true,
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

            <Controller
              control={props.control}
              rules={{
                required: true,
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

            <Controller
              control={props.control}
              rules={{
                required: true,
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
                    style={{ height: 100, width: 150, resizeMode: 'cover' }}
                    source={require('../../../../assets/Images/ic_id_card.png')}
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
                    style={{ height: 100, width: 150, resizeMode: 'cover' }}
                    source={require('../../../../assets/Images/ic_id_card.png')}
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
        </ScrollView>
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
