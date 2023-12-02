import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { TouchableOpacityProps } from 'react-native';

interface LogoutButtonProps extends TouchableOpacityProps {}
const LogoutButton: FC<LogoutButtonProps> = (props) => {
  const { ...otherProps } = props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#F64C18',
      }}
    >
      <View style={{ flex: 1, marginLeft: 17 }}>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            fontSize: 15,
            color: 'white',
          }}
        >
          Log out
        </Text>
      </View>

      <View style={{ flex: 0, marginRight: 17 }}>
        <MaterialIcons name="cancel-presentation" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({});
