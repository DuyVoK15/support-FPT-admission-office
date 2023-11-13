import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/Colors';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { searchPostByPostCode } from '../../../../features/collaborator/collab.postSlice';
import { useAppDispatch } from '../../../../app/store';
import { MyContext } from '../../../../context/stateContext';

const Search = () => {
  const dispatch = useAppDispatch();

  const context = useContext(MyContext);
  if (context === null) {
    // Handle the case when the context is null, e.g., provide a default value or throw an error.
    return null;
  }

  const {postUpcommingKeySearch, setPostUpcommingKeySearch} = context;

//   const handleSearchPost = async () => {
//     await dispatch(searchPostByPostCode(postCode)).then((res) => {
//       // console.log(JSON.stringify(res, null, 2));
//     });
//   };
  return (
    <View>
      <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ borderRadius: 10 }}>
          <TextInput
            style={{
              fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
              height: 50,
              padding: 10,
              backgroundColor: '#d9d7d4',
              borderRadius: 10,
            }}
            placeholder="Search by postcode, name, ..."
            onChangeText={(value) => setPostUpcommingKeySearch(value)}
          />
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 9 }}>
          <FontAwesome name="search" size={30} color={COLORS?.orange_button} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
            Key: Open Day
          </Text>
        </View>
        <View>
          <Text style={{ fontFamily: FONTS_FAMILY?.Ubuntu_400Regular }}>
            Found (0) results
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
