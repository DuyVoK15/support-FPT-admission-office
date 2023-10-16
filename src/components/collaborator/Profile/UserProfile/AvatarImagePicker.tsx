import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component, useState } from 'react';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAppDispatch } from '../../../../app/store';
import { firebase } from '../../../../config/firebase';
import { updateAvatar } from '../../../../features/collaborator/collab.accountSlice';
import GetUserInfoDto from '../../../../dtos/collaborator/getUserInfo.dto';
import { Button } from '@rneui/base';
import SuccessPopup from '../../../shared/PopupNotification/SuccessPopup';
import ErrorPopup from '../../../shared/PopupNotification/ErrorPopup';

type AvatarImageProps = {
  style?: any;
  setValue?: any;
  imgUrl?: string;
};
const AvatarImagePicker = (props: AvatarImageProps) => {
  const { style, ...otherProps } = props;

  const imgUndefined = require('../../../../assets/Images/ic_user.png');
  const [imgUrl, setImgUrl] = useState<string>(imgUndefined);
  const [imagePicker, setImagePicker] = useState<string>(imgUndefined);
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] =
    useState<boolean>(false);
  const [isErrorPopupVisible, setIsErrorPopupVisible] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

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
          console.log('alo');
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed!'));
          console.log(e);
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
        console.log('đã chạy vô blob');
      });
      console.log('đã chạy vô blob2');
      const filename = imagePicker.substring(imagePicker.lastIndexOf('/') + 1);
      console.log('đã chạy vô blob3');
      const storageRef = firebase.storage().ref();
      console.log('đã chạy vô blob4');
      const ref = storageRef.child(filename);
      console.log('đã chạy vô blob5', JSON.stringify(ref, null, 2));
      await ref.put(blob);
      console.log('đã chạy vô blob6');
      storageRef
        .child(filename)
        .getDownloadURL()
        .then(async (url) => {
          // url chứa đường dẫn tới hình ảnh
          console.log('URL của hình ảnh:', url);
          setImgUrl(url);
          await dispatch(updateAvatar(url)).then((res) => {
            const result = res.payload as GetUserInfoDto;
            if (result?.status?.success) {
              setIsSuccessPopupVisible(true);
            } else {
              setIsErrorPopupVisible(true);
            }
            setTimeout(() => {
              setIsSuccessPopupVisible(false);
              setIsErrorPopupVisible(false);
            }, 5000);
          });
          setUploading(false);
          // Alert.alert('Photo uploaded!');
          setImagePicker(imgUndefined);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error('Lỗi khi lấy URL hình ảnh:', error);
        });
    } catch (error) {
      setUploading(false);
      console.log('Lỗi ở: ', error);
    }
  };

  return (
    <View
      style={{
        height: 147,
        width: 147,
        borderRadius: 100,
        borderColor: '#242760',
        borderWidth: 2,
        alignItems: 'center',
      }}
    >
      {imagePicker !== imgUndefined ? (
        <Image
          style={{
            height: 145,
            width: 145,
            borderRadius: 100,
            borderColor: 'white',
            borderWidth: 3,
            resizeMode: 'stretch',
          }}
          source={{ uri: imagePicker }}
          resizeMode="cover"
          // {...otherProps}
        />
      ) : props.imgUrl && props.imgUrl !== imgUndefined ? (
        <Image
          style={{
            height: 145,
            width: 145,
            borderRadius: 100,
            borderColor: 'white',
            borderWidth: 3,
            resizeMode: 'stretch',
          }}
          source={{ uri: props.imgUrl }}
          resizeMode="cover"
          {...otherProps}
        />
      ) : (
        <Image
          style={{
            height: 100,
            width: 150,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={imgUndefined}
        />
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: 'absolute',
          bottom: 4,
          left: 52,
          // backgroundColor: 'rgba(255,255,255,0.8)',
        }}
      >
        <MaterialCommunityIcons
          name="image-edit-outline"
          size={36}
          color="rgba(255,255,255,0.7)"
        />
      </TouchableOpacity>

      {imagePicker !== imgUndefined && (
        <Button
          containerStyle={{
            marginVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 5,
          }}
          loading={uploading}
          title="Update"
          onPress={uploadMedia}
        />
      )}
      {isSuccessPopupVisible === true ? (
        <SuccessPopup message="Changed avatar successful!" />
      ) : isErrorPopupVisible === true ? (
        <ErrorPopup message="Changed avatar failed. Please try again!" />
      ) : (
        <View />
      )}
    </View>
  );
};

export default AvatarImagePicker;
const styles = StyleSheet.create({});
