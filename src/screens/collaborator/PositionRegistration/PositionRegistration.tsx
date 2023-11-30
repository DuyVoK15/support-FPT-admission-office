import {
  Alert,
  Button,
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
import ConfirmAlert from '../../../components/shared/AwesomeAlert/ConfirmAlert';
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

const PositionRegistration = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: DataPost };

  enum TYPE_BUTTON_ENUM {
    REGISTER = 1,
    NAVIGATE_TO_CERTIFICATE = 2,
    NAVIGATE_TO_REGISTRATION = 3,
  }

  type ConfirmInfo = {
    title: string | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);

  const showAlertHandler = (
    action?: number | null,
    item?: DataPost | null,
    position?: DataPosition | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.REGISTER:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: `Are you sure you want to apply for "${position?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.REGISTER,
        });
        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: 'You need Certificate for this position?',
          typeButton: TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE,
        });
        break;
      case TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: 'You need Certificate for this position?',
          typeButton: TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION,
        });
        break;
      default:
        setConfirmInfo({
          title: '',
          message: '',
          typeButton: 0,
        });
    }
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const [isSelectedBusOption, setIsSelectedBusOption] = useState(
    Array(item?.postPositions.length).fill(false)
  );

  const selectedBusOption = (index: number) => {
    const updatedStatus = [...isSelectedBusOption];
    updatedStatus[index] = !updatedStatus[index];
    console.log(updatedStatus);
    setIsSelectedBusOption(updatedStatus);
  };

  const { showToastError, showToastSuccess } = useCustomToast();

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (
    position?: DataPosition | null,
    schoolBusOption?: boolean
  ) => {
    try {
      const params = {
        schoolBusOption,
        positionId: position?.id,
      } as CreatePostRegistrationParam;
      await dispatch(createPostRegistration(params))
        .then((res) => {
          const requestStatus = res?.meta?.requestStatus;
          console.log(JSON.stringify(res, null, 2));
          if (requestStatus === 'fulfilled') {
            showToastSuccess('Register successfully!');
            showAlertHandler(
              TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION,
              null,
              position
            );
          } else {
            const resRejectedData = res.payload as ErrorStatus;
            switch (resRejectedData?.statusCode) {
              case 400:
                switch (resRejectedData?.errorCode) {
                  case 4001:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4002:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4003:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4004:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4005:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4006:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4007:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4008:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4009:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4010:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4011:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4012:
                    showAlertHandler(
                      TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE,
                      null,
                      null
                    );
                    break;
                  case 4013:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4014:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4015:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4016:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4016:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4016:
                    showToastError(resRejectedData?.message);
                    break;
                  case 4024:
                    showToastError(
                      'You have applied for a position that overlaps with this position'
                    );
                    break;
                  default:
                    showToastError('Undefined error!');
                }
                break;
              case 401:
                showToastError('You are NOT PERMISSION!');
                break;
              case 404:
                showToastError(resRejectedData?.message);
                // showToastError('404 NOT FOUND');
                break;
              default:
                showToastError('Undefined error!');
            }
          }
        })
        .catch((error) => {
          hideAlertHandler();
          console.log(error);
        });
    } catch (error) {
      hideAlertHandler();
      console.log(error);
    }
  };

  const [positionId, setPosisitionId] = useState<number | null>(null);
  const handleSetPositionId = (id: number | null) => {
    if (positionId !== id) {
      setPosisitionId(id);
    } else {
      setPosisitionId(null);
    }
  };
  return (
    <View style={styles.container}>
      <ConfirmAlertModal
        isVisible={showModal}
        title={'SUCCESS'}
        message={
          "You've registered successful! Do you want to navigate to Registration Management?"
        }
        showFirstButton={true}
        firstButtonLabel={'Cancel'}
        onPressFirstButton={() => setShowModal(false)}
        showSecondButton={true}
        secondButtonLabel={"Let's go"}
        onPressSecondButton={() => {
          setShowModal(false);
          navigation.navigate('REGISTRATION_STACK_NAVIGATOR');
        }}
        onBackdropPress={() => setShowModal(false)}
      />

      <Header>
        <Backward
          onPress={() => navigation.goBack()}
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
      <ScrollView>
        <View style={styles.positionContent}>
          <Text style={styles.textPosition} numberOfLines={1}>
            Positions
          </Text>
          {item?.postPositions && item?.postPositions?.length > 0 ? (
            item?.postPositions.map((position, index) => {
              return (
                <View key={index} style={styles.containerEveryPosition}>
                  <View style={styles.everyPosition}>
                    <TouchableOpacity
                      onPress={() => handleSetPositionId(position?.id)}
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
                        {positionId === position?.id ? (
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
                    {positionId === position?.id && (
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
                                  Attendee Number
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
                                      ' collaborators'
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
                            value={isSelectedBusOption[index]}
                            onValueChange={(value) => selectedBusOption(index)}
                            color={'#fcc995'}
                            thumbColor={
                              isSelectedBusOption[index]
                                ? COLORS.orange_button
                                : '#fff'
                            }
                            // style={{marginLeft: 10}}
                          />
                        </View>
                        <View style={{ marginTop: 15 }}>
                          <SubmitButton
                            onPress={() =>
                              showAlertHandler(
                                TYPE_BUTTON_ENUM.REGISTER,
                                item,
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
                            show={showAlert}
                            title="CONFIRMATION"
                            message={confirmInfo?.message}
                            confirmText="Yes"
                            cancelText="No"
                            confirmButtonColor={COLORS.orange_button}
                            onConfirmPressed={() => {
                              switch (confirmInfo?.typeButton) {
                                case TYPE_BUTTON_ENUM.REGISTER:
                                  handleSubmit(
                                    position,
                                    isSelectedBusOption[index]
                                  );
                                  break;
                                case TYPE_BUTTON_ENUM.NAVIGATE_TO_CERTIFICATE:
                                  navigation.dispatch(
                                    CommonActions.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: ROUTES.ACCOUNT_STACK_NAVIGATOR,
                                          state: {
                                            routes: [{ name: ROUTES.ACCOUNT }, { name: ROUTES.CERTIFICATE_HISTORY }],
                                          },
                                        },
                                      ],
                                    })
                                  );
                                  break;
                                case TYPE_BUTTON_ENUM.NAVIGATE_TO_REGISTRATION:
                                  navigation.navigate(
                                    ROUTES.REGISTRATION_STACK_NAVIGATOR
                                  );
                                  break;
                                default:
                                  console.log('Type Button Null');
                              }
                              hideAlertHandler();
                            }}
                            onCancelPressed={hideAlertHandler}
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
    marginTop: 10,
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
