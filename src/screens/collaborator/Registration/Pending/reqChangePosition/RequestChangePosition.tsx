import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../../type';
import { FONTS_FAMILY } from '../../../../../constants/Fonts';
import { COLORS } from '../../../../../constants/Colors';
import { SHADOWS } from '../../../../../constants/Shadows';
import Header from '../../../../../components/shared/Header/Back';
import Backward from '../../../../../components/shared/Direction/Backward/Backward';
import { ScrollView } from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import {
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  format_Time_To_HHss,
} from '../../../../../utils/formats';
import { ScreenWidth } from '../../../../../constants/Demesions';
import { Switch } from 'react-native-paper';
import SubmitButton from '../../../../../components/shared/Button/SubmitButton';
import ConfirmAlert from '../../../../../components/shared/AwesomeAlert/ConfirmAlert';
import { DataPosition } from '../../../../../models/collaborator/dataPosition.model';
import useCustomToast from '../../../../../utils/toasts';
import { useAppDispatch } from '../../../../../app/store';
import {
  getAllPostRegistration_Pending,
  getPostRegistrationById_Pending,
  updatePostRegistration,
} from '../../../../../features/collaborator/collab.postRegistrationSlice';
import ErrorStatus from '../../../../../dtos/collaborator/response/errorStatus.dto';
import DataViewPostRegistration from '../../../../../models/collaborator/postRegistration.model';
import { RegistrationStatus } from '../../../../../enums/collaborator/RegistrationStatus';
import { async } from '@firebase/util';
import { useAppSelector } from '../../../../../app/hooks';

const RequestChangePositionPending = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { id } = route?.params as { id: number };
  console.log(JSON.stringify(id, null, 2));

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const list = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationPendingById
  );
  const fetchPostRegistrationById = async () => {
    try {
      await dispatch(
        getPostRegistrationById_Pending({
          RegistrationStatus: [RegistrationStatus.PENDING],
          Id: id,
        })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostRegistrationById();
  }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistrationById().catch(() => {
      setRefreshing(false);
    });
    setRefreshing(false);
  }, []);

  const [isSelectedBusOption, setIsSelectedBusOption] = useState(
    Array(list?.data?.[0]?.postPositionsUnregistereds?.length || 100).fill(
      false
    )
  );

  const selectedBusOption = (index: number) => {
    const updatedStatus = [...isSelectedBusOption];
    updatedStatus[index] = !updatedStatus[index];
    console.log(updatedStatus);
    setIsSelectedBusOption(updatedStatus);
  };

  const [positionId, setPosisitionId] = useState<number | null>(null);
  const handleSetPositionId = (id: number | null) => {
    if (positionId !== id) {
      setPosisitionId(id);
    } else {
      setPosisitionId(null);
    }
  };

  const dispatch = useAppDispatch();
  const handleChangePosition = async (
    id: number | null,
    positionId: number | null,
    schoolBusOption: boolean | null,
    note: string | null
  ) => {
    hideAlertHandler();
    await dispatch(
      updatePostRegistration({ id, positionId, schoolBusOption, note })
    ).then(async (res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === 'fulfilled') {
        await dispatch(
          getAllPostRegistration_Pending({
            RegistrationStatus: [RegistrationStatus.PENDING],
          })
        );
        navigation.goBack();
        showToastSuccess('Update thành công');
        console.log(JSON.stringify(res, null, 2));
      } else {
        const resRejectedData = res?.payload as ErrorStatus;
        showToastError(resRejectedData?.message);
      }
    });
  };

  const { showToastError, showToastSuccess } = useCustomToast();

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Change Position"
        />
      </Header>
      <View style={{}}>
        <View
          style={{ alignItems: 'center', marginTop: 10, marginHorizontal: 20 }}
        >
          <Text
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
              fontSize: 26,
              textAlign: 'center',
              color: '#000',
            }}
          >
            Choose your position you want to change
          </Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.positionContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.textPosition,
                  {
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    color: COLORS?.orange_icon,
                  },
                ]}
                numberOfLines={2}
              >
                {list?.data?.[0]?.postPosition ? 'Current position: ' : ''}
              </Text>
              <Text
                style={[
                  styles.textPosition,
                  { fontFamily: FONTS_FAMILY?.Ubuntu_700Bold },
                ]}
                numberOfLines={2}
              >
                {list?.data?.[0]?.postPosition
                  ? list?.data?.[0]?.postPosition?.positionName
                  : ''}
              </Text>
            </View>

            {list?.data?.[0]?.postPositionsUnregistereds ? (
              list?.data?.[0]?.postPositionsUnregistereds?.map(
                (position, index) => {
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
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_500Medium,
                                        fontSize: 16,
                                      }}
                                    >
                                      {position?.date
                                        ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                                            position?.date
                                          )
                                          ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                                              position?.date
                                            )
                                          : 'No date'
                                        : 'No date'}
                                    </Text>
                                  </View>
                                  <View style={{ marginBottom: 4 }}>
                                    <Text
                                      style={{
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_400Regular,
                                        fontSize: 14,
                                      }}
                                    >
                                      {position?.timeFrom && position?.timeTo
                                        ? format_Time_To_HHss(
                                            position?.timeFrom
                                          ) +
                                          ' - ' +
                                          format_Time_To_HHss(
                                            position?.timeTo
                                          ) +
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
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_500Medium,
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
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_400Regular,
                                        fontSize: 14,
                                      }}
                                    >
                                      {position?.location
                                        ? position?.location
                                        : ''}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              {/* COLUMN 3 */}
                              <View
                                style={[styles.column, { marginBottom: 0 }]}
                              >
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
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_500Medium,
                                        fontSize: 16,
                                      }}
                                    >
                                      Attendee Number
                                    </Text>
                                  </View>
                                  <View style={{ marginBottom: 4 }}>
                                    <Text
                                      style={{
                                        fontFamily:
                                          FONTS_FAMILY.Ubuntu_400Regular,
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
                                * Bus Service?
                              </Text>
                              <Switch
                                disabled={position?.isBusService ? false : true}
                                value={isSelectedBusOption[index]}
                                onValueChange={(value) =>
                                  selectedBusOption(index)
                                }
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
                                titleButton="CHANGE NOW"
                              />
                              <ConfirmAlert
                                show={showAlert}
                                title="CONFIRM"
                                message="Are you sure Are you sure you want to apply for this position?"
                                confirmText="Yes"
                                cancelText="No"
                                confirmButtonColor={COLORS.orange_button}
                                onConfirmPressed={() =>
                                  handleChangePosition(
                                    list?.data?.[0].id,
                                    position?.id,
                                    isSelectedBusOption[index],
                                    ''
                                  )
                                }
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
                }
              )
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
    </View>
  );
};

export default RequestChangePositionPending;

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
    fontSize: 18,
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
