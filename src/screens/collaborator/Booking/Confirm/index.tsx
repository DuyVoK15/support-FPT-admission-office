import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { ScreenWidth } from '../../../../constants/Demesions';
import { Entypo } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';

const Booking_Confirm = () => {
  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.containerItem}>
            <View style={styles.containerRow}>
              <View style={styles.firstRow}>
                <View style={styles.containerImage}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: 'https://cdnimg.vietnamplus.vn/t870/uploaded/xpcwvovt/2020_11_13/ttxvn_viet_duc_5.jpg',
                    }}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.textFirst}>General</Text>
                  <Text style={styles.textFirst_2}>
                    FPT University Campus Tour
                  </Text>
                </View>
              </View>

              {/* <DashedLine
                style={{ marginVertical: 15 }}
                dashGap={5}
                dashThickness={1}
                dashLength={8}
                dashColor={COLORS.light_grey}
              /> */}

              <View style={styles.secondRow}>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Position</Text>
                  <Text style={styles.textSecond_2}>Trực hội trường</Text>
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Date</Text>
                  <Text style={styles.textSecond_2}>Tue, JUL 24</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Time</Text>
                  <Text style={styles.textSecond_2}>6:00 AM</Text>
                </View>
              </View>
              <DashedLine
                dashGap={5}
                dashThickness={1}
                dashLength={10}
                dashColor={COLORS.light_grey}
              />
              <View style={styles.containerViewDetail}>
                <TouchableOpacity>
                  <Entypo name="chevron-down" size={30} color={COLORS.light_grey} />
                </TouchableOpacity>
              </View>

              <View style={styles.containerStatus}>
                <View style={styles.statusRow}>
                  <View>
                    <Text style={styles.thirdText}>Pending</Text>
                  </View>
                  <View style={styles.statusDot} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Booking_Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerItem: {
    marginVertical: 20,
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
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
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
})