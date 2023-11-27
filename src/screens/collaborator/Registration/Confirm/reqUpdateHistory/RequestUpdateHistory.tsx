import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../../../../components/shared/Header/Back';
import Backward from '../../../../../components/shared/Direction/Backward/Backward';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../../type';
import { useAppSelector } from '../../../../../app/hooks';
import { useAppDispatch } from '../../../../../app/store';
import { getAllRequestUpdateHistory } from '../../../../../features/collaborator/collab.postRegistrationSlice';
import { DataRequestUpdateHistory } from '../../../../../models/collaborator/dataUpdateRequest.model';
import LoadingScreen from '../../../../../components/shared/Loading/Loading';
import { SHADOWS } from '../../../../../constants/Shadows';
import { REQUEST_UPDATE_STATUS_ENUM } from '../../../../../enums/collaborator/RequestUpdateStatus';
import { FONTS_FAMILY } from '../../../../../constants/Fonts';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../../utils/formats';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../../../../constants/Colors';
import RequestUpdateStatus from '../../../../../components/collaborator/Registration/Confirm/RequestUpdateStatus';

const RequestUpdateHistory = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { id } = route?.params as { id: number | null };
  console.log(id);
  const disptach = useAppDispatch();
  const requestUpdateList = useAppSelector(
    (state) => state.collab_postRegistration.requestUpdateHistory
  );
  const loading = useAppSelector(
    (state) => state.collab_postRegistration.loading
  );
  const fetchRequestUpdateHistory = async () => {
    try {
      await disptach(
        getAllRequestUpdateHistory({ PostRegistrationId: id, Sort: 'CreateAt' })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestUpdateHistory();
  }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRequestUpdateHistory().catch(() => {
      setRefreshing(false);
    });
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: { item: DataRequestUpdateHistory }) => {
    return !loading ? (
      <TouchableOpacity
        style={{
          marginVertical: 5,
          marginHorizontal: 8,
          borderRadius: 15,
          backgroundColor: '#FFF',
          ...SHADOWS.SHADOW_05,
        }}
      >
        <View style={{ margin: 15 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    fontSize: 15,
                    color: COLORS?.light_grey,
                  }}
                >
                  Request ID:{' '}
                  <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium }}>
                    {item?.id ? item?.id : 'No value'}
                  </Text>
                </Text>
              </View>

              {item?.status ? (
                item?.status === REQUEST_UPDATE_STATUS_ENUM.PENDING ? (
                  <RequestUpdateStatus title={'Pending'} color="orange" />
                ) : item?.status === REQUEST_UPDATE_STATUS_ENUM.APPROVEED ? (
                  <RequestUpdateStatus title={'Approved'} color="#52ad42" />
                ) : (
                  <RequestUpdateStatus title={'Rejected'} color="#fa4816" />
                )
              ) : (
                <RequestUpdateStatus title={'No status'} color="black" />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  ...SHADOWS?.SHADOW_01,
                }}
              >
                <LinearGradient
                  colors={['#E3E9EB', '#C9D3D7']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ borderRadius: 10 }}
                >
                  <View style={{ margin: 10, alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                        fontSize: 14,
                      }}
                    >
                      Current position
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                        marginTop: 5,
                        fontSize: 17,
                        textAlign: 'center',
                      }}
                    >
                      {item?.postPositionOriginal?.positionName
                        ? item?.postPositionOriginal?.positionName
                        : 'No value'}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  ...SHADOWS?.SHADOW_01,
                }}
              >
                <LinearGradient
                  colors={['#C9D3D7', '#B7C4C9']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={{ borderRadius: 10 }}
                >
                  <View style={{ margin: 10, alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                        fontSize: 14,
                      }}
                    >
                      Changing position
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 17,
                        textAlign: 'center',
                      }}
                    >
                      {item?.postPositionNeedToBeUpdated?.positionName
                        ? item?.postPositionNeedToBeUpdated?.positionName
                        : 'No value'}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <View style={{ position: 'absolute' }}>
                <Entypo name="arrow-right" size={36} color="#000" />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY?.Ubuntu_300Light_Italic,
                  fontSize: 13,
                }}
              >
                Request at:{' '}
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic,
                    fontSize: 13,
                  }}
                >
                  {item?.createAt
                    ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                        item?.createAt
                      )
                    : 'No value'}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <LoadingScreen />
    );
  };

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          titleBackward="Request Update History"
          onPress={() => navigation.goBack()}
        />
      </Header>
      <View style={{ flex: 1, marginTop: 10 }}>
        <View style={{ margin: 0 }}>
          <View style={{}}>
            <FlatList
              data={requestUpdateList?.data}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestUpdateHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
