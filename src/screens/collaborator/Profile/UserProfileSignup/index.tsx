import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward';
import ProfileTextInput from '../UserProfile/ProfileTextInput';
import ProfileSignupTextInput from './ProfileSignupTextInput';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';
import { useAppDispatch } from '../../../../app/store';
import { signupAccountInformation } from '../../../../features/collaborator/accountSlice';
import { AccountInfoSignup } from '../../../../models/collaborator/account.model';
import { isAccountInformationValid } from '../../../../utils/validates';

const UserProfileSignup = () => {
  const dispatch = useAppDispatch();

  const [identityNumber, setIdentityNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [personalIdDate, setPersonalIdDate] = useState<string>('');
  const [placeOfIssue, setPlaceOfIssue] = useState<string>('');
  const [idStudent, setIdStudent] = useState<string>('');
  const [fbUrl, setFbUrl] = useState<string>('');
  const [taxNumber, setTaxNumber] = useState<string>('');
  const [identityFrontImg, setIdentityFrontImg] = useState<string>('');
  const [identityBackImg, setIdentityBackImg] = useState<string>('');

  const AccountInfoSignup = {
    identityNumber,
    idStudent,
    fbUrl,
    address,
    personalIdDate,
    placeOfIssue,
    identityFrontImg,
    identityBackImg,
    taxNumber,
  } as AccountInfoSignup;

  useEffect(() => {
    console.log(AccountInfoSignup) 
    if(isAccountInformationValid(AccountInfoSignup)){
      console.log("con cu")
    } else {
      console.log("con chim")
    }
  }, []);
  

  const handleSubmitInfo = async () => {
    await dispatch(signupAccountInformation(AccountInfoSignup));
  };

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          style={styles.backwardButton}
          onPress={() => console.log('Back to ')}
        />
        <Text style={styles.titleHeader}>Sign-up Profile Information</Text>
      </Header>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 24 }}>Profile Information</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Number *"
            value={identityNumber}
            onChangeText={(value) => setIdentityNumber(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Address *"
            value={address}
            onChangeText={(value) => setAddress(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Date *"
            value={personalIdDate}
            onChangeText={(value) => setPersonalIdDate(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Place *"
            value={placeOfIssue}
            onChangeText={(value) => setPlaceOfIssue(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Student ID *"
            value={idStudent}
            onChangeText={(value) => setIdStudent(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Facebook Profile URL *"
            value={fbUrl}
            onChangeText={(value) => setFbUrl(value)}
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Tax Number"
            value={taxNumber}
            onChangeText={(value) => setTaxNumber(value)}
          />

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 16 }}>
              Citizen Identification Card Picture
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => console.log('a')}
            >
              <Ionicons name="image" size={160} />
              <Text style={{ color: COLORS.light_black }}>Front Image</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 130,
                borderWidth: 1,
                borderColor: COLORS.grey_icon,
                marginHorizontal: 20,
              }}
            ></View>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Ionicons name="image" size={160} />
              <Text style={{ color: COLORS.light_black }}>Back Image</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 50,
            }}
          >
            <TouchableOpacity
              style={{
                width: ScreenWidth * 0.8,
                paddingVertical: 15,
                backgroundColor: COLORS.orange_button,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
              }}
              onPress={() => handleSubmitInfo()}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'white' }}> SUBMIT</Text>
              </View>
              <MaterialCommunityIcons
                style={{ position: 'absolute', right: 10 }}
                name="arrow-right-circle"
                size={30}
                color="black"
              />
            </TouchableOpacity>
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
  },
  backwardButton: {
    marginHorizontal: 15,
  },
  titleHeader: {
    fontSize: 22,
    color: 'white',
    fontStyle: 'italic',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
