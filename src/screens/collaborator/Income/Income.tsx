import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { ScreenHeight } from '../../../constants/Demesions';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { Fontisto } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import useIncome from './useIncome';
import FilterReportMonthYear from './FilterReportMonthYear';
import { DataReport } from '../../../models/collaborator/report.mode';
import {
  format_ISODateString_To_DDMonthYYYY,
  format_ISODateString_To_HHss,
} from '../../../utils/formats';
import { SHADOWS } from '../../../constants/Shadows';
import { COLORS } from '../../../constants/Colors';
import Animated from 'react-native-reanimated';
import IncomeRegistration from './incomeRegistration/IncomeRegistration';

const Wallet = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, props, state, setState, stateRedux } = useIncome();

  const renderItem = ({ item }: { item: DataReport }) => {
    return (
      <TouchableOpacity
        style={styles.walletBox}
        onPress={() =>
          handlers.getRegistrationByReportId({ accountReportId: 2 })
        }
      >
        <View style={styles.walletContent}>
          <View style={{ flex: 1 }}>
            <Fontisto name="wallet" size={24} color="black" />
          </View>

          <View style={{ flex: 5 }}>
            <View>
              <Text style={styles.textDate}>
                {item?.createAt
                  ? format_ISODateString_To_DDMonthYYYY(item?.createAt)
                  : 'No value'}
              </Text>
            </View>
            <View>
              <Text style={styles.textTime}>
                {item?.createAt
                  ? format_ISODateString_To_HHss(item?.createAt)
                  : 'No value'}
              </Text>
            </View>
          </View>

          <View style={{ flex: 0 }}>
            <Text style={styles.textPrice}>
              {item?.salary ? '+' + item?.salary + ' VNĐ' : '+0 VNĐ'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // const animatedValue = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   Animated.timing(animatedValue, {
  //     toValue: 1000000,
  //     duration: 5000, // Animation duration in milliseconds
  //     useNativeDriver: false, // Might need to be set to true depending on the animation properties used
  //   }).start();
  // }, []);

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="My Income"
        />
      </Header>

      <View style={styles.containerWallet}>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 22 }}
          >
            Income total:{' '}
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                fontSize: 20,
                color: COLORS?.orange_button,
              }}
            >
              {stateRedux?.totalSalary
                ? stateRedux?.totalSalary + ' VNĐ'
                : '0 VNĐ'}
            </Text>
          </Text>
        </View>
        <View>
          <FilterReportMonthYear
            dataFilterReport={state.dataFilterReport}
            setDataFilterReport={setState.setDataFilterReport}
            refreshing={state.refreshing}
          />
        </View>
        <View style={{ flex: 1, marginTop: 15 }}>
          <FlatList
            data={stateRedux?.reportList?.data}
            renderItem={renderItem}
            contentContainerStyle={{ marginHorizontal: 15, marginTop: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={state.refreshing}
                onRefresh={handlers.onRefresh}
              />
            }
          />
          <IncomeRegistration
            isVisible={state.isVisible}
            incomeRegistration={stateRedux.incomeRegistration}
            onCloseButton={handlers.hideRegistration}
          />
        </View>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerWallet: {
    flex: 1,
    marginTop: 10,
  },
  textTitle: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 18,
  },
  walletBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    ...SHADOWS?.SHADOW_03,
  },
  walletContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  textDate: {
    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
    fontSize: 15,
  },
  textTime: {
    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
    fontSize: 15,
  },
  textPrice: {
    fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
    fontSize: 15,
    color: 'green',
  },
});
