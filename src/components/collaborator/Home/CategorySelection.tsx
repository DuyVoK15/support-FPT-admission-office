import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { Image } from '@rneui/base';
import { useAppDispatch } from '../../../app/store';
import { getAllPostCategory } from '../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../app/hooks';
import { COLORS } from '../../../constants/Colors';

interface CategorySelectionProps {
  setValue?: any;
}
const CategorySelection = (props: CategorySelectionProps) => {
  const dispatch = useAppDispatch();
  const postCategoryList = useAppSelector(
    (state) => state.collab_post.postCategory
  );

  const [isPriorityChecked, setIsPriorityChecked] = useState<boolean[]>(
    Array(postCategoryList?.data?.length).fill(false)
  );

  // const [categorySelected, setCategorySelected] = useState<string>();
  const handleSelectedPostCategory = (index: number, category: number | null) => {
    props.setValue("PostCategoryId",category); 
    // setCategorySelected(category);
    const updatedStatus = Array(postCategoryList?.data?.length).fill(false);
    updatedStatus[index] = true;
    setIsPriorityChecked(updatedStatus);
  };

  const fetchPostCategory = async () => {
    await dispatch(getAllPostCategory()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    fetchPostCategory();
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {postCategoryList &&
        postCategoryList?.data?.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              handleSelectedPostCategory(
                index,
                category?.id
              )
            }
            style={{ marginRight: 20, alignItems: 'center' }}
          >
            <View
              style={{
                borderRadius: 100,
                backgroundColor: COLORS.super_dark_orange,
              }}
            >
              {isPriorityChecked[index] ? (
                <Image
                  style={{ width: 70, height: 70, borderRadius: 100 }}
                  source={require('../../../assets/Images/ic_fpt_university_hcm.jpg')}
                />
              ) : (
                <Image
                  style={{ width: 70, height: 70, borderRadius: 100 }}
                  source={require('../../../assets/Images/ic_fpt_university_hcm_disable.jpg')}
                />
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontFamily: FONTS_FAMILY.Ubuntu_700Bold,
                  fontSize: 16,
                  color: isPriorityChecked[index]
                    ? COLORS.super_dark_orange
                    : 'grey',
                }}
              >
                {category ? category?.postCategoryDescription : 'No'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({});
