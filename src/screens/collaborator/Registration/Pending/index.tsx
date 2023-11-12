import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward/Backward';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';
import DashedLine from 'react-native-dashed-line';
import { Entypo, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { SHADOWS } from '../../../../constants/Shadows';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import { getAllPostRegistration } from '../../../../features/collaborator/collab.postRegistrationSlice';
import useIndex from './useIndex';
import {
  format_ISODateString_To_DayOfWeekMonthDD,
  format_Time_To_HHss,
} from '../../../../utils/formats';
import { imageNotFoundUri } from '../../../../utils/images';

const Registration_Pending = () => {
  const { handlers, state, props } = useIndex();

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={handlers.onRefresh}
            />
          }
        >
          <View style={{ marginTop: 20 }}>
            {props?.postRegistrationList?.data ? (
              props?.postRegistrationList?.data
                .filter((postRegistration) => postRegistration?.status === 1)
                .map((postRegistration, index) => (
                  <View
                    key={postRegistration?.registrationCode}
                    style={styles.containerItem}
                  >
                    <View style={styles.containerRow}>
                      <View style={styles.firstRow}>
                        <View style={styles.containerImage}>
                          <Image
                            style={styles.image}
                            source={{
                              uri: postRegistration?.post?.postImg
                                ? postRegistration?.post?.postImg
                                : imageNotFoundUri,
                            }}
                          />
                        </View>
                        <View style={{ flex: 1, marginLeft: 15 }}>
                          <Text style={styles.textFirst}>
                            {postRegistration?.registrationCode
                              ? 'Code: #' + postRegistration?.registrationCode
                              : 'No value'}
                          </Text>

                          {/* <Text style={styles.textFirst}>General</Text> */}
                          <Text style={styles.textFirst_2}>
                            {postRegistration?.post.postCategory
                              ?.postCategoryDescription
                              ? postRegistration?.post.postCategory
                                  ?.postCategoryDescription
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
                            {postRegistration?.postPosition?.positionName
                              ? postRegistration?.postPosition?.positionName
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
                            {postRegistration?.postPosition?.date
                              ? format_ISODateString_To_DayOfWeekMonthDD(
                                  postRegistration?.postPosition?.date
                                )
                                ? format_ISODateString_To_DayOfWeekMonthDD(
                                    postRegistration?.postPosition?.date
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
                            {postRegistration?.postPosition?.timeFrom
                              ? format_Time_To_HHss(
                                  postRegistration?.postPosition?.timeFrom
                                )
                                ? format_Time_To_HHss(
                                    postRegistration?.postPosition?.timeFrom
                                  ) + ' AM'
                                : 'No value'
                              : 'No value'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.containerStatus}>
                        <View style={styles.statusRow}>
                          <View>
                            <Text style={styles.thirdText}>
                              Pending
                            </Text>
                          </View>
                          <View style={styles.statusDot} />
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
                        <TouchableOpacity
                          style={{
                            paddingVertical: 12,
                            width: 110,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            backgroundColor: COLORS?.orange_button,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                              fontSize: 15,
                            }}
                          >
                            Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
            ) : (
              <View></View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Registration_Pending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerItem: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 6,
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
    marginBottom: 5,
  },
  textFirst_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 16,
    color: 'black',
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
