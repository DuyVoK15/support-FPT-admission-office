import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { ScreenWidth } from '../../../constants/Demesions';
import { LinearGradient } from 'expo-linear-gradient';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { useAppDispatch } from '../../../app/store';
import { getAllPost } from '../../../features/collaborator/collab.postSlice';

interface UpcommingPaginationProps {
  pageList: number[] | null | undefined;
  isChecked: boolean[];
  handleSelectedItem: (index: number) => void;
}
const UpcommingPagination: FC<UpcommingPaginationProps> = (props) => {
  

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 15,
      }}
    >
      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
            fontSize: 16,
            color: '#55a630',
          }}
        >
          Prev
        </Text>
      </TouchableOpacity> */}
      <View
        style={{
          width: ScreenWidth * 0.8,
          marginHorizontal: 10,
          alignItems: 'center',
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {props.pageList?.map((page, index) => {
              let INDEX = index + 1;
              return (
                <TouchableOpacity
                  key={INDEX}
                  onPress={() => props.handleSelectedItem(INDEX)}
                  // style={}
                >
                  <LinearGradient
                    colors={
                      props.isChecked[INDEX]
                        ? ['#CAF2EF', '#C9EFDC']
                        : ['#f4f5f0', '#f4f7e6']
                    } // Mã màu cam và màu cam kết hợp
                    start={{ x: 0.5, y: 0 }} // Bắt đầu từ giữa màn hình ở dưới cùng
                    end={{ x: 0.5, y: 1 }} // Kết thúc ở giữa màn hình ở trên cùng
                    locations={[0, 1]} // Chỉ có 2 vị trí: 0 và 1
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      // borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                        fontSize: 16,
                        color: props.isChecked[INDEX] ? '#55a630' : '#ceeb4b',
                      }}
                    >
                      {page}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
            fontSize: 16,
            color: '#55a630',
          }}
        >
          Next
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default UpcommingPagination;

const styles = StyleSheet.create({});
