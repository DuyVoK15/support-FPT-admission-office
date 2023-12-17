import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPostCategory,
  getAllPostUpcomming,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import { ScreenWidth, cardGap } from '../../../../constants/Demesions';
import {
  formatDateToDDMMYYYY,
  format_ISODateString_To_DayOfWeekMonthDDYYYY,
  timeAgo,
} from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import { imageNotFoundUri } from '../../../../utils/images';
import CategoryFilterList from '../../../../components/collaborator/Event/UpcommingEvent/CategoryFilterList';
import { DataPost } from '../../../../models/collaborator/dataPost.model';
import Search from '../../../../components/collaborator/Event/UpcommingEvent/Search';
import FilterModalButton, {
  DataFilterUpcomming,
} from '../../../../components/collaborator/Event/UpcommingEvent/FilterModalButton';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';

// Variables
const PAGE_SIZE_DEFAULT = 20;
// Main Function
const EventUpcomming: FC = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const dispatch = useAppDispatch();

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

  const handleNavigate = (post: DataPost) => {
    navigation.navigate('HOME_EVENT_DETAIL', { post });
  };

  // Pagination scroll
  const [postUpcommingCategoryDes, setPostUpcommingCategoryDes] = useState<
    string | null
  >('All');
  // Handle submit filter data
  const [dataFilterUpcomming, setDataFilterUpcomming] =
    useState<DataFilterUpcomming | null>({
      postUpcommingCategoryId: null,
      createAtStart: null,
      createAtEnd: null,
      dateFromStart: null,
      dateFromEnd: null,
      searchText: null,
      sort: 'CreateAt',
      order: 'DESCENDING',
    });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch post / Call disptach to redux Call API
  const fetchPost = async () => {
    try {
      await dispatch(
        getAllPostUpcomming({
          Page: 1,
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: dataFilterUpcomming?.postUpcommingCategoryId,
          Sort: dataFilterUpcomming?.sort,
          Order: dataFilterUpcomming?.order,
          Search: dataFilterUpcomming?.searchText,
          CreateAtStart: dataFilterUpcomming?.createAtStart,
          CreateAtEnd: dataFilterUpcomming?.createAtEnd,
          DateFromStart: dataFilterUpcomming?.dateFromStart,
          DateFromEnd: dataFilterUpcomming?.dateFromEnd,
        })
      ).then((res) => {
        console.log('===============Data==============');
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // Sử dụng useEffect để gọi API khi postUpcommingCategoryId thay đổi
  useFocusEffect(
    React.useCallback(() => {
      // Đây là nơi bạn muốn chạy lại các logic hoặc useEffect khi tab này được focus
      fetchPost();
      // Thực hiện các hành động cần thiết khi tab này được chọn
      // Ví dụ: gọi các hàm, cập nhật state, hoặc fetch dữ liệu mới,...
    }, [dataFilterUpcomming])
  );

  useEffect(() => {
    fetchPostCategory();
  }, []);
  const [isRefresh, setIsRefresh] = useState(false);
  // Refresh function fetchPost()
  const onRefresh = useCallback(async () => {
    setLoading(true);
    setIsRefresh(true);
    setTimeout(() => {
      setDataFilterUpcomming({
        postUpcommingCategoryId: null,
        createAtStart: null,
        createAtEnd: null,
        dateFromStart: null,
        dateFromEnd: null,
        searchText: null,
        sort: 'CreateAt',
        order: 'DESCENDING',
      });
      setPostUpcommingCategoryDes('All');
      setIsRefresh(false);
      setLoading(false);
    }, 500);
  }, []);

  // Render Empty JSX
  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
  };
  // Render header JSX
  const renderListHeader = () => {
    return <View style={{ marginHorizontal: 15, marginTop: 10 }}></View>;
  };
  // Render footer loader JSX
  const renderLoadingFooter = () => {
    return (Number(page) - 1) * PAGE_SIZE_DEFAULT < Number(total) ? (
      <View>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    ) : null;
  };
  // Scroll to end to load more next page
  const handleEndReached = async () => {
    if ((Number(page) - 1) * PAGE_SIZE_DEFAULT < Number(total)) {
      await dispatch(
        getAllPostUpcomming({
          Page: Number(page),
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: dataFilterUpcomming?.postUpcommingCategoryId,
          Sort: dataFilterUpcomming?.sort,
          Search: dataFilterUpcomming?.searchText,
          CreateAtStart: dataFilterUpcomming?.createAtStart,
          CreateAtEnd: dataFilterUpcomming?.createAtEnd,
          DateFromStart: dataFilterUpcomming?.dateFromStart,
          DateFromEnd: dataFilterUpcomming?.dateFromEnd,
        })
      );
    }
  };
  // Custom Item JSX
  const Item = ({ post }: { post: DataPost }) => {
    return (
      <View>
        <EventCardWrap
          onPress={() => handleNavigate(post)}
          imageUrl={
            post?.postImg ? post?.postImg : imageNotFoundUri
          }
          title={
            post?.postCategory?.postCategoryDescription
              ? post?.postCategory?.postCategoryDescription
              : 'No value'
          }
          dateTime={
            post?.dateFrom
              ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                  post?.dateFrom
                )
                ? format_ISODateString_To_DayOfWeekMonthDDYYYY(
                    post?.dateFrom
                  )
                : 'No date'
              : 'No date'
          }
          schoolName={post?.postPositions?.[0]?.schoolName ? post?.postPositions?.[0]?.schoolName : 'No value'}
          totalRegisterAmount={
            post?.registerAmount
              ? String(post?.registerAmount)
              : '0'
          }
          totalAmountPosition={
            post?.totalAmountPosition
              ? String(post?.totalAmountPosition)
              : '0'
          }
          status={post?.status ? post?.status : 0}
          timeAgo={
            post?.createAt
              ? timeAgo({ dateProp: post?.createAt })
                ? timeAgo({ dateProp: post?.createAt })
                : 'No time'
              : 'No Time'
          }
        />
      </View>
    );
  };
  // Use useMemo to prevent re-render Item when excecute some thing in Component
  const memoizedRenderItem = useMemo(() => {
    // console.log('Re-render nè 1');

    const renderItem = ({ item }: { item: DataPost }) => {
      // console.log('Re-render nè 1');

      return <Item post={item} />;
    };
    return renderItem;
  }, [list]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <Search
            postUpcommingCategoryDes={postUpcommingCategoryDes}
            total={total ? Number(total) : 0}
            dataFilterUpcomming={dataFilterUpcomming}
            setDataFilterUpcomming={setDataFilterUpcomming}
            isRefresh={isRefresh}
          />
          <FilterModalButton
            dataFilterUpcomming={dataFilterUpcomming}
            setDataFilterUpcomming={setDataFilterUpcomming}
            isRefresh={isRefresh}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <CategoryFilterList
            postCategoryList={postCategoryList}
            dataFilterUpcomming={dataFilterUpcomming}
            setDataFilterUpcomming={setDataFilterUpcomming}
            postUpcommingCategoryDes={postUpcommingCategoryDes}
            setPostUpcommingCategoryDes={setPostUpcommingCategoryDes}
            isRefresh={isRefresh}
          />
        </View>
      </View>
      <FlatList
        scrollEventThrottle={16}
        data={list}
        // extraData={list}
        renderItem={memoizedRenderItem}
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
        ListEmptyComponent={renderListEmptyComponent}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderLoadingFooter}
        onEndReached={handleEndReached}
        // onEndReachedThreshold={0.5}
      />
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
