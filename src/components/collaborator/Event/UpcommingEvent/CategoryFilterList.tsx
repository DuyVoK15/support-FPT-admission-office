import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import { useAppSelector } from '../../../../app/hooks';
import ViewPostCategoryResponse from '../../../../dtos/collaborator/response/viewPostCategory.dto';
import { useAppDispatch } from '../../../../app/store';
import { getPostCategoryIdById } from '../../../../features/collaborator/collab.postSlice';
import { MyContext } from '../../../../context/stateContext';

interface CategoryFilterListProps {
  postCategoryList: ViewPostCategoryResponse;
  // postCategoryId: number | null;
  postUpcommingCategoryId: number | null;
  setPostUpcommingCategoryId: (id: number | null) => void;
}
const CategoryFilterList: FC<CategoryFilterListProps> = (props) => {
  // const [id, setId] = useState<number | null>(null);
  // const context = useContext(MyContext);
  // if (context === null) {
  //   // Handle the case when the context is null, e.g., provide a default value or throw an error.
  //   return null;
  // }
  // const { postUpcommingCategoryId, setPostUpcommingCategoryId } = context;
  const getPostCategoryId = async (Id: number | null) => {
    props.setPostUpcommingCategoryId(Id);
    // await dispatch(getPostCategoryIdById({ Id })).then((res) => {
    //   console.log(JSON.stringify(res, null, 2));
    // });
  };

  return (
    <View style={{ marginVertical: 15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.postCategoryList?.data
            .filter((category) => category?.isActive === true)
            .map((category, index) => (
              <TouchableOpacity
                onPress={() => {
                  getPostCategoryId(category?.id);
                }}
                key={index}
                style={{
                  borderWidth: 3,
                  borderColor: '#FF930F',
                  backgroundColor:
                    props.postUpcommingCategoryId === category?.id
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
                        props.postUpcommingCategoryId === category?.id
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
