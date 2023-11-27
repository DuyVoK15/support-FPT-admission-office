import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { FC, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { FlashList } from '@shopify/flash-list';
type DataSort = {
  id: number | null;
  sortByName: string | null;
  sortByParam: string | null;
  orderByName: string | null;
  orderByParam: string | null;
  iconName: keyof typeof FontAwesome.glyphMap;
};

const dataSortList: DataSort[] = [
  {
    id: 1,
    sortByName: 'Create at',
    sortByParam: 'CreateAt',
    orderByName: 'Acsending',
    orderByParam: 'ACSENDING',
    iconName: 'sort-asc',
  },
  {
    id: 2,
    sortByName: 'Create at',
    sortByParam: 'CreateAt',
    orderByName: 'Descending',
    orderByParam: 'Descending',
    iconName: 'sort-desc',
  },
  {
    id: 3,
    sortByName: 'Date working',
    sortByParam: 'Date',
    orderByName: 'Acsending',
    orderByParam: 'ACSENDING',
    iconName: 'sort-asc',
  },
  {
    id: 4,
    sortByName: 'Date working',
    sortByParam: 'Date',
    orderByName: 'Descending',
    orderByParam: 'Descending',
    iconName: 'sort-desc',
  },
];
interface SortRegistrationButtonProps extends TouchableOpacityProps {}
const SortRegistrationButton: FC<SortRegistrationButtonProps> = (props) => {
  const { ...otherProps } = props;

  const [textSortBy, setTextSortBy] = useState<string | null>('Sort by');
  const [iconName, setIconName] =
    useState<keyof typeof FontAwesome.glyphMap>('sort');

  const toggleChangeChildButton = (
    iconName: keyof typeof FontAwesome.glyphMap,
    textSortBy: string | null
  ) => {
    closeDropdown();
    setIconName(iconName);
    setTextSortBy(textSortBy);
  };

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  };

  return (
      <>
        <TouchableOpacity
          {...otherProps}
          onPress={toggleDropdown}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E1DAE6',
            borderRadius: 15,
            paddingVertical: 6,
            paddingHorizontal: 8,
          }}
        >
          <View style={{ marginRight: 2 }}>
            <FontAwesome name={iconName} size={24} color="black" />
          </View>
          <View style={{ marginLeft: 2 }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                fontSize: 15,
              }}
            >
              {textSortBy}
            </Text>
          </View>
        </TouchableOpacity>
        {showDropdown && (
          <View
            style={{
              position: 'absolute',
              bottom: -120,
              height: 115,
              justifyContent: 'center',
              backgroundColor: '#E1DAE6',
              borderRadius: 15,
              paddingVertical: 8,
              paddingHorizontal: 10,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {dataSortList?.map((item, index) => (
                <View key={index}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        toggleChangeChildButton(
                          item?.iconName,
                          item?.sortByName
                        )
                      }
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        marginVertical: 2,
                      }}
                    >
                      <View style={{ marginRight: 4 }}>
                        <FontAwesome
                          name={item?.iconName}
                          size={18}
                          color="black"
                          selectionColor={"red"}
                        />
                      </View>
                      <View style={{ marginLeft: 4 }}>
                        <Text
                          style={{
                            fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                            fontSize: 15,
                          }}
                        >
                          {item?.sortByName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ borderWidth: 0.4 }} /> */}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </>
  );
};

export default SortRegistrationButton;

const styles = StyleSheet.create({});
