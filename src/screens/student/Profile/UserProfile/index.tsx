import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { logout } from '../../../../features/student/authSlice';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward';
import AvatarImage from './AvatarImage';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import ProfileTextInput from './ProfileTextInput';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext, AuthContextType } from '../../../../context/AuthContext';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  // const { logout } = useContext(AuthContext) as AuthContextType;
  const handleLogout = async () => {
    await dispatch(logout())
  }
  return (
    <View style={styles.container}>
      <View style={{ width: ScreenWidth * 0.9, marginTop: 50 }}>
        <Text style={{ fontSize: 24 }}>User Profile</Text>
      </View>

      <View style={{ alignItems: 'center', flex: 1 }}>
        <AvatarImage
          source={{
            uri: 'https://scontent.fdad1-4.fna.fbcdn.net/v/t1.15752-9/368508962_209687898482858_4689236446600182480_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=0NKDPALugQEAX863g5P&_nc_oc=AQkqMBaap8yj-k9OEtNhbzrA0hqTikU37vMckHv8X8hzmjVV7XRYeeEuALmpqWHg-YQ&_nc_ht=scontent.fdad1-4.fna&oh=03_AdSsYuhpCmzKxNODTN24Oicr0PNPdL8Q0eTHrG5N-F8qeQ&oe=65104F4B',
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Button title="Logout" onPress={() => handleLogout()} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <ProfileTextInput name="Name" />
          <ProfileTextInput name="Phone Number" />
          <ProfileTextInput name="Avatar Image URL" />
          <ProfileTextInput name="Citizen Identification Number" />
          <ProfileTextInput name="Citizen Identification Issue Address" />
          <ProfileTextInput name="Citizen Identification Issue Date" />
          <ProfileTextInput name="Citizen Identification Issue Place" />
          <ProfileTextInput name="Student ID" />
          <ProfileTextInput name="Facebook Profile URL" />
          <ProfileTextInput name="Tax Number" />
          <ProfileTextInput name="Date Of Birth" />

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 16 }}>
              Citizen Identification Card Picture
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => console.log('a')}
            >
              <Ionicons name="image" size={160} />
              <Text style={{ color: COLORS.light_black }}>Front Image</Text>
            </TouchableOpacity>
            <View
              style={{
                height: 130,
                borderWidth: 1,
                borderColor: COLORS.grey_icon,
                marginHorizontal: 20,
              }}
            ></View>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <Ionicons name="image" size={160} />
              <Text style={{ color: COLORS.light_black }}>Back Image</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 50,
            }}
          >
            <TouchableOpacity
              style={{
                width: ScreenWidth * 0.8,
                paddingVertical: 15,
                backgroundColor: COLORS.orange_button,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5,
              }}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: 'white' }}>
                  {' '}
                  SAVE CHANGE
                </Text>
              </View>
              <MaterialCommunityIcons
                style={{ position: 'absolute', right: 10 }}
                name="arrow-right-circle"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "white"
  },
});
