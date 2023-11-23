import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { ScreenWidth } from '../../../../constants/Demesions';
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import useRegistrationRejected from './useRegistrationRejected';
import { RefreshControl } from 'react-native';
import {
  format_ISODateString_To_DayOfWeekMonthDD,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { imageNotFoundUri } from '../../../../utils/images';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';
import { FlashList } from '@shopify/flash-list';
import DetailButton from '../../../../components/shared/Button/DetailButton';
import DataViewPostRegistration from '../../../../models/collaborator/postRegistration.model';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useNavigation } from '@react-navigation/native';

const Registration_Cancelled = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const { handlers, state, props } = useRegistrationRejected();
  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
  };

  const renderItem = ({ item }: { item: DataViewPostRegistration }) => {
    return (
      <View style={styles.containerItem}>
        <View style={styles.containerRow}>
          <View style={styles.firstRow}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: item?.post?.postImg
                    ? item?.post?.postImg
                    : imageNotFoundUri,
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.textFirst}>General</Text>

              {/* <Text style={styles.textFirst}>General</Text> */}
              <Text style={styles.textFirst_2}>
                {item?.post.postCategory?.postCategoryDescription
                  ? item?.post.postCategory?.postCategoryDescription
                  : 'No value'}
              </Text>
              <Text style={styles.textFirst_3}>
                {item?.registrationCode
                  ? 'Code: ' + item?.registrationCode
                  : 'No value'}
              </Text>
            </View>
          </View>

          <DashedLine
            style={{ marginVertical: 15 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <View style={styles.secondRow}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Position</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.positionName
                  ? item?.postPosition?.positionName
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Date</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.date
                  ? format_ISODateString_To_DayOfWeekMonthDD(
                      item?.postPosition?.date
                    )
                    ? format_ISODateString_To_DayOfWeekMonthDD(
                        item?.postPosition?.date
                      )
                    : 'No value'
                  : 'No value'}
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={styles.textSecond}>Time</Text>
              <Text style={styles.textSecond_2}>
                {item?.postPosition?.timeFrom
                  ? format_Time_To_HHss(item?.postPosition?.timeFrom)
                    ? format_Time_To_HHss(item?.postPosition?.timeFrom) + ' AM'
                    : 'No value'
                  : 'No value'}
              </Text>
            </View>
          </View>

          <View style={[styles.containerStatus, { borderColor: '#000' }]}>
            <View style={styles.statusRow}>
              <View>
                <Text style={[styles.thirdText, { color: '#000' }]}>
                  Rejected
                </Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: '#000' }]} />
            </View>
          </View>

          <DashedLine
            style={{ marginVertical: 10 }}
            dashGap={0}
            dashThickness={1}
            dashLength={8}
            dashColor={COLORS.super_light_grey}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <DetailButton
              onPress={() =>
                navigation.navigate('REGISTRATION_PENDING_DETAIL', {
                  item,
                })
              }
            />
          </View>

          {/* <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ flex: 1 }}></View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular_Italic,
                    fontSize: 13,
                    textDecorationLine: 'underline',
                  }}
                >
                  Change position
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={props.postRegistrationList?.data}
        renderItem={renderItem}
        estimatedItemSize={100}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={handlers.onRefresh}
          />
        }
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponentStyle={{ marginTop: 15 }}
      />
    </View>
  );
};

export default Registration_Cancelled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerItem: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
  },
  containerRow: {
    margin: 15,
  },
  firstRow: { flexDirection: 'row', alignItems: 'center' },
  containerImage: {
    flex: 0,
    borderRadius: 15,
  },
  image: {
    height: ScreenWidth * 0.2,
    width: ScreenWidth * 0.3,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  textFirst: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 13,
    color: COLORS.light_black,
  },
  textFirst_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  textFirst_3: {
    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
    fontSize: 12,
    color: COLORS?.light_grey,
    marginTop: 5,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: 10,
    // marginBottom: 20,
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textColumn: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 14,
  },
  textColumn_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
  },
  textSecond: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 12,
    color: COLORS.light_grey,
  },
  textSecond_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
    color: 'black',
    marginVertical: 5,
    textAlign: 'center',
  },
  containerStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 30,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 7,
  },
  thirdRow: { flexDirection: 'row', alignItems: 'center' },
  thirdText: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    color: COLORS.light_grey,
  },
  statusDot: {
    width: 12,
    height: 12,
    marginLeft: 5,
    borderRadius: 100,
    backgroundColor: 'green',
  },
  containerViewDetail: {
    alignItems: 'center',
  },
});
