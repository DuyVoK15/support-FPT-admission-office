import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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

const Wallet = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const { handlers, props, stateRedux } = useIncome();

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

  return (
    <View style={styles.container}>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="My Wallet"
        />
      </Header>

      <View style={styles.containerWallet}>
        <View>
          <Text style={styles.textTitle}>History</Text>
        </View>
        <View>
          <FlatList
            data={stateRedux?.reportList?.data}
            renderItem={renderItem}
            contentContainerStyle={{marginHorizontal: 15}}
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
    // marginHorizontal: 15,
    marginTop: 20,
  },
  textTitle: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 18,
  },
  walletBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
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
