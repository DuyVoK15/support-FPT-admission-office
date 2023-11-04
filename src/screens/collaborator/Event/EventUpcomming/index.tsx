import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPost,
  getAllPostUpcomming,
  searchPostByPostCode,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import DataPost, { Data } from '../../../../models/collaborator/dataPost.model';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import UpcommingPagination from '../../../../components/shared/Pagination/UpcommingPagination';
import { imageNotFoundUri } from '../../../../utils/images';
import CategoryFilterList from '../../../../components/collaborator/Home/CategoryFilterList';
import PostDto from '../../../../dtos/collaborator/post.dto';

const EventUpcomming: FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const postList = useAppSelector((state) => state.collab_post.postUpcomming);

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
  const [postData, setPostData] = useState<{
    postList: DataPost | [];
    totalPage: number | null;
    isLoading: boolean;
  }>({
    postList: [],
    totalPage: 1,
    isLoading: true,
  });
  const initialPage = 1;
  const defaultPageSize = 10;
  const initialPagination = {
    page: initialPage,
    pageSize: defaultPageSize,
    isLoading: false,
  };
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
    isLoading: boolean;
  }>(initialPagination);

  const fetchPost = useCallback(async () => {
    console.log('==============================');
    console.log(pagination);
    console.log(postData.totalPage);
    console.log('==============================');
    try {
      await dispatch(
        getAllPostUpcomming({
          Page: pagination.page,
          PageSize: pagination.pageSize,
          Sort: 'CreateAt',
        })
      ).then((res) => {
        const postDto = res.payload as PostDto;
        setPostData({
          postList:
            pagination.page === 1
              ? postDto?.data
              : ([...postData.postList, ...postDto?.data] as DataPost),
          totalPage:
            Number(postDto?.metadata?.total) % defaultPageSize === 0
              ? Number(postDto?.metadata?.total) / defaultPageSize
              : Math.floor(Number(postDto?.metadata?.total) / defaultPageSize) +
                1,
          isLoading: false,
        });
        // console.log('kaka', JSON.stringify(postDto.data));
      });
      console.log(postData.postList.length);
    } catch (error) {
      console.log('Lỗi khi tải dữ liệu', error);
    }
  }, [pagination]);

  // Sử dụng useEffect để gọi API khi currentPage thay đổi
  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const onRefresh = () => {
    setPagination({
      ...pagination,
      page: initialPage,
      pageSize: defaultPageSize,
      isLoading: true,
    });
    setPostData({
      ...postData,
      isLoading: true,
    });
    setTimeout(() => {
      setPagination({
        ...pagination,
        page: initialPage,
        pageSize: defaultPageSize,
        isLoading: false,
      });
      setPostData({
        ...postData,
        isLoading: false,
      });
    }, 1000);
  };

  const handleEndReached = () => {
    console.log('Vô endreached');
    if (pagination.page < Number(postData?.totalPage)) {
      pagination.page++;
      setPagination({
        ...pagination,
        page: pagination.page,
        pageSize: defaultPageSize,
        isLoading: true,
      });
      setPostData({
        ...postData,
        isLoading: true,
      });
    }
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
        data={postData?.postList}
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
          <RefreshControl
            refreshing={postData.isLoading}
            onRefresh={onRefresh}
          />
        }
        onEndReached={handleEndReached}
      />

      {/* <ScrollView
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > */}
      {/* <CategoryFilterList />
        <View
          style={{
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: cardGap - 2,
            rowGap: cardGap - 2,
          }}
        >
          {postList ? (
            postList?.data?.map((post, index) => (
              <View key={index}>
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
                    post?.totalAmountPosition
                      ? String(post?.totalAmountPosition)
                      : '0'
                  }
                  status={post?.status}
                />
              </View>
            ))
          ) : (
            <View />
          )}
        </View> */}

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
