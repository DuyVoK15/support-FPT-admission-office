import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScreenWidth } from '../../../constants/Demesions';
import { SHADOWS } from '../../../constants/Shadows';
import { COLORS } from '../../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { useAppDispatch } from '../../../app/store';
import { getAllPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';
import { useAppSelector } from '../../../app/hooks';

const UpdateBookingPopup = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistration
  );
  const fetchPostRegistration = async () => {
    await dispatch(getAllPostRegistration());
  };
  useEffect(() => {
    fetchPostRegistration();
  }, []);
  
  return (
    <View style={{ marginHorizontal: 5 }}>
      <TouchableOpacity>
        <LinearGradient
          colors={['#00b09b', '#96c93d']}
          //   style={styles.container}
          style={{
            position: 'absolute',
            width: '100%',
            height: 60,
            bottom: 5,
            backgroundColor: COLORS.green_filter_button,
            borderRadius: 10,
            // marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
              color: '#FFF',
            }}
          >
            UpdateBookingPopup
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateBookingPopup;

const styles = StyleSheet.create({});
