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
import { DataFilterUpcomming } from './FilterModalButton';

interface CategoryFilterListProps {
  postCategoryList: ViewPostCategoryResponse;
  // postCategoryId: number | null;
  dataFilterUpcomming: DataFilterUpcomming | null;
  setDataFilterUpcomming: React.Dispatch<
    React.SetStateAction<DataFilterUpcomming | null>
  >;
  postUpcommingCategoryDes: string | null;
  setPostUpcommingCategoryDes: (des: string | null) => void;
  isRefresh?: boolean;
}
const CategoryFilterList: FC<CategoryFilterListProps> = (Props) => {
  // const [id, setId] = useState<number | null>(null);
  // const context = useContext(MyContext);
  // if (context === null) {
  //   // Handle the case when the context is null, e.g., provide a default value or throw an error.
  //   return null;
  // }
  // const { postUpcommingCategoryId, setPostUpcommingCategoryId } = context;
  const getPostCategoryId = async (Id: number | null, Des: string | null) => {
    Props.setDataFilterUpcomming((prevFilter) => ({
      postUpcommingCategoryId: Id,
      createAtStart: prevFilter?.createAtStart || null,
      createAtEnd: prevFilter?.createAtEnd || null,
      dateFromStart: prevFilter?.dateFromStart || null,
      dateFromEnd: prevFilter?.dateFromEnd || null,
      searchText: prevFilter?.searchText || null,
      sort: prevFilter?.sort || null,
      order: prevFilter?.order || null,
    }));
    Props.setPostUpcommingCategoryDes(Des);
    // await dispatch(getPostCategoryIdById({ Id })).then((res) => {
    //   console.log(JSON.stringify(res, null, 2));
    // });
  };
  // console.log(props.dataFilterUpcomming);
  // Handle reset State
  const handleResetState = () => {
  };

  useEffect(() => {
    handleResetState();
  }, [Props.isRefresh]);
  // Return main component JSX
  return (
    <View style={{ marginVertical: 15 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Props.postCategoryList?.data
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
                  Props.dataFilterUpcomming?.postUpcommingCategoryId ===
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
                      Props.dataFilterUpcomming?.postUpcommingCategoryId ===
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
