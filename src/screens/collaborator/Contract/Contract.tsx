import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
import { formatToDate, numberWithCommas } from '../../../utils/formats';
import { WebView } from 'react-native-webview';
import { ROUTES } from '../../../constants/Routes';
import ContractStatus from './ContractStatus';
import { CONTRACT_STATUS_ENUM } from '../../../enums/collaborator/ContractStatus.';
import { Button } from 'react-native-paper';
import ConfirmAlert from '../../../components/shared/AwesomeAlert/ConfirmAlert';
import RenderHTML from 'react-native-render-html';

const Contract = () => {
  const { handlers, state, props, stateRedux } = useIndex();
  const { width } = useWindowDimensions();
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
                  item?.submittedFile
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
                    ? formatToDate({ dateProp: item?.contract?.startDate })
                    : 'No date'
                  : 'No date'}
              </Text>
            </Text>
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium_Italic }}>
              End:{' '}
              <Text
                style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic }}
              >
                {item?.contract?.endDate
                  ? formatToDate({ dateProp: item?.contract?.endDate })
                    ? formatToDate({ dateProp: item?.contract?.endDate })
                    : 'No date'
                  : 'No date'}
              </Text>
            </Text>
          </View>

          <View style={{ marginTop: 10, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                fontSize: 18,
              }}
            >
              Status: {''}
              <ContractStatus status={item?.status ? item?.status : 0} />
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                Description
              </Text>
            </View>
            <View
              style={{
                borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: COLORS?.orange_button,
                borderRadius: 10,
              }}
            >
              <View style={{ margin: 15 }}>
                  {item?.contract?.contractDescription ? (
                    <RenderHTML
                      source={{ html: item?.contract?.contractDescription }}
                      contentWidth={width}
                    />
                  ) : (
                    'No data'
                  )}
              </View>
            </View>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 15 }}>
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
              Salary: {''}
              <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                {item?.contract?.totalSalary
                  ? numberWithCommas(item?.contract?.totalSalary) + ' VNĐ'
                  : 'Not yet'}
              </Text>
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 15 }}>
            <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
              Signed Date: {''}
              <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                {item?.contract?.signingDate
                  ? formatToDate({ dateProp: item?.contract?.signingDate })
                    ? formatToDate({ dateProp: item?.contract?.signingDate })
                    : 'Not signed yet'
                  : 'Not signed yet'}
              </Text>
            </Text>
          </View>
          {item?.status === CONTRACT_STATUS_ENUM.PENDING && (
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                onPress={() =>
                  handlers.showAlertHandler(
                    props.TYPE_BUTTON_ENUM.APPROVE,
                    item
                  )
                }
                style={{ borderRadius: 10, backgroundColor: 'green' }}
                contentStyle={{}}
                mode="contained"
              >
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                  Approve
                </Text>
              </Button>
              <Button
                onPress={() =>
                  handlers.showAlertHandler(props.TYPE_BUTTON_ENUM.REJECT, item)
                }
                style={{ borderRadius: 10, backgroundColor: 'red' }}
                mode="contained"
              >
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                  Reject
                </Text>
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="Contract"
          onPress={() => props.navigation.navigate(ROUTES.ACCOUNT)}
        />
      </Header>

      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          data={stateRedux?.contractList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <ConfirmAlert
          show={state.showAlert}
          title="CONFIRMATION"
          message={state.confirmInfo?.message}
          confirmText="Yes"
          cancelText="No"
          confirmButtonColor={COLORS.orange_button}
          onConfirmPressed={handlers.handleConfirm}
          onCancelPressed={handlers.hideAlertHandler}
        />
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
