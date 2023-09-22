import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import {
  getUserInfo,
  logout,
} from '../../../../features/collaborator/authSlice';
import AvatarImage from '../../../../components/collaborator/Profile/UserProfile/AvatarImage';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import ProfileTextInput from '../../../../components/collaborator/Profile/UserProfile/ProfileTextInput';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  UserInfo,
  UserInfoUpdate,
} from '../../../../models/collaborator/userInfo.model';
import { formatToDate, formatToISO_8601 } from '../../../../utils/formats';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config/firebase';
import {
  updateAvatar,
  updateProfile,
} from '../../../../features/collaborator/accountSlice';
import { AccountInfoUpdate } from '../../../../models/collaborator/account.model';
import TextInputDatePicker from '../../../../components/collaborator/Profile/UserProfile/DatePickerModal';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePickerField from '../../../../components/collaborator/Profile/UserProfile/DatePickerModal';
import { useAppSelector } from '../../../../app/hooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import SubmitButton from '../../../../components/shared/Button/SubmitButton';

const UserProfile: React.FC = () => {
  const imgUndefined =
    'https://cdn2.storify.me/data/uploads/2022/11/marcdayne_202211192100.jpg';

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>(imgUndefined);
  const [identityNumber, setIdentityNumber] = useState<string>('');
  const [idStudent, setIdStudent] = useState<string>('');
  const [fbUrl, setFbUrl] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [personalIdDate, setPersonalIdDate] = useState<string>('');
  const [placeOfIssue, setPlaceOfIssue] = useState<string>('');
  const [identityFrontImg, setIdentityFrontImg] = useState<string>('');
  const [identityBackImg, setIdentityBackImg] = useState<string>('');
  const [taxNumber, setTaxNumber] = useState<string>('');
  const [imagePicker, setImagePicker] = useState<string>(imgUndefined);
  const [uploading, setUploading] = useState<boolean>(false);

  const UserInfoUpdate = {
    name,
    phone,
    dateOfBirth: formatToISO_8601({ dateProp: dateOfBirth }),
    imgUrl,
    accountInformation: {
      identityNumber,
      idStudent,
      fbUrl,
      address,
      personalIdDate: formatToISO_8601({ dateProp: personalIdDate }),
      placeOfIssue,
      identityFrontImg,
      identityBackImg,
      taxNumber,
    } as AccountInfoUpdate,
  } as UserInfoUpdate;

  const handleUpdateProfile = async () => {
    const rs = await dispatch(updateProfile(UserInfoUpdate));
    if (rs) {
      console.log('Updated profile success!');
    } else {
      console.log('Failed to update profile!');
    }
    console.log('Data: ', JSON.stringify(UserInfoUpdate, null, 2));
  };

  // Pick and Upload image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePicker(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(imagePicker);
      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed!'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = imagePicker.substring(imagePicker.lastIndexOf('/') + 1);
      const storageRef = firebase.storage().ref();
      const ref = storageRef.child(filename);
      await ref.put(blob);

      storageRef
        .child(filename)
        .getDownloadURL()
        .then(async (url) => {
          // url chứa đường dẫn tới hình ảnh
          console.log('URL của hình ảnh:', url);
          setImgUrl(url);
          await dispatch(updateAvatar(url));
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi lấy URL hình ảnh:', error);
        });

      setUploading(false);
      Alert.alert('Photo uploaded!');
      setImagePicker(imgUndefined);
    } catch (error) {
      setUploading(false);
      console.log(error);
    }
  };

  // Load UserInfo state;
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const fetchUserInfo = async () => {
    await dispatch(getUserInfo()).catch((error) => {
      console.log(error);
    });
    unwrapResult;
  };
  useEffect(() => {
    fetchUserInfo();

    if (userInfo) {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
      setPhone(userInfo?.phone);
      setDateOfBirth(formatToDate({ dateProp: userInfo?.dateOfBirth }));
      setImgUrl(userInfo?.imgUrl);
      if (userInfo?.accountInformation) {
        setAddress(userInfo?.accountInformation?.address);
        setIdentityNumber(userInfo?.accountInformation?.identityNumber);
        setPersonalIdDate(
          formatToDate({
            dateProp: userInfo?.accountInformation?.personalIdDate,
          })
        );
        setPlaceOfIssue(userInfo?.accountInformation?.placeOfIssue);
        setIdStudent(userInfo?.accountInformation?.idStudent);
        setFbUrl(userInfo?.accountInformation?.fbUrl);
        setTaxNumber(userInfo?.accountInformation?.taxNumber);
      }

      console.log(userInfo?.accountInformation?.personalIdDate);
    } else {
      console.log('No data!');
    }
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logout());
  };

  // Date time picker modal
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log('A date has been picked: ', formatToDate({ dateProp: date }));
    setPersonalIdDate(formatToDate({ dateProp: date }));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 24 }}>User Profile</Text>
        </View>

        
          <View style={{ alignItems: 'center' }}>
            {imagePicker === imgUndefined ? (
              <AvatarImage
                source={{
                  uri: imgUrl,
                }}
                onPressCamera={pickImage}
              />
            ) : (
              <AvatarImage
                source={{
                  uri: imagePicker,
                }}
                onPressCamera={pickImage}
              />
            )}

            {imagePicker !== imgUndefined && (
              <Button title="Update" onPress={uploadMedia} />
            )}

            <View style={{ marginTop: 30 }}>
              <Button title="Logout" onPress={() => handleLogout()} />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            // style={{width: ScreenWidth*0.9}}
            // contentContainerStyle={{width: ScreenWidth*0.9}}
          >
            <ProfileTextInput
              name="Name"
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <ProfileTextInput
              name="Phone Number"
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />
            <DatePickerField
              onPress={() => showDatePicker()}
              name="Date Of Birth"
              value={dateOfBirth}
            />
            <ProfileTextInput
              name="Citizen Identification Number"
              value={identityNumber}
              onChangeText={(value) => setIdentityNumber(value)}
            />
            <ProfileTextInput
              name="Citizen Identification Issue Address"
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
            <DatePickerField
              onPress={() => showDatePicker()}
              name="Citizen Identification Issue Date"
              value={personalIdDate}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <ProfileTextInput
              name="Citizen Identification Issue Place"
              value={placeOfIssue}
              onChangeText={(value) => setPlaceOfIssue(value)}
            />
            <ProfileTextInput
              name="Student ID"
              value={idStudent}
              onChangeText={(value) => setIdStudent(value)}
            />
            <ProfileTextInput
              name="Facebook Profile URL"
              value={fbUrl}
              onChangeText={(value) => setFbUrl(value)}
            />
            <ProfileTextInput
              name="Tax Number"
              value={taxNumber}
              onChangeText={(value) => setTaxNumber(value)}
            />

            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                  fontSize: 16,
                }}
              >
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
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    color: COLORS.light_black,
                  }}
                >
                  Front Image
                </Text>
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
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                    color: COLORS.light_black,
                  }}
                >
                  Back Image
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              marginVertical: 10
            }}
          >
            <SubmitButton titleButton="SAVE CHANGE" onPress={() => handleUpdateProfile()}  />
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
});
