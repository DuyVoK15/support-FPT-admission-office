// import {
//     ActivityIndicator,
//     FlatList,
//     RefreshControl,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//   } from 'react-native';
//   import React, { FC, useCallback, useEffect, useState } from 'react';
//   import { useNavigation } from '@react-navigation/native';
//   import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
//   import { useAppDispatch } from '../../../../app/store';
//   import {
//     getAllPost,
//     getAllPostUpcomming,
//     searchPostByPostCode,
//   } from '../../../../features/collaborator/collab.postSlice';
//   import { useAppSelector } from '../../../../app/hooks';
//   import DataPost, { Data } from '../../../../models/collaborator/dataPost.model';
//   import { cardGap } from '../../../../constants/Demesions';
//   import { format_ISODateString_To_DayOfWeekMonthDDYYYY } from '../../../../utils/formats';
//   import EventCardWrap from '../../../../components/collaborator/Home/EventCardWrap';
//   import UpcommingPagination from '../../../../components/shared/Pagination/UpcommingPagination';
//   import { imageNotFoundUri } from '../../../../utils/images';
//   import CategoryFilterList from '../../../../components/collaborator/Event/ReOpenEvent/CategoryFilterList';
//   import PostDto from '../../../../dtos/collaborator/post.dto';
  
//   const EventReOpen: FC = () => {
//     const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
//     const dispatch = useAppDispatch();
//     const list = useAppSelector((state) => state.collab_post.postReOpen.data);
//     const page = useAppSelector(
//       (state) => state.collab_post.postReOpen.metadata.page
//     );
//     console.log("object",page)
//     const total = useAppSelector(
//       (state) => state.collab_post.postReOpen.metadata.total
//     );
   
//     const [textSearch, setTextSearch] = useState<string>('');
//     const handleSearchPost = async (postCode: string) => {
//       await dispatch(searchPostByPostCode(postCode)).then((res) => {
//         // console.log(JSON.stringify(res, null, 2));
//       });
//     };
//     const handleNavigate = (item: Data) => {
//       navigation.navigate('HOME_EVENT_DETAIL', { item });
//     };
  
//     // Pagination scroll
  
//     const fetchPost = async () => {
//       try {
//         await dispatch(
//           getAllPostUpcomming({
//             Page: 1,
//             PageSize: 6,
//             Sort: 'CreateAt',
//           })
//         );
//       } catch (error) {
//         console.log('Lỗi khi tải dữ liệu', error);
//       }
//     };
  
//     // Sử dụng useEffect để gọi API khi currentPage thay đổi
//     useEffect(() => {
//       fetchPost();
//     }, []);
  
//     // Refresh fetch
//     const [loading, setLoading] = useState<boolean>(false);
//     const onRefresh = useCallback(() => {
//       setLoading(true);
//       setTimeout(() => {
//         fetchPost();
//         setLoading(false);
//       }, 1000);
//     }, []);
  
//     const handleEndReached = async () => {
//       console.log('Vô endreached');
//       if((Number(page) - 1) * 6 < Number(total)) {
//         await dispatch(
//           getAllPostUpcomming({ Page: Number(page), PageSize: 6, Sort: 'CreateAt' })
//         );
//       }
      
//     };
  
//     const renderLoadingFooter = () => {
//       return (Number(page) - 1) * 6 < Number(total) ? (
//         <View>
//           <ActivityIndicator size={'large'} color={'red'} />
//         </View>
//       ) : null;
//     };
  
//     type ItemProps = {
//       post: Data;
//     };
//     const Item = ({ post }: ItemProps) => {
//       return (
//         <View>
//           <EventCardWrap
//             onPress={() => handleNavigate(post)}
//             imageUrl={post?.postImg ? post?.postImg : imageNotFoundUri}
//             title={
//               post?.postCategory?.postCategoryDescription
//                 ? post?.postCategory?.postCategoryDescription
//                 : ''
//             }
//             dateTime={format_ISODateString_To_DayOfWeekMonthDDYYYY(
//               post?.dateFrom ? post?.dateFrom : ''
//             )}
//             schoolName={post?.postPositions[0]?.schoolName}
//             totalRegisterAmount={
//               post?.registerAmount ? String(post?.registerAmount) : '0'
//             }
//             totalAmountPosition={
//               post?.totalAmountPosition ? String(post?.totalAmountPosition) : '0'
//             }
//             status={post?.status}
//           />
//         </View>
//       );
//     };
  
//     const renderItem = ({ item }: { item: Data }) => {
//       return <Item post={item} />;
//     };
  
//     return (
//       <View style={styles.container}>
//         <FlatList
//           scrollEventThrottle={16}
//           data={list}
//           renderItem={renderItem}
//           numColumns={2}
//           columnWrapperStyle={{
//             flex: 1,
//             marginVertical: 5,
//             marginHorizontal: 15,
//             flexDirection: 'row',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             columnGap: cardGap - 2,
//             // rowGap: cardGap - 2,
//           }}
//           keyExtractor={(item, index) => index.toString()}
//           refreshControl={
//             <RefreshControl refreshing={loading} onRefresh={onRefresh} />
//           }
          
//           ListFooterComponent={renderLoadingFooter}
//           onEndReached={handleEndReached}
//         />
  
//         {/* <ScrollView
//           scrollEventThrottle={16}
//           onScroll={handleScroll}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         > */}
//         {/* <CategoryFilterList />
//           <View
//             style={{
//               flex: 1,
//               marginVertical: 5,
//               marginHorizontal: 15,
//               flexDirection: 'row',
//               flexWrap: 'wrap',
//               justifyContent: 'center',
//               columnGap: cardGap - 2,
//               rowGap: cardGap - 2,
//             }}
//           >
//             {postList ? (
//               postList?.data?.map((post, index) => (
//                 <View key={index}>
//                   <EventCardWrap
//                     onPress={() => handleNavigate(post)}
//                     imageUrl={post?.postImg ? post?.postImg : imageNotFoundUri}
//                     title={
//                       post?.postCategory?.postCategoryDescription
//                         ? post?.postCategory?.postCategoryDescription
//                         : ''
//                     }
//                     dateTime={format_ISODateString_To_DayOfWeekMonthDDYYYY(
//                       post?.dateFrom ? post?.dateFrom : ''
//                     )}
//                     schoolName={post?.postPositions[0]?.schoolName}
//                     totalRegisterAmount={
//                       post?.registerAmount ? String(post?.registerAmount) : '0'
//                     }
//                     totalAmountPosition={
//                       post?.totalAmountPosition
//                         ? String(post?.totalAmountPosition)
//                         : '0'
//                     }
//                     status={post?.status}
//                   />
//                 </View>
//               ))
//             ) : (
//               <View />
//             )}
//           </View> */}
  
//         {/* {postList?.metadata && (
//             <View>
//               <UpcommingPagination
//                 isChecked={isChecked}
//                 pageList={pageList}
//                 handleSelectedItem={handleSelectedItem}
                
//               />
//             </View>
//           )} */}
//         {/* {loading && <ActivityIndicator size="large" color="#0000ff" />}
//         </ScrollView> */}
//       </View>
//     );
//   };
  
//   export default EventReOpen;
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: 'white',
//     },
//   });