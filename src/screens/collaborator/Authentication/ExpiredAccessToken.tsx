import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { useAppDispatch } from '../../../app/store';
import { collab_logout } from '../../../features/collaborator/collab.authSlice';

const ExpiredAccessToken = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(collab_logout()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 20 }}
      >
        Login session has expired
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          marginTop: 20,
          paddingVertical: 15,
          paddingHorizontal: 30,
          backgroundColor: COLORS?.orange_button,
          borderRadius: 15,
        }}
      >
        <Text
          style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 16 }}
        >
          OK
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpiredAccessToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
