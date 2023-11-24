import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
const AccountInfoCreation = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [image, setImage] = useState<string | null>(null);

  const [type, setType] = useState<CameraType>(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode);
  const cameraRef = useRef<Camera | null>(null);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      setImage(photo?.uri ?? null);
      console.log(photo);
    }
  };

  const savePicture = async () => {
    if (cameraRef) {
      const photo = await MediaLibrary.createAssetAsync(image ? image : "");
      setImage(null);
      console.log(photo);
    }
  };  

  const uploadImage = (imageUri: string | null) => {};
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take a picture</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: image ? image : '' }}
            style={{ width: ScreenWidth / 2, height: ScreenHeight / 2 }}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.button} onPress={() => setImage(null)}>
            <Text style={styles.text}>Take a picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={savePicture}>
            <Text style={styles.text}>savePicture</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default AccountInfoCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: "red"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
