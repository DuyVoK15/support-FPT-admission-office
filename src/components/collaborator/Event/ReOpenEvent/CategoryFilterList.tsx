import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import ViewPostCategoryResponse from '../../../../dtos/collaborator/response/viewPostCategory.dto';
import { DataFilterReOpen } from './FilterModalButton';

interface CategoryFilterListProps {
  postCategoryList: ViewPostCategoryResponse;
  dataFilterReOpen: DataFilterReOpen | null;
  setDataFilterReOpen: React.Dispatch<
    React.SetStateAction<DataFilterReOpen | null>
  >;
  postReOpenCategoryDes: string | null;
  setPostReOpenCategoryDes: (des: string | null) => void;
}
const CategoryFilterList: FC<CategoryFilterListProps> = (props) => {
  const getPostCategoryId = async (Id: number | null, Des: string | null) => {
    props.setDataFilterReOpen((prevFilter) => ({
      postReOpenCategoryId: Id,
      createAtStart: prevFilter?.createAtStart || null,
      createAtEnd: prevFilter?.createAtEnd || null,
      dateFromStart: prevFilter?.dateFromStart || null,
      dateFromEnd: prevFilter?.dateFromEnd || null,
      searchText: null,
      sort: prevFilter?.sort || null,
      order: prevFilter?.order || null,
    }));
    props.setPostReOpenCategoryDes(Des);
  };
  console.log(props.dataFilterReOpen);

  return (
    <View style={{ marginVertical: 15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.postCategoryList?.data
            .filter((category) => category?.isActive === true)
            .map((category, index) => (
              <TouchableOpacity
                onPress={() => {
                  getPostCategoryId(
                    category?.id,
                    category?.postCategoryDescription
                  );
                }}
                key={index}
                style={{
                  borderWidth: 3,
                  borderColor: '#FF930F',
                  backgroundColor:
                    props.dataFilterReOpen?.postReOpenCategoryId ===
                    category?.id
                      ? '#FF930F'
                      : '#FFF',
                  marginRight: 10,
                  borderRadius: 20,
                }}
              >
                <View style={{ margin: 10 }}>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                      color:
                        props.dataFilterReOpen?.postReOpenCategoryId ===
                        category?.id
                          ? '#FFF'
                          : '#FF930F',
                    }}
                  >
                    {category?.postCategoryDescription}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryFilterList;

const styles = StyleSheet.create({});
