import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import {
  getAllPost,
  getAllPostMissingSlot,
  searchPostByPostCode,
} from '../../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../../app/hooks';
import { cardGap } from '../../../../constants/Demesions';
import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
import MissingSlotPagination from '../../../../components/shared/Pagination/MissingSlotPagination';
import { imageNotFoundUri } from '../../../../utils/images';
import { DataPost } from '../../../../models/collaborator/dataPost.model';

const EventMissingSlot = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const imgUndefind =
    'https://dci.edu.vn/wp-content/themes/consultix/images/no-image-found-360x250.png';
  const [textSearch, setTextSearch] = useState<string>('');
  const dispatch = useAppDispatch();
  const SIZE_PAGING = 8;
  const fetchPost = async () => {
    const params = {
      Page: 1,
      PageSize: SIZE_PAGING,
    };
    await dispatch(getAllPostMissingSlot(params)).then((res) => {
      // console.log('Alo: ', JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const postList = useAppSelector((state) => state.collab_post.postMissingSlot);
  const handleSearchPost = async (postCode: string) => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      // console.log(JSON.stringify(res, null, 2));
    });
  };
  const handleNavigate = (item: DataPost) => {
    navigation.navigate('HOME_EVENT_DETAIL', { item });
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPost();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            postList?.data
              ?.filter(
                (post) => post?.registerAmount < post?.totalAmountPosition
              )
              ?.map((post, index) => (
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
                  />
                </View>
              ))
          ) : (
            <View />
          )}
        </View>
        {postList?.metadata && (
          <View>
            <MissingSlotPagination
              size={SIZE_PAGING}
              total={Number(postList?.metadata?.total)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default EventMissingSlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
