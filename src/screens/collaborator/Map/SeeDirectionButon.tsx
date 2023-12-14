import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { COLORS } from '../../../constants/Colors';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { Fontisto } from '@expo/vector-icons';

interface SeeDirectionButonProps extends TouchableOpacityProps {}
const SeeDirectionButon: FC<SeeDirectionButonProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS?.blue_status,
        justifyContent: 'space-evenly',
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
            color: '#FFF',
            fontSize: 15,
          }}
        >
          See direction
        </Text>
      </View>
      <View style={{ marginLeft: 5 }}>
        <Fontisto name="map" size={20} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
};

export default SeeDirectionButon;

const styles = StyleSheet.create({});
