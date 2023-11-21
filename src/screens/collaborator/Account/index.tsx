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
import { unwrapResult } from '@reduxjs/toolkit';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import Header from '../../../components/shared/Header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { SHADOWS } from '../../../constants/Shadows';
import {
  collab_getUserInfo,
  collab_logout,
  collab_reloadGetUserInfo,
} from '../../../features/collaborator/collab.authSlice';
import { imageUndefinedUserUri } from '../../../utils/images';
import Animated from 'react-native-reanimated';

const Account = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.collab_auth.userInfo);
  const fetchUserInfo = async () => {
    try {
      await dispatch(collab_reloadGetUserInfo()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }

    unwrapResult;
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await dispatch(collab_logout({ expoToken: '' })).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerTextHeader}>
          <Text style={styles.textHeader}>My Account</Text>
        </View>

        <LinearGradient
          colors={['#FF8C00', '#FFA07A']} // Mã màu cam và màu cam kết hợp
          start={{ x: 0.5, y: 0 }} // Bắt đầu từ giữa màn hình ở dưới cùng
          end={{ x: 0.5, y: 1 }} // Kết thúc ở giữa màn hình ở trên cùng
          locations={[0, 1]}
          style={styles.containerInfoBox}
        >
          <View style={styles.containerInfoContent}>
            <View style={styles.avatarStyle}>
              <Image
                source={{
                  uri: userInfo?.imgUrl ? userInfo?.imgUrl : imageUndefinedUserUri,
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
        </LinearGradient>
      </View>

      <Animated.ScrollView
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
              onPress={() => navigation.navigate('CONTRACT')}
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
                  <Text style={styles.text}>My Contract</Text>
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
              onPress={() => navigation.navigate('ACCOUNT_NOTIFICATION')}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('PROFILE_SIGNUP')}
              style={styles.containerRow}
            >
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
      </Animated.ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  containerHeader: {
    marginHorizontal: 15,
    marginTop: 40,
  },
  containerItem: {
    marginHorizontal: 15,
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
    ...SHADOWS.SHADOW_03,
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

    marginBottom: 10,
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
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
  },

  containerTextTitles: {
    marginVertical: 10,
  },
  containerButton: {
    marginVertical: 30,
  },
});
