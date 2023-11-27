import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPostCategory,
  getAllPostReOpen,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import { imageNotFoundUri } from '../../../../utils/images';
import CategoryFilterList from '../../../../components/collaborator/Event/ReOpenEvent/CategoryFilterList';
import PostDto from '../../../../dtos/collaborator/post.dto';
import { COLORS } from '../../../../constants/Colors';
import { MyContext } from '../../../../context/stateContext';
import Search from '../../../../components/collaborator/Event/ReOpenEvent/Search';
import FilterModalButton, {
  DataFilterReOpen,
} from '../../../../components/collaborator/Event/ReOpenEvent/FilterModalButton';
import { DataPost } from '../../../../models/collaborator/dataPost.model';
import RegistrationEmpty from '../../../../components/shared/Empty/RegistrationEmpty';

const PAGE_SIZE_DEFAULT = 20;
const EventReOpen: FC = () => {
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
  const list = useAppSelector((state) => state.collab_post.postReOpen.data);
  const page = useAppSelector(
    (state) => state.collab_post.postReOpen.metadata.page
  );
  const total = useAppSelector(
    (state) => state.collab_post.postReOpen.metadata.total
  );
  const postLoading = useAppSelector((state) => state.collab_post.loading);

  const handleNavigate = (item: DataPost) => {
    navigation.navigate('HOME_EVENT_DETAIL', { item });
  };

  // Pagination scroll
  const [postReOpenCategoryDes, setPostReOpenCategoryDes] = useState<
    string | null
  >('All');
  // Handle submit filter data
  const [dataFilterReOpen, setDataFilterReOpen] =
    useState<DataFilterReOpen | null>({
      postReOpenCategoryId: null,
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
        getAllPostReOpen({
          Page: 1,
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: dataFilterReOpen?.postReOpenCategoryId,
          Sort: dataFilterReOpen?.sort,
          Order: dataFilterReOpen?.order,
          Search: dataFilterReOpen?.searchText,
          CreateAtStart: dataFilterReOpen?.createAtStart,
          CreateAtEnd: dataFilterReOpen?.createAtEnd,
          DateFromStart: dataFilterReOpen?.dateFromStart,
          DateFromEnd: dataFilterReOpen?.dateFromEnd,
        })
      ).then((res) => {
        console.log('===============Data==============');
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // Sử dụng useEffect để gọi API khi postReOpenCategoryId thay đổi
  useEffect(() => {
    fetchPost();
    fetchPostCategory();
  }, [dataFilterReOpen]);

  useEffect(() => {}, []);

  // Refresh function fetchPost()
  const [isRefresh, setIsRefresh] = useState(false);
  const onRefresh = useCallback(async () => {
    setLoading(true);
    setIsRefresh(true);
    setTimeout(() => {
      setDataFilterReOpen({
        postReOpenCategoryId: null,
        createAtStart: null,
        createAtEnd: null,
        dateFromStart: null,
        dateFromEnd: null,
        searchText: null,
        sort: 'CreateAt',
        order: 'DESCENDING',
      });
      setPostReOpenCategoryDes('All');
      setLoading(false);
      setIsRefresh(false);
    }, 500);
  }, []);
  // Render header JSX
  const renderListHeader = () => {
    return <View style={{ marginHorizontal: 15, marginTop: 10 }}></View>;
  };
  const renderListEmptyComponent = () => {
    return <RegistrationEmpty />;
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
        getAllPostReOpen({
          Page: Number(page),
          PageSize: PAGE_SIZE_DEFAULT,
          PostCategoryId: dataFilterReOpen?.postReOpenCategoryId,
          Sort: dataFilterReOpen?.sort,
          Order: dataFilterReOpen?.order,
          Search: dataFilterReOpen?.searchText,
          CreateAtStart: dataFilterReOpen?.createAtStart,
          CreateAtEnd: dataFilterReOpen?.createAtEnd,
          DateFromStart: dataFilterReOpen?.dateFromStart,
          DateFromEnd: dataFilterReOpen?.dateFromEnd,
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
          status={post?.status ? String(post?.status) : 'No Status'}
          timeAgo={post?.createAt ? post?.createAt : ''}
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
            postReOpenCategoryDes={postReOpenCategoryDes}
            total={total ? Number(total) : 0}
            dataFilterReOpen={dataFilterReOpen}
            setDataFilterReOpen={setDataFilterReOpen}
            isRefresh={isRefresh}
          />
          <FilterModalButton
            dataFilterReOpen={dataFilterReOpen}
            setDataFilterReOpen={setDataFilterReOpen}
            isRefresh={isRefresh}
          />
        </View>
        <CategoryFilterList
          postCategoryList={postCategoryList}
          dataFilterReOpen={dataFilterReOpen}
          setDataFilterReOpen={setDataFilterReOpen}
          postReOpenCategoryDes={postReOpenCategoryDes}
          setPostReOpenCategoryDes={setPostReOpenCategoryDes}
        />
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

export default EventReOpen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
