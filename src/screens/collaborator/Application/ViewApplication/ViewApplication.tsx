import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ROUTES } from '../../../../constants/Routes';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import useViewApplication from './useViewApplication';
import { DataApplication } from '../../../../models/collaborator/application.model';
import { SHADOWS } from '../../../../constants/Shadows';
import { ScreenHeight, ScreenWidth } from '../../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import { imageFPTUri, imageUndefinedUserUri } from '../../../../utils/images';
import { AntDesign } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';
import ClearTextButton from '../../../../components/shared/Button/ClearTextButton';
import SendProblemButton from '../../../../components/shared/Button/SendProblemButton';
import { format_ISODateString_To_Full } from '../../../../utils/formats';
import ConfirmAlert from '../../../../components/shared/AwesomeAlert/ConfirmAlert';
import Toast from 'react-native-toast-notifications';
import TrainingStatus from '../../Training/TrainingRegistration/TrainingStatus';
import ApplicationStatus from './ApplicationStatus';
import APPLICATION_STATUS_ENUM from '../../../../enums/collaborator/ApplicationStatus';

const ViewApplication = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, props, setState, state, stateRedux } = useViewApplication();

  const renderItem = ({ item }: { item: DataApplication }) => {
    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 10,
          marginHorizontal: 10,
          backgroundColor: '#FFF',
          borderRadius: 20,
          ...SHADOWS.SHADOW_03,
        }}
      >
        <View style={{ marginVertical: 15 }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    fontSize: 16,
                  }}
                >
                  Application ID: {''}
                  <Text>{item?.id ? item?.id : 'No value'}</Text>
                </Text>
              </View>
              <ApplicationStatus style={{flex: 0}} status={item?.status ? item?.status : 0 } />
            </View>
          </View>

          <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
            <View
              style={{
                backgroundColor: '#99F2D1',
                width: ScreenWidth * 0.7,
                // paddingVertical: 12,
                padding: 8,
                alignItems: 'flex-end',
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular, fontSize: 15 }}>
                    {item?.account?.name ? item?.account?.name : 'No name'}
                  </Text>

                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                    }}
                  >
                    {item?.account?.email ? item?.account?.email : 'No name'}
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Image
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                    source={{
                      uri: item?.account?.imgUrl
                        ? item?.account?.imgUrl
                        : imageUndefinedUserUri,
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{ margin: 15 }}>
            <View style={{ marginBottom: 5 }}>
              <Text
                style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic }}
              >
                {item?.reportDate
                  ? format_ISODateString_To_Full(item?.reportDate)
                    ? format_ISODateString_To_Full(item?.reportDate)
                    : 'No report date'
                  : 'No report date'}
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                borderRadius: 15,
                borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: '#99F2D1',
              }}
            >
              <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                {item?.problemNote ? item?.problemNote : 'No problem'}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: '#EEA35D',
                width: ScreenWidth * 0.7,
                padding: 8,
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Image
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                    source={{
                      uri: imageFPTUri ? imageFPTUri : imageFPTUri,
                    }}
                  />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                      letterSpacing: 1,
                      fontSize: 18,
                    }}
                  >
                    Admission Officer
                  </Text>

                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                      fontSize: 15,
                    }}
                  >
                    tuyensinhfpthcm
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ margin: 15 }}>
            <View style={{ marginBottom: 5, alignItems: 'flex-end' }}>
              <Text
                style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic }}
              >
                {item?.replyDate
                  ? format_ISODateString_To_Full(item?.replyDate)
                    ? format_ISODateString_To_Full(item?.replyDate)
                    : 'No reply date'
                  : 'No reply date'}
              </Text>
            </View>
            <View
              style={{
                padding: 15,
                borderRadius: 15,
                borderWidth: 3,
                borderStyle: 'dashed',
                borderColor: '#EEA35D',
              }}
            >
              {item?.replyNote ? (
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                  {item?.replyNote}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                    textAlign: 'center',
                  }}
                >
                  No reply
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="View Application"
          onPress={() => navigation.navigate(ROUTES.ACCOUNT)}
        />
      </Header>
      <View style={{ flex: 1, marginTop: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        >
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity onPress={handlers.showModal}>
            <AntDesign name="form" size={32} color="black" />
          </TouchableOpacity>
          <ReactNativeModal
            isVisible={state.isVisible}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onBackdropPress={handlers.hideModal}
            avoidKeyboard={true}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
          >
            <View
              style={{
                backgroundColor: 'white',
                height: ScreenHeight * 0.35,
                width: ScreenWidth - 20,
                borderRadius: 20,
                ...SHADOWS.SHADOW_09,
              }}
            >
              <View style={{ flex: 1, margin: 15 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    marginBottom: 5,
                  }}
                >
                  Write your answer below
                </Text>
                <TextInput
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    flex: 1,
                    borderWidth: 2,
                    borderRadius: 10,
                    borderStyle: 'dashed',
                    padding: 10,
                  }}
                  placeholder="Enter some text ..."
                  multiline={true}
                  clearButtonMode="always"
                  value={state.problemNote}
                  onChangeText={(value) => setState.setProblemNote(value)}
                  // textAlignVertical="top"
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 15,
                  }}
                >
                  <SendProblemButton
                    onPress={() =>
                      handlers.showAlertHandler(
                        props.TYPE_BUTTON_ENUM.SEND_APPLICATION
                      )
                    }
                  />
                  <ClearTextButton
                    onPress={() => setState.setProblemNote('')}
                  />
                  <ConfirmAlert
                    show={state.showAlert}
                    title={state.confirmInfo?.title}
                    titleType={state.confirmInfo?.titleType}
                    message={state.confirmInfo?.message}
                    confirmText="Yes"
                    cancelText="No"
                    confirmButtonColor={COLORS.orange_button}
                    onConfirmPressed={() => {
                      switch (state.confirmInfo?.typeButton) {
                        case props.TYPE_BUTTON_ENUM.SEND_APPLICATION:
                          handlers.createOneApplication();
                          break;

                        default:
                          console.log('Type Button Null');
                      }
                      handlers.hideAlertHandler();
                    }}
                    onCancelPressed={handlers.hideAlertHandler}
                  />
                </View>
              </View>
            </View>
            <Toast ref={props.toastRef} />
          </ReactNativeModal>
        </View>
        <FlatList
          data={stateRedux?.applicationList?.data}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
        />
      </View>
    </View>
  );
};

export default ViewApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
