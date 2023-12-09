import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { imageUndefinedUserUri } from '../../../../utils/images';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { Entypo } from '@expo/vector-icons';
import { useAppDispatch } from '../../../../app/store';
import { getAllNotificationByToken } from '../../../../features/collaborator/collab.notificationSlice';
import { useAppSelector } from '../../../../app/hooks';
import { DataNotification } from '../../../../models/collaborator/notification.model';
import { formatDateTimeForNotification } from '../../../../utils/formats';

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

  const renderItem = ({ item }: { item: DataNotification }) => {
    return (
      <View
        style={{
          backgroundColor: '#FFF',
          borderRadius: 15,
          marginVertical: 10,
        }}
      >
        <View style={{ margin: 15 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                style={{ width: 50, height: 50, resizeMode: 'cover' }}
                source={{ uri: imageUndefinedUserUri }}
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
                    : 'No value'}
                </Text>
              </View>
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
          onPress={() => navigation.goBack()}
          titleBackward="Notifications"
        />
      </Header>
      <View style={{ flex: 1 }}>
        <FlatList
          data={notificationByTokenList?.data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ marginHorizontal: 15 }}
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
