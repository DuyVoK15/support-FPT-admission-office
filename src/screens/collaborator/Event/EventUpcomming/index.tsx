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
  searchPostByPostCode,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import DataPost, { Data } from '../../../../models/collaborator/dataPost.model';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import UpcommingPagination from '../../../../components/shared/Pagination/UpcommingPagination';
import { imageNotFoundUri } from '../../../../utils/images';
import CategoryFilterList from '../../../../components/collaborator/Event/UpcommingEvent/CategoryFilterList';
import PostDto from '../../../../dtos/collaborator/post.dto';
import { COLORS } from '../../../../constants/Colors';
import { MyContext } from '../../../../context/stateContext';

const PAGE_SIZE_DEFAULT = 30;
const EventUpcomming: FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const context = useContext(MyContext);
  if (context === null) {
    // Handle the case when the context is null, e.g., provide a default value or throw an error.
    return null;
  }

  const { postUpcommingCategoryId, setPostUpcommingCategoryId } = context;

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
  const list = useAppSelector((state) => state.collab_post.postUpcomming.data);
  const page = useAppSelector(
    (state) => state.collab_post.postUpcomming.metadata.page
  );
  const total = useAppSelector(
    (state) => state.collab_post.postUpcomming.metadata.total
  );
  const postLoading = useAppSelector((state) => state.collab_post.loading);
  // const SIZE_PAGING = 8;
  // const [totalPost, setTotalPost] = useState<number | null>();
  // const remainder = Number(postList?.metadata?.total) % SIZE_PAGING;
  // const numberPage =
  //   remainder === 0
  //     ? Number(postList?.metadata?.total) / SIZE_PAGING
  //     : Math.floor(Number(postList?.metadata?.total) / SIZE_PAGING) + 1;
  // const pageList = Array.from(
  //   { length: numberPage },
  //   (_, index: number) => index + 1
  // );

  // const [isChecked, setIsChecked] = useState<boolean[]>(
  //   Array(100).fill(false)
  // );

  // const fetchInitialPost = async () => {
  //   await dispatch(getAllPostUpcomming({ Page: 1, PageSize: SIZE_PAGING })).then((res) => {
  //     console.log(JSON.stringify(res, null, 2));
  //   });
  // };
  // const handleInitialSelectedItem = () => {
  //   const updatedStatus = Array(100).fill(false);
  //   updatedStatus[1] = true;
  //   setIsChecked(updatedStatus);
  // };

  // const handleSelectedItem = (index: number) => {
  //   const updatedStatus = Array(100).fill(false);
  //   updatedStatus[index] = true;
  //   setIsChecked(updatedStatus);
  //   fetchPostByPage(index);
  // };

  // const fetchPostByPage = async (page: number) => {
  //   await dispatch(getAllPostUpcomming({ Page: page, PageSize: SIZE_PAGING, Sort: "CreateAt" })).then((res) => {
  //     console.log(JSON.stringify(res, null, 2));
  //   });
  // };

  // useEffect(() => {
  //   fetchInitialPost().then(()=> {
  //     setTotalPost(postList?.metadata?.total)
  //     handleInitialSelectedItem();
  //   });
  // },[]);

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
        getAllPostUpcomming({
          Page: 1,
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: postUpcommingCategoryId,
          Sort: 'CreateAt',
        })
      );
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu', error);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // Sử dụng useEffect để gọi API khi postCategoryId thay đổi
  useEffect(() => {
    // Check
    fetchPost();
  }, [refreshing, postUpcommingCategoryId]);

  useEffect(() => {
    fetchPostCategory();
  }, []);

  // Refresh fetchPost()
  const onRefresh = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      console.log('id: ', postUpcommingCategoryId);
      setRefreshing(!refreshing);

      setPostUpcommingCategoryId(null);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEndReached = async () => {
    console.log('vô đây');

    if ((Number(page) - 1) * PAGE_SIZE_DEFAULT < Number(total)) {
      await dispatch(
        getAllPostUpcomming({
          Page: Number(page),
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: postUpcommingCategoryId,
          Sort: 'CreateAt',
        })
      );
    }
  };

  const renderLoadingFooter = () => {
    return (Number(page) - 1) * PAGE_SIZE_DEFAULT < Number(total) ? (
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
    return <Item post={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEventThrottle={16}
        data={list}
        // extraData={list}
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
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <ActivityIndicator size={'large'} color={'purple'} />
        }
        ListHeaderComponent={
          <CategoryFilterList
            postCategoryList={postCategoryList}
            postCategoryId={postCategoryId}
          />
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

export default EventUpcomming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
