import {
  Alert,
  Button,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import {
  getUserInfo,
  logout,
} from '../../../../features/collaborator/authSlice';
import AvatarImage from '../../../../components/collaborator/Profile/UserProfile/AvatarImage';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
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
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import DashedLine from 'react-native-dashed-line';

const UserProfile: React.FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
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
  const [identityIssueDate, setIdentityIssueDate] = useState<string>('');
  const [placeOfIssue, setPlaceOfIssue] = useState<string>('');
  const [identityFrontImg, setIdentityFrontImg] = useState<string>('');
  const [identityBackImg, setIdentityBackImg] = useState<string>('');
  const [taxNumber, setTaxNumber] = useState<string>('');
  const [imagePicker, setImagePicker] = useState<string>(imgUndefined);
  const [imageFrontPicker, setImageFrontPicker] =
    useState<string>(imgUndefined);
  const [imageBackPicker, setImageBackPicker] = useState<string>(imgUndefined);
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
      identityIssueDate: formatToISO_8601({ dateProp: identityIssueDate }),
      placeOfIssue,
      identityFrontImg,
      identityBackImg,
      taxNumber,
    }
  }

  const handleUpdateProfile = async () => {
    console.log('Data: ', JSON.stringify(UserInfoUpdate, null, 2));
    await dispatch(updateProfile(UserInfoUpdate)).then((res) => {
      console.log(JSON.stringify(res, null, 2))
    });
    
    
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
      console.log('URI MOBILE: ', result.assets[0].uri);
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
      console.log('Lỗi ở: ', error);
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
    fetchUserInfo().then(() => {
      if (userInfo) {
        setName(userInfo?.name);
        setEmail(userInfo?.email);
        setPhone(userInfo?.phone);
        setDateOfBirth(formatToDate({ dateProp: userInfo?.dateOfBirth }));
        setImgUrl(userInfo?.imgUrl);
        if (userInfo?.accountInformation) {
          setAddress(userInfo?.accountInformation?.address);
          setIdentityNumber(userInfo?.accountInformation?.identityNumber);
          setIdentityIssueDate(
            formatToDate({
              dateProp: userInfo?.accountInformation?.identityIssueDate,
            })
          );
          setPlaceOfIssue(userInfo?.accountInformation?.placeOfIssue);
          setIdStudent(userInfo?.accountInformation?.idStudent);
          setFbUrl(userInfo?.accountInformation?.fbUrl);
          setTaxNumber(userInfo?.accountInformation?.taxNumber);
        }

        console.log(userInfo?.accountInformation?.identityIssueDate);
      } else {
        console.log('No data!');
      }
    });
  }, []);



  // Date Of Birth
  const [isDateOfBirthPickerVisible, setIsDateOfBirthPickerVisible] = useState<boolean>(false);

  const showDateOfBirthPicker = () => {
    setIsDateOfBirthPickerVisible(true);
  };

  const hideDateOfBirthPicker = () => {
    setIsDateOfBirthPickerVisible(false);
  };

  const handleConfirmDateOfBirthPicker = (date: any) => {
    console.log('A date has been picked: ', formatToDate({ dateProp: date }));
    setDateOfBirth(formatToDate({ dateProp: date }));
    hideDateOfBirthPicker();
  };

  // IdentityIssueDate
  const [isIdentityIssueDatePickerVisible, setIsIdentityIssueDatePickerVisible] = useState<boolean>(false);

  const showIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(true);
  };

  const hideIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(false);
  };

  const handleConfirmIdentityIssueDatePicker = (date: any) => {
    console.log('A date has been picked: ', formatToDate({ dateProp: date }));
    setIdentityIssueDate(formatToDate({ dateProp: date }));
    hideIdentityIssueDatePicker();
  };


  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="My Profile"
        />
      </Header>
      <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
        {/* <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 24 }}>User Profile</Text>
        </View> */}

        <View style={{ alignItems: 'center', marginBottom: 10 }}>
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
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
          id='1'
            onPress={() => showDateOfBirthPicker()}
            name="Date Of Birth"
            value={dateOfBirth}
            isVisible={isDateOfBirthPickerVisible}
            onConfirm={handleConfirmDateOfBirthPicker}
            onCancel={hideDateOfBirthPicker}
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
          id='2'
            onPress={() => showIdentityIssueDatePicker()}
            name="Citizen Identification Issue Date"
            value={identityIssueDate}
            isVisible={isIdentityIssueDatePickerVisible}
            onConfirm={handleConfirmIdentityIssueDatePicker}
            onCancel={hideIdentityIssueDatePicker}
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

          <View style={styles.containerCitizenICP}>
            <Text style={styles.citizenICP}>
              Citizen Identification Card Picture
            </Text>
          </View>

          <View style={styles.containerCardImage}>
            <TouchableOpacity style={{ alignItems: 'center' }}>
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
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            marginBottom: 30,
            marginHorizontal: 10,
          }}
        >
          <SubmitButton
            titleButton="SAVE CHANGE"
            onPress={() => handleUpdateProfile()}
          />
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
