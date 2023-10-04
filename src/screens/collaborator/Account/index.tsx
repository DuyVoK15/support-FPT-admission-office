import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../../../constants/Colors';
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import { useAppDispatch } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import { getUserInfo, logout } from '../../../features/collaborator/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import Header from '../../../components/shared/Header/Header';

const Account = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const fetchUserInfo = async () => {
    await dispatch(getUserInfo()).catch((error) => {
      console.log(error);
    });
    unwrapResult;
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerTextHeader}>
          <Text style={styles.textHeader}>My Account</Text>
        </View>

        <View style={styles.containerInfoBox}>
          <View style={styles.containerInfoContent}>
            <View style={styles.avatarStyle}>
              <Image
                source={{
                  uri: userInfo?.imgUrl,
                }}
                style={{ width: 57, height: 57, borderRadius: 100 }}
              />
            </View>
            <View style={styles.column}>
              <TouchableOpacity>
                <Text style={styles.textName}>{userInfo?.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('alo')}>
                <Text style={styles.textName2}>Upgrade to Premium {'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
      >
        <View style={styles.containerItem}>
          <View style={styles.containerTextTitles}>
            <Text style={styles.textTitle}>Personal</Text>
          </View>

          <View style={styles.containerColumn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PROFILE')}
              style={styles.containerRow}
            >
              <View style={styles.column1}>
                <AntDesign
                  name="profile"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <View>
                  <Text style={styles.text}>My Profile</Text>
                </View>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CERTIFICATE_HISTORY')}
              style={styles.containerRow}
            >
              <View style={styles.column1}>
                <MaterialCommunityIcons
                  name="certificate"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <View>
                  <Text style={styles.text}>My Certificate</Text>
                </View>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('WALLET')}
              style={styles.containerRow}
            >
              <View style={styles.column1}>
                <Entypo name="wallet" size={24} color={COLORS.orange_icon} />
              </View>
              <View style={styles.column2}>
                <View>
                  <Text style={styles.text}>My Wallet</Text>
                </View>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerRow}
              onPress={() => navigation.navigate('VERIFICATION')}
            >
              <View style={styles.column1}>
                <MaterialIcons
                  name="account-balance-wallet"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <View>
                  <Text style={styles.text}>Tax</Text>
                </View>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.containerTextTitles}>
            <Text style={styles.textTitle}>Settings</Text>
          </View>

          <View style={styles.containerColumn}>
            {/* <TouchableOpacity style={styles.containerRow}>
              <View style={styles.column1}>
                <MaterialIcons
                  name="security"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>Face ID / Touch ID</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => navigation.navigate('SECURITY')}
              style={styles.containerRow}
            >
              <View style={styles.column1}>
                <Entypo name="lock" size={24} color={COLORS.orange_icon} />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>Security</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('NOTIFICATION')}
              style={styles.containerRow}
            >
              <View style={styles.column1}>
                <Ionicons
                  name="notifications"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>Notifications</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.containerTextTitles}>
            <Text style={styles.textTitle}>Others</Text>
          </View>

          <View style={styles.containerColumn}>
            <TouchableOpacity onPress={() => navigation.navigate("PROFILE_SIGNUP")} style={styles.containerRow}>
              <View style={styles.column1}>
                <MaterialIcons
                  name="connect-without-contact"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>Contact Us</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerRow}>
              <View style={styles.column1}>
                <MaterialIcons
                  name="privacy-tip"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <View>
                  <Text style={styles.text}>Privacy & Policy</Text>
                </View>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerRow}>
              <View style={styles.column1}>
                <Ionicons
                  name="document-text"
                  size={24}
                  color={COLORS.orange_icon}
                />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>Term & Condition</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerRow}>
              <View style={styles.column1}>
                <Entypo name="documents" size={24} color={COLORS.orange_icon} />
              </View>
              <View style={styles.column2}>
                <Text style={styles.text}>About SupFAmOf</Text>
              </View>
              <View style={styles.column3}>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          <SubmitButton
            onPress={() => handleLogout()}
            style={{ marginVertical: 30 }}
            titleButton="SIGN OUT"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerHeader: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  containerItem: {
    marginHorizontal: 20,
  },
  containerTextHeader: {
    marginVertical: 20,
  },
  textHeader: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 26,
  },
  avatarStyle: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: COLORS.orange_icon,
    padding: 1,
    marginRight: 10,
  },
  textName: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 22,
    marginVertical: 5,
  },
  textName2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    marginVertical: 5,
  },
  containerColumn: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderWidth: 1,
    // borderColor: COLORS.boder40,

    // borderRadius: 10,
    marginBottom: 30,
  },
  containerInfoBox: {
    borderRadius: 10,
    backgroundColor: COLORS.orange_icon,
    shadowColor: COLORS.orange_icon,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 30,
  },
  containerInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 15,
  },
  column: {
    flex: 1,
    marginLeft: 10,
  },
  column1: {
    flex: 0,
    marginLeft: 15,
    backgroundColor: COLORS.orange_grey_icon,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  column2: {
    flex: 4,
    marginLeft: 25,
  },
  column3: {
    flex: 0,
    marginRight: 15,
  },
  text: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 15,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
  },
  // textBalance: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  // buttonRecharge: {
  //   marginTop: 10,
  //   backgroundColor: "#FFF",
  //   borderWidth: 2,
  //   borderColor: COLORS.orange_icon,
  //   alignItems: "center",
  //   width: 100,
  //   paddingVertical: 10,
  //   borderRadius: 10,
  // },
  // textRecharge: {
  //   fontSize: 16,
  //   color: COLORS.orange_icon,
  // },
  containerTextTitles: {
    marginVertical: 10,
  },
  containerButton: {
    marginVertical: 30,
  },
});
