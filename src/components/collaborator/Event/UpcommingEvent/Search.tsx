import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useContext, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { searchPostByPostCode } from '../../../../features/collaborator/collab.postSlice';
import { useAppDispatch } from '../../../../app/store';
import { MyContext } from '../../../../context/stateContext';
import { DataFilterUpcomming } from './FilterModalButton';

interface SearchProps extends ViewStyle {
  postUpcommingCategoryDes: string | null;
  total: number | null;
  dataFilterUpcomming: DataFilterUpcomming | null;
  setDataFilterUpcomming: React.Dispatch<
    React.SetStateAction<DataFilterUpcomming | null>
  >;
}
const Search: FC<SearchProps> = (Props) => {
  const [searchText, setSearchText] = useState<string | null>(null);
    const handleSearchPost = () => {
      Props.setDataFilterUpcomming((prevFilter) => ({
        postUpcommingCategoryId: prevFilter?.postUpcommingCategoryId || null,
        createAtStart: prevFilter?.createAtStart || null,
        createAtEnd: prevFilter?.createAtEnd || null,
        dateFromStart: prevFilter?.dateFromStart || null,
        dateFromEnd: prevFilter?.dateFromEnd || null,
        searchText: searchText,
        sort: prevFilter?.sort || null,
        order: prevFilter?.order || null,
      }));
    };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ borderRadius: 10, marginRight: 5 }}>
          <TextInput
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
              height: 50,
              padding: 10,
              backgroundColor: '#d9d7d4',
              borderRadius: 10,
            }}
            placeholder="Search by postcode, name, ..."
            onChangeText={(value) => setSearchText(value)}
          />
          <TouchableOpacity onPress={handleSearchPost} style={{ position: 'absolute', right: 10, top: 9 }}>
            <FontAwesome
              name="search"
              size={30}
              color={COLORS?.orange_button}
            />
          </TouchableOpacity>
        </View>
        {/* Collumn 2 */}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 5, marginRight: 5 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
            {Props.postUpcommingCategoryDes
              ? 'Find in: ' + Props.postUpcommingCategoryDes
              : ''}
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
            Found ({Props.total}) results
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
