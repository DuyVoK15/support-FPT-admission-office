
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPost,
  getAllPostCategory,
  getAllPostUpcomming,
  getPostCategoryIdById,
  getPostReOpen,
  searchPostByPostCode,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import DataPost, { Data } from '../../../../models/collaborator/dataPost.model';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import UpcommingPagination from '../../../../components/shared/Pagination/UpcommingPagination';
import { imageNotFoundUri } from '../../../../utils/images';
import CategoryFilterList from '../../../../components/collaborator/Event/ReOpenEvent/CategoryFilterList';
import PostDto from '../../../../dtos/collaborator/post.dto';
import { COLORS } from '../../../../constants/Colors';
import { MyContext } from '../../../../context/stateContext';

const EventReOpen: FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  
  const context = useContext(MyContext);
  if (context === null) {
    // Handle the case when the context is null, e.g., provide a default value or throw an error.
    return null;
  }

  const { postReOpenCategoryId, setPostReOpenCategoryId } = context;
  
  const dispatch = useAppDispatch();
  const postCategoryId = useAppSelector(
    (state) => state.collab_post.postCategoryId
  );
  const postCategoryList = useAppSelector(
    (state) => state.collab_post.postCategory
  );
  const fetchPostCategory = async () => {
    try {
      await dispatch(getAllPostCategory());
    } catch (error) {
      console.log(error);
    }
  };

  const list = useAppSelector((state) => state.collab_post.postReOpen.data);
  const page = useAppSelector(
    (state) => state.collab_post.postReOpen.metadata.page
  );
  const total = useAppSelector(
    (state) => state.collab_post.postReOpen.metadata.total
  );
  const postLoading = useAppSelector((state) => state.collab_post.loading);
  const [textSearch, setTextSearch] = useState<string>('');
  const handleSearchPost = async (postCode: string) => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      // console.log(JSON.stringify(res, null, 2));
    });
  };
  const handleNavigate = (item: Data) => {
    navigation.navigate('HOME_EVENT_DETAIL', { item });
  };

  // Pagination scroll

  const fetchPost = async () => {
    try {
      await dispatch(
        getPostReOpen({
          Page: 1,
          PageSize: 6,
          PostCategoryId: postReOpenCategoryId,
          Sort: 'CreateAt',
        })
      );
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu', error);
    }
  };

  // Sử dụng useEffect để gọi API khi postCategoryId thay đổi
  useEffect(() => {
    // Check
    fetchPost();
  }, [postReOpenCategoryId]);

  useEffect(() => {
    fetchPostCategory();
  }, []);

  // Refresh fetchPost()
  const [loading, setLoading] = useState<boolean>(false);
  const onRefresh = useCallback(async () => {
    await dispatch(getPostCategoryIdById({ Id: null }));
    setPostReOpenCategoryId(null);
    setLoading(true);
    setTimeout(() => {
      console.log('id: ', postReOpenCategoryId);
      fetchPost();
      setLoading(false);
    }, 1000);
  }, []);

  const handleEndReached = async () => {
    console.log("vô đây")

    if ((Number(page) - 1) * 6 < Number(total)) {
      await dispatch(
        getPostReOpen({
          Page: Number(page),
          PageSize: 6,
          PostCategoryId: postReOpenCategoryId,
          Sort: 'CreateAt',
        })
      );
    }
  };

  const renderLoadingFooter = () => {

    return (Number(page) - 1) * 6 < Number(total) ? (
      <View>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    ) : null;
  };

  type ItemProps = {
    post: Data;
  };
  const Item = ({ post }: ItemProps) => {
    return (
      <View>
        <EventCardWrap
          onPress={() => handleNavigate(post)}
          imageUrl={post?.postImg ? post?.postImg : imageNotFoundUri}
          title={
            post?.postCategory?.postCategoryDescription
              ? post?.postCategory?.postCategoryDescription
              : ''
          }
          dateTime={format_ISODateString_To_DayOfWeekMonthDDYYYY(
            post?.dateFrom ? post?.dateFrom : ''
          )}
          schoolName={post?.postPositions[0]?.schoolName}
          totalRegisterAmount={
            post?.registerAmount ? String(post?.registerAmount) : '0'
          }
          totalAmountPosition={
            post?.totalAmountPosition ? String(post?.totalAmountPosition) : '0'
          }
          status={post?.status}
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: Data }) => {
    return  <Item post={item} />;
  };

  return (
    <View style={styles.container}>
      
        <FlatList
          scrollEventThrottle={16}
          data={list}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: cardGap - 2,
            // rowGap: cardGap - 2,
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl  refreshing={loading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<ActivityIndicator size={'large'} color={'purple'} />}
          ListHeaderComponent={
            <CategoryFilterList postCategoryList={postCategoryList} postCategoryId={postCategoryId} />
          }
          ListFooterComponent={renderLoadingFooter}
          onEndReached={handleEndReached}
          // onEndReachedThreshold={0.5}
        />

      {/* {postList?.metadata && (
          <View>
            <UpcommingPagination
              isChecked={isChecked}
              pageList={pageList}
              handleSelectedItem={handleSelectedItem}
              
            />
          </View>
        )} */}
      {/* {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView> */}
    </View>
  );
};

export default EventReOpen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});