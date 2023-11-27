import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import useIndex from './useContract';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import useCustomToast from '../../../utils/toasts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import DashedLine from 'react-native-dashed-line';

const Contract = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props } = useIndex();
  const { showToastSuccess, showToastError } = useCustomToast();

  const [downloadProgress, setDownloadProgress] = useState<number>();
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadResumable = FileSystem.createDownloadResumable(
    'https://firebasestorage.googleapis.com/v0/b/supfamof-c8c84.appspot.com/o/images%2Fadmission%2Fevent148ef32d-deea-4626-b872-cf3a8ac81e7d?alt=media&token=29978a67-a006-4b1c-9bd4-e934f7f8c1e1',
    FileSystem.documentDirectory + 'HAHA.doc',
    {},
    callback
  );
  const downloadAndOpenFile = async () => {
    console.log('downloading...');
    try {
      await downloadResumable
        .downloadAsync()
        .then(async (res) => {
          const resData = res?.status;
          if (resData === 200) {
            showToastSuccess('Download file success!');
            await FileViewer.open(res?.uri ?? '', { showOpenWithDialog: true }) // absolute-path-to-my-local-file.
              .then(() => {
                // success
                showToastSuccess('View file success!');
              })
              .catch((error) => {
                // error
                showToastError('View file failed!');
              });
          } else {
            showToastError('Download file failed!');
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="Contract"
          onPress={() => navigation.goBack()}
        />
      </Header>
      <View style={{ marginTop: 15 }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#FFF',
              borderRadius: 10,
              ...SHADOWS?.SHADOW_06,
              marginHorizontal: 15,
              marginVertical: 15,
            }}
          >
            <View style={{ marginVertical: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                      fontSize: 17,
                      color: COLORS?.orange_button,
                    }}
                  >
                    Contract ID:{' '}
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                        fontSize: 18,
                      }}
                    >
                      {2}
                    </Text>
                  </Text>
                </View>
                {/* <View></View> */}
                <TouchableOpacity
                  onPress={downloadAndOpenFile}
                  style={{
                    borderWidth: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    borderRadius: 50,
                    borderColor: COLORS?.orange_button,
                  }}
                >
                  <MaterialCommunityIcons
                    name="file-download"
                    size={24}
                    color={COLORS?.orange_button}
                  />
                </TouchableOpacity>
              </View>

              <DashedLine
                dashGap={2}
                dashLength={6}
                dashThickness={0.8}
                dashColor={COLORS?.orange_button}
                style={{
                  marginVertical: 5,
                  marginHorizontal: ScreenWidth * 0.15,
                }}
              />

              <View style={{ alignItems: 'center', marginTop: 5 }}>
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                      fontSize: 22,
                      textAlign: 'center',
                    }}
                  >
                    Hợp đồng khoán gọn
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'space-around',
                }}
              >
                <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic}}>
                  Start: <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic}}>27/11/2023</Text>
                </Text>
                <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic}}>
                  End: <Text style={{fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic}}>27/12/2023</Text>
                </Text>
              </View>

              <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: '#99F2D1',
                    width: ScreenWidth * 0.65,
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      color: COLORS?.light_black,
                      fontSize: 15,
                    }}
                  >
                    Contract Creator
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}
                >
                  <View>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 100 }}
                      source={{
                        uri: 'https://thethaovanhoa.mediacdn.vn/2015/03/30/15/45/m.jpg',
                      }}
                    />
                  </View>
                  <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      Hieu Nguyen
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light,
                        fontSize: 13,
                      }}
                    >
                      Admission Officer
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                      }}
                    >
                      nguyenminhtrunghieu10@gmail.com
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: '#ABA7F2',
                    width: ScreenWidth * 0.65,
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      color: COLORS?.light_black,
                      fontSize: 15,
                    }}
                  >
                    Contract Endorser
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}
                >
                  <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                    <Text
                      style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}
                    >
                      Huynh Chau Hai Trieu
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light,
                        fontSize: 13,
                      }}
                    >
                      Collaborator
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                      }}
                    >
                      huynhchauhaitrieu@gmail.com
                    </Text>
                  </View>
                  <View>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 100 }}
                      source={{
                        uri: 'https://thethaovanhoa.mediacdn.vn/2015/03/30/15/45/m.jpg',
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Contract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
