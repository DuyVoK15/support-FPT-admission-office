import {
  Alert,
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
import { Data } from '../../../models/collaborator/dataPost.model';
import CreatePostRegistrationDto from '../../../dtos/collaborator/payload/createPostRegistration.dto';
import CreatePostRegistrationResponse from '../../../dtos/collaborator/response/createPostRegistration.dto';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import ConfirmAlert from '../../../components/shared/AwesomeAlert/ConfirmAlert';
import { useToast } from 'react-native-toast-notifications';
import {format_Time_To_HHss, format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../utils/formats';

const PositionRegistration = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: Data };
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const [isSelectedBusOption, setIsSelectedBusOption] = useState(
    Array(20).fill(false)
  );
  const [openPositionNumber, setOpenPositionNumber] = useState(
    Array(20).fill(false)
  );
  const [errorMessage, setErrorMessage] = useState<string[]>(
    Array(20).fill('')
  );

  const togglePositionNumber = (index: number) => {
    const updatedStatus = [...openPositionNumber];
    updatedStatus[index] = !updatedStatus[index];
    setOpenPositionNumber(updatedStatus);
  };

  const selectedBusOption = (index: number) => {
    const updatedStatus = [...isSelectedBusOption];
    updatedStatus[index] = !updatedStatus[index];
    console.log(updatedStatus);
    setIsSelectedBusOption(updatedStatus);
  };

  useEffect(() => {
    console.log(JSON.stringify(item, null, 2));
  }, []);
  const toast = useToast();

  // useEffect(() => {
  //   toast.show("Hello World", {type: 'danger'});
  // }, []);
  const dispatch = useAppDispatch();
  const handleSubmit = async (
    index?: number,
    schoolBusOption?: boolean,
    postId?: number,
    positionId?: number
  ) => {
    try {
      const params = {
        schoolBusOption,
        postId,
        positionId,
      } as CreatePostRegistrationDto;
      await dispatch(createPostRegistration(params)).then((res) => {
        const requestStatus = res?.meta?.requestStatus;

        console.log(JSON.stringify(res, null, 2));

        if (requestStatus === 'rejected') {
          const resRejectedData = res.payload as ErrorStatus;
          if (resRejectedData?.errorCode === 4013) {
            toast.show('This post is done!', { type: 'danger' });
          }
          if (resRejectedData?.errorCode === 4004) {
            toast.show('Can not register the same post!', { type: 'danger' });
          }
          if (resRejectedData?.errorCode === 4012) {
            toast.show('Need certificate to register this position!', {
              type: 'danger',
            });
          }
          if (resRejectedData?.errorCode === 4007) {
            toast.show('Must sent registration 1 day before the event!', {
              type: 'danger',
            });
          }
        }

        if (requestStatus === 'fulfilled') {
          toast.show('Registered successfully!', { type: 'success' });
        }
        console.log('Vị trí số: ', index);
        hideAlertHandler();
      });
    } catch (error) {
      hideAlertHandler();
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Position Registration"
        />
      </Header>

      <ScrollView>
        <View style={styles.positionContent}>
          <Text style={styles.textPosition} numberOfLines={1}>
            Positions
          </Text>
          {item ? (
            item?.postPositions.map((position, index) => (
              <View key={index + 1} style={styles.containerEveryPosition}>
                <View style={styles.everyPosition}>
                  <TouchableOpacity
                    onPress={() => togglePositionNumber(index)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textPositionNum}>
                        Vị trí {index + 1}: {''}
                        <Text style={styles.textPositionNum_2}>
                          {position ? position?.positionName : 'No value'}
                        </Text>
                      </Text>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}
                    >
                      {openPositionNumber[index] === true ? (
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
                  {openPositionNumber[index] && (
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
                                {item?.dateFrom
                                  ? format_ISODateString_To_DayOfWeekMonthDDYYYY(item?.dateFrom)
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
                                {position?.registerAmount || position?.amount ? position?.registerAmount + " / " + position?.amount +  " collaborators" :""}
                              </Text>
                            </View>
                          </View>
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
                        <Text style={styles.paragraph}>* Bus Service?</Text>
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
                      <View>
                        <SubmitButton
                          onPress={showAlertHandler}
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
                          title="CONFIRM"
                          message="Are you sure Are you sure you want to apply for this position?"
                          confirmText="Yes"
                          cancelText="No"
                          confirmButtonColor={COLORS.orange_button}
                          onConfirmPressed={() =>
                            handleSubmit(
                              index + 1,
                              isSelectedBusOption[index],
                              position.postId,
                              position.id
                            )
                          }
                          onCancelPressed={hideAlertHandler}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))
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
    fontSize: 20,
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
    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
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
    marginBottom: 15,
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
