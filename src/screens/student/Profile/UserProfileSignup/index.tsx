import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward';
import ProfileTextInput from '../UserProfile/ProfileTextInput';
import ProfileSignupTextInput from './ProfileSignupTextInput';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { ScreenWidth } from '../../../../constants/Demesions';

const UserProfileSignup = () => {
  return (
    <View style={styles.container}>
      <Header>
        <Backward
          style={styles.backwardButton}
          onPress={() => console.log('Back to ')}
        />
        <Text style={styles.titleHeader}>Sign-up Profile Information</Text>
      </Header>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
        <View style={{marginBottom: 30}}>
          <Text style={{ fontSize: 24 }}>Profile Information</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Number *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Address *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Date *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Citizen Identification Issue Place *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Student ID *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Facebook Profile URL *"
          />
          <ProfileSignupTextInput
            style={{ marginVertical: 10, backgroundColor: 'white' }}
            name="Tax Number"
          />

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
                <Text style={{ fontSize: 16, color: 'white' }}> SUBMIT</Text>
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

export default UserProfileSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backwardButton: {
    marginHorizontal: 15,
  },
  titleHeader: {
    fontSize: 22,
    color: 'white',
    fontStyle: 'italic',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
