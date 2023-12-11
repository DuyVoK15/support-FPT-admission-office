import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
import { imageNotFoundUri } from '../../../../utils/images';
import { ViewIDRecognitionFrontResponse } from '../../../../dtos/collaborator/response/viewIDRecognition.dto';
import { useAppDispatch } from '../../../../app/store';
import { getInformationFromRecognitionFront } from '../../../../features/collaborator/collab.scanIDRecognitionSlice';
import { useAppSelector } from '../../../../app/hooks';
import useCustomToast from '../../../../utils/toasts';
import SwapCameraButton from '../accountInfoCreation/SwapCameraButton';
import TakePictureButton from '../accountInfoCreation/TakePictureButton';
import TakeAgainButton from '../accountInfoCreation/TakeAgainButton';
import UsePictureButton from '../accountInfoCreation/UsePictureButton';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import {
  collab_getUserInfo,
  collab_updateFrontImage,
  collab_updateInformationFront,
} from '../../../../features/collaborator/collab.accountSlice';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../../../../config/firebase';
import { ROUTES } from '../../../../constants/Routes';
import { COLORS } from '../../../../constants/Colors';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';
import Spinner from 'react-native-loading-spinner-overlay';

const ScanIDRecognitionFront = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError } = useCustomToast();

  const informationFront = useAppSelector(
    (state) => state.collan_information.informationFront
  );
  const loadingScan = useAppSelector(
    (state) => state.collan_information.loading
  );
  const loadingUpdate = useAppSelector(
    (state) => state.collab_account.loading_update
  );
  const fetchUserInfo = async () => {
    try {
      await dispatch(collab_getUserInfo()).then((res) => {
        if (res?.meta?.requestStatus === 'rejected') {
          const resData = res?.payload as ErrorStatus;
          showToastError(resData?.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateInformationFront = async (
    identityNumber: string,
    address: string
  ) => {
    try {
      const res = await dispatch(
        collab_updateInformationFront({ identityNumber, address })
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<Camera | null>(null);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const swapCamera = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 1 });
      setImageUri(photo?.uri ?? null);
      console.log(photo);
    }
  };

  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const uploadMedia = async (imageUri: string) => {
    setLoadingUpload(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(imageUri);
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
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const storageRef = firebase.storage().ref();
      const ref = storageRef.child('mobile/idCard' + '/' + filename);
      await ref.put(blob);
      ref
        .getDownloadURL()
        .then(async (url) => {
          // url chứa đường dẫn tới hình ảnh
          console.log('URL của hình ảnh:', url);
          await dispatch(
            collab_updateFrontImage({ identityFrontImg: url })
          ).then(async (res) => {
            if (res?.meta?.requestStatus === 'fulfilled') {
              showToastSuccess('Upload front image successful!');
              await fetchUserInfo();
              navigation.navigate(ROUTES.ACCOUNT_INFORMATION_CREATION);
            } else {
              showToastError('Upload front image failed!');
            }
          });
          // Alert.alert('Photo uploaded!');
          setLoadingUpload(false);
        })

        .catch((error) => {
          // Xử lý lỗi nếu có
          setLoadingUpload(false);
          console.log('Lỗi khi lấy URL hình ảnh:', error);
        });
    } catch (error) {
      setLoadingUpload(false);
      console.log('Lỗi ở: ', error);
    }
    setLoadingUpload(false);
  };

  const savePicture = async () => {
    if (cameraRef) {
      //   const photo = await MediaLibrary.createAssetAsync(
      //     imageUri ? imageUri : ''
      //   );

      try {
        await dispatch(getInformationFromRecognitionFront(imageUri)).then(
          async (res) => {
            console.log(JSON.stringify(res, null, 2));
            if (res?.meta?.requestStatus === 'fulfilled') {
              const resData = res?.payload as ViewIDRecognitionFrontResponse;
              if (
                resData?.data?.[0]?.id === null ||
                resData?.data?.[0]?.id === undefined ||
                resData?.data?.[0]?.address === null ||
                resData?.data?.[0]?.address === undefined
              ) {
                showToastError(
                  'Scanned the wrong side of the CCCD/CMND! Try again!'
                );
                setImageUri(null);
              } else {
                showToastSuccess('Get info from CCCD/CMND Front Image');
                await updateInformationFront(
                  resData?.data?.[0]?.id,
                  resData?.data?.[0]?.address
                ).then(async (res) => {
                  if (res?.meta?.requestStatus === 'rejected') {
                    const resData = res?.payload as ErrorStatus;
                    showToastError(resData?.message);
                    setImageUri(null);
                  } else {
                    await uploadMedia(imageUri ?? '');
                    setImageUri(null);
                  }
                });
              }
            } else {
              showToastError('Get information failed! Please scan again!');
              setImageUri(null);
            }
          }
        );
        // Xử lý dữ liệu trả về ở đây
      } catch (error) {
        setImageUri(null);
        console.log(error);
      }
    }
    setImageUri(null);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loadingScan || loadingUpdate || loadingUpload} />
      {!imageUri ? (
        <Camera
          style={styles.camera}
          ratio="16:9"
          type={type}
          // flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <SwapCameraButton onPress={swapCamera} />

            <TakePictureButton onPress={takePicture} />

            <SwapCameraButton onPress={swapCamera} />
          </View>
          <View
            style={{
              position: 'absolute',
              height: ScreenHeight * 0.3,
              width: ScreenWidth - 40,
              top: (ScreenHeight - ScreenHeight * 0.3) / 2,
              borderWidth: 4,
              borderColor: COLORS?.grey_underline,
              borderRadius: 20,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
          />
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: imageUri ? imageUri : imageNotFoundUri }}
            style={{ flex: 1, width: ScreenWidth }}
            resizeMode="cover"
          />
          <View
            style={[
              styles.buttonContainer,
              { marginTop: 10, marginBottom: 20 },
            ]}
          >
            <TakeAgainButton onPress={() => setImageUri(null)} />
            <UsePictureButton onPress={savePicture} />
          </View>
        </View>
      )}
    </View>
  );
};
export default ScanIDRecognitionFront;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
