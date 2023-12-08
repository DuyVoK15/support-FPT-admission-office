import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component, useState } from 'react';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAppDispatch } from '../../../../app/store';
import { firebase } from '../../../../config/firebase';
import GetUserInfoDto from '../../../../dtos/collaborator/getUserInfo.dto';
import { Button } from '@rneui/base';
import SuccessPopup from '../../../shared/PopupNotification/SuccessPopup';
import ErrorPopup from '../../../shared/PopupNotification/ErrorPopup';
import { collab_updateAvatar } from '../../../../features/collaborator/collab.accountSlice';
import { collab_getUserInfo } from '../../../../features/collaborator/collab.authSlice';
import useCustomToast from '../../../../utils/toasts';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';
import { useAppSelector } from '../../../../app/hooks';

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

  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError } = useCustomToast();
  const userInfo = useAppSelector((state) => state.collab_account.userInfo);
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
          console.log(e);
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });
      const filename = imagePicker.substring(imagePicker.lastIndexOf('/') + 1);
      const idStudent =
        userInfo?.data?.accountInformation?.idStudent + '_' ?? 'NOVALUE_';
      const finalFilename = idStudent.concat(filename);
      const storageRef = firebase.storage().ref();
      const ref = storageRef.child('mobile/avatar' + '/' + finalFilename);
      await ref.put(blob);
      storageRef
        .child('mobile/avatar' + '/' + finalFilename)
        .getDownloadURL()
        .then(async (url) => {
          // url chứa đường dẫn tới hình ảnh
          console.log('URL của hình ảnh:', url);
          setImgUrl(url);
          await dispatch(collab_updateAvatar({ imgUrl: url })).then(
            async (res) => {
              if (res?.meta?.requestStatus === 'fulfilled') {
                showToastSuccess('Update Avatar successful!');
              } else {
                const resData = res?.payload as ErrorStatus;
                showToastError(resData?.message);
              }
            }
          );
          setUploading(false);
          // Alert.alert('Photo uploaded!');
          setImagePicker(imgUndefined);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          setUploading(false);
          console.log('Lỗi khi lấy URL hình ảnh:', error);
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
    </View>
  );
};

export default AvatarImagePicker;
const styles = StyleSheet.create({});
