import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { logout } from '../../../../features/collaborator/authSlice';
import AvatarImage from './AvatarImage';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import ProfileTextInput from './ProfileTextInput';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  UserInfo,
  UserInfoUpdate,
} from '../../../../models/collaborator/userInfo.model';
import { formatToDate, formatToISO_8601 } from '../../../../utils/formats';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config/firebase';
import { updateProfile } from '../../../../features/collaborator/accountSlice';
import { AccountInfoUpdate } from '../../../../models/collaborator/account.model';

interface UserProfileProps {
  userInfo: UserInfo | null; 
}
const UserProfile: React.FC<UserProfileProps> = ({ userInfo }) => {
  const dispatch = useAppDispatch();
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
  const [image, setImage] = useState<string>(imgUndefined);
  const [uploading, setUploading] = useState<boolean>(false);

  const UserInfoUpdate = {
    name,
    phone,
    dateOfBirth: formatToISO_8601({dateProp: dateOfBirth}),
    imgUrl,
    updateAccountInformation: {
      identityNumber,
      idStudent,
      fbUrl,
      address,
      personalIdDate: formatToISO_8601({dateProp: personalIdDate}),
      placeOfIssue,
      identityFrontImg,
      identityBackImg,
      taxNumber,
    } as AccountInfoUpdate,
  } as UserInfoUpdate;

  const handleUpdateProfile = async () => {
    // const rs = await dispatch(updateProfile(UserInfoUpdate));
    // if (rs) {
    //   console.log('Updated profile success!');
    // } else {
    //   console.log('Failed to update profile!');
    // }
    console.log("Data: ", JSON.stringify(UserInfoUpdate, null, 2))
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
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

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storageRef = firebase.storage().ref();
      const ref = storageRef.child(filename);
      await ref.put(blob);

      storageRef
        .child(filename)
        .getDownloadURL()
        .then((url) => {
          // url chứa đường dẫn tới hình ảnh
          console.log('URL của hình ảnh:', url);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi lấy URL hình ảnh:', error);
        });

      setUploading(false);
      Alert.alert('Photo uploaded!');
      setImage('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

  console.log(JSON.stringify(userInfo));
  const handleLogout = async () => {
    await dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <View style={{ width: ScreenWidth * 0.9, marginTop: 50 }}>
        <Text style={{ fontSize: 24 }}>User Profile</Text>
      </View>

      <View style={{ alignItems: 'center', flex: 1 }}>
        <AvatarImage
          source={{
            uri: imgUrl,
          }}
          onPressCamera={pickImage}
        />
        <Button title="Update" onPress={uploadMedia} />

        <View style={{ marginTop: 30 }}>
          <Button title="Logout" onPress={() => handleLogout()} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
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
          <ProfileTextInput
            name="Date Of Birth"
            value={dateOfBirth}
            onChangeText={(value) => setDateOfBirth(value)}
          />
          <ProfileTextInput
            name="Avatar Image URL"
            value={imgUrl}
            onChangeText={(value) => setImgUrl(value)}
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
          <ProfileTextInput
            name="Citizen Identification Issue Date"
            value={personalIdDate}
            onChangeText={(value) => setPersonalIdDate(value)}
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
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => handleUpdateProfile()}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'white' }}>
                  {' '}
                  SAVE CHANGE
                </Text>
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

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
