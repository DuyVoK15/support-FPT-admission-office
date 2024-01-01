import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { imageFPTUri, imageUndefinedUserUri } from '../../../../utils/images';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '../../../../app/store';
import { getAllNotificationByToken } from '../../../../features/collaborator/collab.notificationSlice';
import { useAppSelector } from '../../../../app/hooks';
import { DataNotification } from '../../../../models/collaborator/notification.model';
import { formatDateTimeForNotification } from '../../../../utils/formats';
import { TouchableOpacity } from 'react-native';
import { ROUTES } from '../../../../constants/Routes';
import { NOTIFICATION_TYPE_ENUM } from '../../../../enums/collaborator/NotificationType';
import { SHADOWS } from '../../../../constants/Shadows';

const EventNotification = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const data: number[] | [] = [1, 2, 3];

  const notificationByTokenList = useAppSelector(
    (state) => state.collab_notification.notificationByToken
  );

  const dispatch = useAppDispatch();
  const fetchNotification = async () => {
    try {
      await dispatch(getAllNotificationByToken({})).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const handleNavigate = (type: NOTIFICATION_TYPE_ENUM) => {
    switch (type) {
      case NOTIFICATION_TYPE_ENUM.UPCOMING_EVENT:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.EVENT_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.EVENT,
                      params: { screen: ROUTES.EVENT_UPCOMMING },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.REGISTRATION_BE_CONFIRMED:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.REGISTRATION_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.REGISTRATION,
                      params: { screen: ROUTES.REGISTRATION_CONFIRM },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.NEW_CONTRACT:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.ACCOUNT_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.ACCOUNT,
                    },
                    {
                      name: ROUTES.CONTRACT,
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.CHECKOUT_COMPLETED:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.REGISTRATION_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.REGISTRATION,
                      params: { screen: ROUTES.REGISTRATION_COMPLETED },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.POST_REOPENED:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.EVENT_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.EVENT,
                      params: { screen: ROUTES.EVENT_REOPEN },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.APPLICATION:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.ACCOUNT_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.ACCOUNT,
                    },
                    {
                      name: ROUTES.APPLICATION,
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.INTERVIEW_DAY:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.TRAINING_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.TRAINING,
                    },
                    {
                      name: ROUTES.TRAINING_REGISTRATION,
                      params: { screen: ROUTES.TRAINING_REGISTRATION_ASSIGNED },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.INTERVIEW_RESULT:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.TRAINING_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.TRAINING,
                    },
                    {
                      name: ROUTES.TRAINING_REGISTRATION,
                      params: { screen: ROUTES.TRAINING_REGISTRATION_PASSED },
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      case NOTIFICATION_TYPE_ENUM.CHECKOUT_CONFIRMED:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ROUTES.ACCOUNT_STACK_NAVIGATOR,
                state: {
                  routes: [
                    {
                      name: ROUTES.ACCOUNT,
                    },
                    {
                      name: ROUTES.INCOME,
                    },
                  ],
                },
              },
            ],
          })
        );
        break;
      default:
        console.log('nothing');
    }
  };

  const renderItem = ({ item }: { item: DataNotification }) => {
    return (
      <TouchableOpacity
        onPress={() => handleNavigate(item?.notificationType ?? 0)}
        style={{
          backgroundColor: '#FFF',
          borderRadius: 15,
          marginTop: 10,
          marginBottom: 5,
          marginHorizontal: 10,
          ...SHADOWS?.SHADOW_01
        }}
      >
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={{ width: 50, height: 50, resizeMode: 'cover', borderRadius: 100 }}
                source={{ uri: imageFPTUri ? imageFPTUri : imageUndefinedUserUri }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <View>
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_700Bold }}>
                  {item?.title ? item?.title : 'No value'}
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 5 }}>
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                  {item?.text ? item?.text : 'No value'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              alignItems: 'flex-end',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 5 }}>
                <Entypo name="clock" size={20} color="black" />
              </View>
              <View>
                <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
                  {item?.createAt
                    ? formatDateTimeForNotification(item?.createAt)
                      ? formatDateTimeForNotification(item?.createAt)
                      : 'No value'
                    : 'No value'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Notifications"
        />
      </Header>
      <View style={{ flex: 1 }}>
        <FlatList
          data={notificationByTokenList?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default EventNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
