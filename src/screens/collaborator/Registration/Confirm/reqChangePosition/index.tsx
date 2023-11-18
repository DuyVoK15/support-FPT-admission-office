import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
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

interface RequestChangePositionProps {}
const RequestChangePosition: FC<RequestChangePositionProps> = (Props) => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { item } = route?.params as { item: DataPosition[] };

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const [isSelectedBusOption, setIsSelectedBusOption] = useState(
    Array(item?.length).fill(false)
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
        <ScrollView>
          <View style={styles.positionContent}>
            <Text style={styles.textPosition} numberOfLines={1}>
              Positions
            </Text>
            {item ? (
              item?.map((position, index) => {
                const INDEX = index + 1;
                return (
                  <View key={INDEX} style={styles.containerEveryPosition}>
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
                                      fontFamily:
                                        FONTS_FAMILY.Ubuntu_400Regular,
                                      fontSize: 14,
                                    }}
                                  >
                                    {position?.registerAmount ||
                                    position?.amount
                                      ? position?.registerAmount +
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
                            <Text style={styles.paragraph}>* Bus Service?</Text>
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
                              titleButton="CHANGE THIS"
                            />
                            <ConfirmAlert
                              show={showAlert}
                              title="CONFIRM"
                              message="Are you sure Are you sure you want to apply for this position?"
                              confirmText="Yes"
                              cancelText="No"
                              confirmButtonColor={COLORS.orange_button}
                              onConfirmPressed={() => {}}
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
    </View>
  );
};

export default RequestChangePosition;

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
