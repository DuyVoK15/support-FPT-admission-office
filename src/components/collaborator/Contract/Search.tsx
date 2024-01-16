import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';

export type DataFilterContract = {
  search: string | null;
};
interface SearchProps extends ViewStyle {
  total: number | null;
  dataFilterContract: DataFilterContract | null;
  setDataFilterContract: React.Dispatch<
    React.SetStateAction<DataFilterContract | null>
  >;
  isRefresh?: boolean;
}
const Search: FC<SearchProps> = (Props) => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const handleSearchPost = () => {
    Props.setDataFilterContract((prevFilter) => ({
      search: searchText ?? null,
    }));
  };
  // Handle reset state
  const handleResetState = () => {
    setSearchText(null);
  };

  useEffect(() => {
    handleResetState();
  }, [Props.isRefresh]);
  console.log(Props.isRefresh)
  // Return main Component JSX
  return (
    <View style={{ flex: 0 }}>
      <View style={{ }}>
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
            value={searchText ?? ''}
            onChangeText={(value) => setSearchText(value)}
          />
          <TouchableOpacity
            onPress={handleSearchPost}
            style={{ position: 'absolute', right: 10, top: 9 }}
          >
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
