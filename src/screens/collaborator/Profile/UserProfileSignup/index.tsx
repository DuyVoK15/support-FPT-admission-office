import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import ProfileTextInput from '../../../../components/collaborator/Profile/UserProfile/ProfileTextInput';
import ProfileSignupTextInput from '../../../../components/collaborator/Profile/UserProfileSignup/ProfileSignupTextInput';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';
import { useAppDispatch } from '../../../../app/store';
import { signupAccountInformation } from '../../../../features/collaborator/accountSlice';
import { AccountInfoSignup } from '../../../../models/collaborator/account.model';
import { isAccountInformationValid } from '../../../../utils/validates';
import { formatToISO_8601 } from '../../../../utils/formats';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';
import DashedLine from 'react-native-dashed-line';
import { Controller, useForm } from 'react-hook-form';
import useUserProfileSignup from './useIndex';

const UserProfileSignup = () => {
  const {handlers, props} = useUserProfileSignup();

  return (
    <View style={styles.container}>
      <Header style={{ justifyContent: 'center' }}>
        <Text style={styles.titleHeader}>Sign-up Account Information</Text>
      </Header>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        > */}
        <View>
          <Controller
            control={props.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ProfileSignupTextInput
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <ProfileSignupTextInput
                style={{ marginVertical: 10, backgroundColor: 'white' }}
                placeholder="Citizen Identification Issue Date *"
                onChangeText={onChange}
                value={value}
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
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
                style={{ marginVertical: 10, backgroundColor: 'white' }}
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
        </View>
        {/* </ScrollView> */}

        <View style={styles.containerButton}>
          <SubmitButton onPress={handlers.handleSubmit(handlers.onSubmit)} titleButton="SUBMIT" />
        </View>
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
    marginVertical: 40,
  },
});
