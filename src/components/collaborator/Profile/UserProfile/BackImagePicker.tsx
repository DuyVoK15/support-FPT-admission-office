import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config/firebase';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { SHADOWS } from '../../../../constants/Shadows';

interface BackImagePickerProps {
  setValue?: any;
  identityBackImg?: string;
}
const BackImagePicker = (props: BackImagePickerProps) => {
  const imgUndefined = require('../../../../assets/Images/ic_id_card.png');
  const [imagePicker, setImagePicker] = useState<string>(imgUndefined);
  // const [identityBackImg, setIdentityFrontImg] = useState<string>(imgUndefined);
  const [fileName, setFileName] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets[0].uri) {
        console.log('URI MOBILE: ', result.assets[0].uri);
        

        await uploadMedia(result.assets[0].uri);
        
      }
    }
  };

  const uploadMedia = async (uri: string) => {
    setUploading(true);
    console.log('vô đây chưa');
    try {
      console.log('vô đây chưa2');
      //   const { uri } = await FileSystem.getInfoAsync(imagePicker);
      console.log('vô đây chưa3');
      const blob = await new Promise<Blob>((resolve, reject) => {
        console.log('vô đây chưa4');
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
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      if (filename) {
        setFileName(filename);
      }
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

          setUploading(false);
          Alert.alert('Photo uploaded!');
          props.setValue("accountInformation.identityBackImg", url);
          setImagePicker(url);
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.log('Lỗi khi lấy URL hình ảnh:', error);
          
        });
        
    } catch (error) {
      setUploading(false);
      console.log('Lỗi ở: ', error);
   
    }
  };

  const handleRemoveImagePicker = async () => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(fileName);
    try {
      setImagePicker(imgUndefined);
      await imageRef.delete();
      props.setValue("accountInformation.identityBackImg", "");
      console.log('Xóa ảnh thành công');
    } catch (error) {
      setImagePicker(imgUndefined);
      console.log('Lỗi khi xóa ảnh:', error);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
      <View>
        { imagePicker !== imgUndefined? (
          
          <View
          style={{
            borderRadius: 10,
            ...SHADOWS.SHADOW_03,
            backgroundColor: 'white',
          }}
        >
          <Image
            style={{
              height: 100,
              width: 150,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            source={{ uri: imagePicker }}
          />
        </View>
        ) : props?.identityBackImg && props?.identityBackImg !== imgUndefined ? (
          <View
            style={{
              borderRadius: 10,
              ...SHADOWS.SHADOW_03,
              backgroundColor: 'white',
            }}
          >
            <Image
              style={{
                height: 100,
                width: 150,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={{ uri: props.identityBackImg }}
            />
          </View>
        ) : (
          <View
            style={{
              borderRadius: 10,
              ...SHADOWS.SHADOW_03,
              backgroundColor: 'white',
            }}
          >
            <Image
              style={{
                height: 100,
                width: 150,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={imgUndefined}
            />
          </View>
        )}
      </View>
      {imagePicker !== imgUndefined ? (
        <TouchableOpacity
          onPress={handleRemoveImagePicker}
          style={{ position: 'absolute', right: -10, top: -10 }}
        >
          <Image
            style={{ width: 26, height: 26 }}
            source={require('../../../../assets/Images/ic_close.png')}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ position: 'absolute' }} />
      )}

      <View style={styles.containerTextImage}>
        <Text style={styles.textImage}>Back Image</Text>
      </View>
      {/* <TouchableOpacity onPress={uploadMedia}>
          <Text>Update</Text>
        </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default BackImagePicker;

const styles = StyleSheet.create({
  containerTextImage: {
    position: 'absolute',
    bottom: -20,
  },
  textImage: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    color: COLORS.light_black,
  },
});
