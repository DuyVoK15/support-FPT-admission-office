import {
  Alert,
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { COLORS } from '../../../constants/Colors';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import Checkbox from 'expo-checkbox';
import { Switch } from '@rneui/themed';
import { SHADOWS } from '../../../constants/Shadows';
import DashedLine from 'react-native-dashed-line';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../../../app/store';
import {
  createPostRegistration,
  getAllPostRegistration,
} from '../../../features/collaborator/collab.postRegistrationSlice';
import { getAllPost } from '../../../features/collaborator/collab.postSlice';
import CreatePostRegistrationDto from '../../../dtos/collaborator/parameter/createPostRegistration.dto';
import CreatePostRegistrationResponse from '../../../dtos/collaborator/response/createPostRegistration.dto';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import ConfirmAlert, {
  TITLE_ENUM,
} from '../../../components/shared/AwesomeAlert/ConfirmAlert';
import { useToast } from 'react-native-toast-notifications';
import {
  format_Time_To_HHss,
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
} from '../../../utils/formats';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import CreatePostRegistrationParam from '../../../dtos/collaborator/parameter/createPostRegistration.dto';
import { DataPost } from '../../../models/collaborator/dataPost.model';
import useCustomToast from '../../../utils/toasts';
import ConfirmAlertModal from '../../../components/shared/ConfirmAlert/ConfirmAlert';
import { DataPosition } from '../../../models/collaborator/dataPosition.model';
import { ROUTES } from '../../../constants/Routes';
import { CommonActions } from '@react-navigation/native';
import usePositionRegistration from './usePositionRegistration';
import { ic_certificateUri, imageNotFoundUri } from '../../../utils/images';

const PositionRegistration = () => {
  const { state, setState, stateRedux, handlers, props } =
    usePositionRegistration();
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => props.navigation.goBack()}
          titleBackward="Position Registration"
        />
      </Header>

      <View
        style={{ marginTop: 10, marginHorizontal: 20, alignItems: 'center' }}
      >
        <Text
          style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 26 }}
        >
          Choose your position
        </Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={handlers.onRefresh}
          />
        }
      >
        <View style={styles.positionContent}>
          <Text style={styles.textPosition} numberOfLines={1}>
            Positions
          </Text>
          {stateRedux.item?.data?.postPositions &&
          stateRedux.item?.data?.postPositions?.length > 0 ? (
            stateRedux.item?.data?.postPositions.map((position, index) => {
              return (
                <View key={index} style={styles.containerEveryPosition}>
                  {position?.certificateName && (
                    <View style={{ position: 'absolute', top: -20, left: -15 }}>
                      <Image
                        source={{
                          uri: ic_certificateUri
                            ? ic_certificateUri
                            : imageNotFoundUri,
                        }}
                        style={{ width: 45, height: 45, resizeMode: 'cover' }}
                      />
                    </View>
                  )}

                  <View style={styles.everyPosition}>
                    <TouchableOpacity
                      onPress={() => handlers.handleSetPositionId(position?.id)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.textPositionNum}>
                          Position: {''}
                          <Text style={styles.textPositionNum_2}>
                            {position?.positionName
                              ? position?.positionName
                              : 'No value'}
                          </Text>
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                        }}
                      >
                        {state.positionId === position?.id ? (
                          <Entypo
                            name="chevron-small-up"
                            size={26}
                            color="black"
                          />
                        ) : (
                          <Entypo
                            name="chevron-small-down"
                            size={26}
                            color="black"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    {state.positionId === position?.id && (
                      <View style={{}}>
                        <DashedLine
                          style={{ marginVertical: 10 }}
                          dashGap={0}
                          dashThickness={1}
                          dashLength={10}
                          dashColor={COLORS.super_light_grey}
                        />
                        <View>
                          <View style={styles.column}>
                            <View style={styles.contentRow}>
                              <Ionicons
                                name="md-calendar"
                                size={28}
                                color={COLORS.orange_icon}
                              />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                              <View style={{ marginBottom: 4 }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                                    fontSize: 16,
                                  }}
                                >
                                  {position?.date
                                    ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                                        position?.date
                                      )
                                    : ''}
                                </Text>
                              </View>
                              <View style={{ marginBottom: 4 }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                                    fontSize: 14,
                                  }}
                                >
                                  {position?.timeFrom && position?.timeTo
                                    ? format_Time_To_HHss(position?.timeFrom) +
                                      ' - ' +
                                      format_Time_To_HHss(position?.timeTo) +
                                      ' (GMT +7)'
                                    : ''}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {/* COLUMN 2 */}
                          <View style={styles.column}>
                            <View style={styles.contentRow}>
                              <Ionicons
                                name="location-sharp"
                                size={28}
                                color={COLORS.orange_icon}
                              />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                              <View style={{ marginBottom: 4 }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                                    fontSize: 16,
                                  }}
                                >
                                  {position?.schoolName
                                    ? position?.schoolName
                                    : ''}
                                </Text>
                              </View>
                              <View
                                style={{
                                  marginBottom: 4,
                                  maxWidth: ScreenWidth * 0.6,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                                    fontSize: 14,
                                  }}
                                >
                                  {position?.location ? position?.location : ''}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {/* COLUMN 3 */}
                          <View style={[styles.column, { marginBottom: 0 }]}>
                            <View style={styles.contentRow}>
                              <Ionicons
                                name="md-calendar"
                                size={28}
                                color={COLORS.orange_icon}
                              />
                            </View>
                            <View style={{ marginLeft: 15 }}>
                              <View style={{ marginBottom: 4 }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                                    fontSize: 16,
                                  }}
                                >
                                  Attendee Number {''}
                                  <Text style={{ color: COLORS?.red_status }}>
                                    (
                                    {position?.totalPositionRegisterAmount
                                      ? position?.totalPositionRegisterAmount
                                      : 0}
                                    )
                                  </Text>
                                </Text>
                              </View>
                              <View style={{ marginBottom: 4 }}>
                                <Text
                                  style={{
                                    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
                                    fontSize: 14,
                                  }}
                                >
                                  {position?.positionRegisterAmount ||
                                  position?.amount
                                    ? position?.positionRegisterAmount +
                                      ' / ' +
                                      position?.amount +
                                      ' collaborators have CONFIRMED'
                                    : ''}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={{ marginTop: 15 }}>
                            <Text
                              style={[
                                styles.paragraph,
                                {
                                  fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                                },
                              ]}
                            >
                              Certificate Need?: {''}
                              <Text style={{ color: COLORS?.orange_icon }}>
                                {position?.certificateName
                                  ? position?.certificateName
                                  : 'None'}
                              </Text>
                            </Text>
                          </View>
                        </View>

                        <DashedLine
                          style={{ marginVertical: 10 }}
                          dashGap={0}
                          dashThickness={1}
                          dashLength={10}
                          dashColor={COLORS.super_light_grey}
                        />

                        <View style={styles.section}>
                          <Text style={styles.paragraph}>
                            * Use Bus Service?
                          </Text>
                          <Switch
                            disabled={position?.isBusService ? false : true}
                            value={state.isSelectedBusOption[index]}
                            onValueChange={(value) =>
                              setState.selectedBusOption(index)
                            }
                            color={'#fcc995'}
                            thumbColor={
                              state.isSelectedBusOption[index]
                                ? COLORS.orange_button
                                : '#fff'
                            }
                            // style={{marginLeft: 10}}
                          />
                        </View>
                        <View style={{ marginTop: 15 }}>
                          <SubmitButton
                            onPress={() =>
                              handlers.showAlertHandler(
                                props.TYPE_BUTTON_ENUM.REGISTER,
                                position
                              )
                            }
                            style={{
                              marginHorizontal: 40,
                              height: 40,
                              borderRadius: 10,
                            }}
                            textStyle={{ fontSize: 16 }}
                            titleButton="REGISTER NOW"
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
                                case props.TYPE_BUTTON_ENUM.REGISTER:
                                  handlers.handleSubmit(
                                    state.Item,
                                    state.isSelectedBusOption[index]
                                  );
                                  break;
                                case props.TYPE_BUTTON_ENUM
                                  .NAVIGATE_TO_CERTIFICATE:
                                  props.navigation.dispatch(
                                    CommonActions.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: ROUTES.TRAINING_STACK_NAVIGATOR,
                                          state: {
                                            routes: [
                                              { name: ROUTES.TRAINING },
                                              // {
                                              //   name: ROUTES.CERTIFICATE_HISTORY,
                                              // },
                                            ],
                                          },
                                        },
                                      ],
                                    })
                                  );
                                  break;
                                case props.TYPE_BUTTON_ENUM
                                  .NAVIGATE_TO_REGISTRATION:
                                  props.navigation.navigate(
                                    ROUTES.REGISTRATION_STACK_NAVIGATOR,
                                    {
                                      screen: ROUTES.REGISTRATION,
                                      params: {
                                        screen: ROUTES.REGISTRATION_PENDING,
                                      },
                                    }
                                  );
                                  break;
                                default:
                                  console.log('Type Button Null');
                              }
                              handlers.hideAlertHandler();
                            }}
                            onCancelPressed={handlers.hideAlertHandler}
                          />
                        </View>
                        {/* <Button
                        title={'dialog box'}
                        onPress={() =>
                          Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: 'Danger',
                            textBody: 'Congrats! this is dialog box success',
                            button: 'Close',
                            // autoClose: 100,
                          })
                        }
                      /> */}
                      </View>
                    )}
                  </View>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </View>

        {/* <View style={styles.positionBox}>
              <View style={styles.positionContent}>
                <Text style={styles.textPosition} numberOfLines={1}>
                  Note
                </Text>
                <View style={styles.containerTextArea}>
                  <TextInput
                    onChangeText={(value) => setTextNote(value)}
                    value={textNote}
                    numberOfLines={6}
                    multiline={true}
                    style={styles.textArea}
                    placeholder="Please enter note..."
                    clearButtonMode="always"
                  />
                </View>

                <TouchableOpacity onPress={() => setTextNote('')}>
                  <Text style={styles.textClear}>Clear all text</Text>
                </TouchableOpacity>
              </View>
            </View> */}

        {/* <View style={styles.containerSubmitButton}>
              <SubmitButton titleButton="SUBMIT" />
            </View> */}
      </ScrollView>
    </View>
  );
};

export default PositionRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerScroll: {
    marginBottom: 20,
  },
  containerPosition: {
    marginHorizontal: 15,
  },
  positionBox: {
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    ...SHADOWS.SHADOW_03,
  },
  positionContent: {
    margin: 20,
  },
  textPosition: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 22,
    overflow: 'scroll',
  },
  containerEveryPosition: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...SHADOWS.SHADOW_03,
  },
  everyPosition: {
    margin: 15,
  },
  textPositionNum: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 15,
  },
  textPositionNum_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 15,
  },
  textOnPressDetail: {
    fontFamily: FONTS_FAMILY.Ubuntu_300Light_Italic,
    fontSize: 15,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  contentRow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.super_light_orange,
    borderRadius: 8,
    width: 45,
    height: 45,
  },
  textClear: {
    fontFamily: FONTS_FAMILY.Ubuntu_300Light_Italic,
    fontSize: 14,
    marginLeft: 15,
  },
  containerTextArea: {
    marginTop: 10,
    marginBottom: 15,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.orange_icon,
  },
  textArea: {
    margin: 15,
  },
  containerSubmitButton: {
    marginTop: 30,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    flex: 1,
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 16,
  },
  checkbox: {
    margin: 8,
    borderColor: COLORS.green_filter_button,
  },
});
