import {
  FlatList,
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import { ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import DashedLine from 'react-native-dashed-line';
import { DataContract } from '../../../models/collaborator/contract.model';
import { formatToDate } from '../../../utils/formats';
import { WebView } from 'react-native-webview';

const Contract = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, state, props, stateRedux } = useIndex();

  const renderItem = ({ item }: { item: DataContract }) => {
    return (
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
                  {item?.contractId ? item?.contractId : 'No value'}
                </Text>
              </Text>
            </View>
            {/* <View></View> */}
            <TouchableOpacity
              onPress={() =>
                handlers.downloadAndOpenFile(
                  item?.submittedFile !== ''
                    ? item?.submittedFile
                    : item?.contract?.sampleFile
                )
              }
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
                {item?.contract?.contractName
                  ? item?.contract?.contractName
                  : 'No value'}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-around',
            }}
          >
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic }}>
              Start:{' '}
              <Text
                style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic }}
              >
                {item?.contract?.startDate
                  ? formatToDate({ dateProp: item?.contract?.startDate })
                  : 'No value'}
              </Text>
            </Text>
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic }}>
              End:{' '}
              <Text
                style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic }}
              >
                {item?.contract?.endDate
                  ? formatToDate({ dateProp: item?.contract?.endDate })
                  : 'No value'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="Contract"
          onPress={() => navigation.goBack()}
        />
      </Header>
      <WebView
       style={{ flex: 1, minHeight: 200, height: 300, opacity: 0.99 }}
        source={{
          uri: `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent('https://firebasestorage.googleapis.com/v0/b/supfamof-c8c84.appspot.com/o/images%2Fadmission%2FeventeventH%E1%BB%A3p-%C4%91%E1%BB%93ng-kho%C3%A1n-g%E1%BB%8Dn-Modify%20(8).docx?alt=media&token=a35c84b6-853e-4a7b-ad85-407170c62461')}`,
        }}
        androidHardwareAccelerationDisabled={true}
        startInLoadingState={true}
      
      ></WebView>
      {/* <View style={{ marginTop: 15 }}>
        <FlatList
          data={stateRedux?.contractList?.data}
          renderItem={renderItem}
        />
      </View> */}
    </View>
  );
};

export default Contract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
{
  /* <View style={{ alignItems: 'flex-start', marginTop: 20 }}>
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
                      LE BINH TRUNG
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light,
                        fontSize: 13,
                      }}
                    >
                      Host Admission Officer
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                      }}
                    >
                     trunglb@fe.edu.vn
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
              </View> */
}
