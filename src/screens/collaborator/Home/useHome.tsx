import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import {
  getHomePostReOpen,
  getHomePostUpcomming,
  searchPostByPostCode,
} from '../../../features/collaborator/collab.postSlice';
import { useAppSelector } from '../../../app/hooks';
import { getAllCheckInPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import * as Location from 'expo-location';
import { getLocation } from '../../../../useCurrentLocation';
import { DataPost } from '../../../models/collaborator/dataPost.model';
import {
  format_ISODateString_To_MonthDD,
  format_Time_To_HHss,
  timeAgo,
} from '../../../utils/formats';
import EventCard from '../../../components/collaborator/Home/EventCard';
import { ROUTES } from '../../../constants/Routes';
import { imageNotFoundUri } from '../../../utils/images';
import { updateCurrentLocation } from '../../../features/collaborator/collab.locationSlice';

const useHome = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>();
  const currentLocation = useAppSelector(
    (state) => state.collab_location.currentLocation
  );
  useEffect(() => {
    console.log("BỊ GỌI")
    let subscription: { remove: any };

    const startWatchingPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds (can be adjusted)
          distanceInterval: 10, // Minimum distance 10(in meters) for an update
        },
        async (newPosition) => {
          console.log(newPosition);
          await dispatch(updateCurrentLocation(newPosition));
          if (newPosition) {
            const { latitude, longitude } = newPosition.coords;
            const address = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });
            if (address && address.length > 0) {
              setCityName(address[0].region + ', ' + address[0].country);
            }
            console.log(JSON.stringify(address, null, 2));
          }
        }
      );
      console.log('object');
    };

    startWatchingPosition();

    // Clean up subscription on unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  const getCurrentLocation = useCallback(async () => {
    // Use reverse geocoding to get city name
    console.log('a', location);
    if (location) {
      const { latitude, longitude } = location.coords;
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (address && address.length > 0) {
        setCityName(address[0].region + ', ' + address[0].country);
      }
      console.log(JSON.stringify(address, null, 2));
    }
  }, [location]);

  const [textSearch, setTextSearch] = useState<string | null>('');
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = (data: { search: string }) => {
    setTextSearch(data?.search);
  };

  const dispatch = useAppDispatch();
  const fetchHomePostUpcomming = async () => {
    const params = {
      Page: 1,
      PageSize: 50,
      Sort: 'CreateAt',
      search: textSearch,
    };
    await dispatch(getHomePostUpcomming(params)).then((res) => {
      // console.log('Alo: ', JSON.stringify(res, null, 2));
    });
  };
  // useEffect(() => {
  //   const fetch = async () => {
  //     console.log('Gọi 2');
  //     await fetchHomePostReOpen();
  //   };
  //   fetch(); CHƯƠNG TRÌNH HƯỚNG NGHIỆP
  // }, []);
  useEffect(() => {
    const fetch = async () => {
      // console.log('Gọi 1');
      // await getCurrentLocation();
      await fetchHomePostUpcomming();
      await fetchHomePostReOpen();
      await fetchCheckInPostRegistration();
    };
    fetch();
  }, [textSearch, navigation]);

  const fetchHomePostReOpen = async () => {
    const params = {
      Page: 1,
      PageSize: 50,
      Sort: 'CreateAt',
      search: textSearch,
    };
    await dispatch(getHomePostReOpen(params)).then((res) => {
      // console.log('Alo: ', res?.payload);
    });
  };

  const checkInPostRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.checkInPostRegistration
  );
  const fetchCheckInPostRegistration = async () => {
    await dispatch(getAllCheckInPostRegistration({})).then((res) => {
      console.log('Alo: check ');
    });
  };
  // useEffect(() => {
  //   const fetch = async () => {
  //     console.log('Gọi 3');
  //     await fetchCheckInPostRegistration();
  //   };
  //   fetch();
  // }, []);

  const postHomeUpcommingList = useAppSelector(
    (state) => state.collab_post.postHomeUpcomming
  );
  const postHomeReOpenList = useAppSelector(
    (state) => state.collab_post.postHomeReOpen
  );
  const handleSearchPost = async (postCode: string) => {
    await dispatch(searchPostByPostCode(postCode)).then((res) => {
      // console.log(JSON.stringify(res, null, 2));
    });
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTextSearch(null);
    setValue('search', '');
    // await getCurrentLocation();
    await fetchHomePostUpcomming();
    await fetchHomePostReOpen();
    await fetchCheckInPostRegistration();

    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  const renderItemUpcomming = ({ item }: { item: DataPost }) => {
    return (
      <View style={{ marginTop: 5, marginBottom: 10, marginHorizontal: 15 }}>
        <EventCard
          onPress={() =>
            navigation.navigate(ROUTES.HOME_EVENT_DETAIL, {
              post: item,
            })
          }
          imageUrl={item?.postImg ? item?.postImg : imageNotFoundUri}
          timeAgo={
            item?.createAt
              ? timeAgo({
                  dateProp: item?.createAt,
                })
                ? timeAgo({
                    dateProp: item?.createAt,
                  }) ?? 'No value'
                : 'No value'
              : 'No value'
          }
          titleEvent={
            item?.postCategory?.postCategoryDescription
              ? item?.postCategory?.postCategoryDescription
              : 'No value'
          }
          schoolName={
            item?.postPositions?.[0]?.schoolName
              ? item?.postPositions?.[0]?.schoolName
              : 'No value'
          }
          location={
            item?.postPositions?.[0]?.location
              ? item?.postPositions?.[0]?.location
              : 'No value'
          }
          dateFrom={
            item?.dateFrom
              ? format_ISODateString_To_MonthDD(item?.dateFrom)
                ? format_ISODateString_To_MonthDD(item?.dateFrom) ?? 'No value'
                : 'No value'
              : 'No value'
          }
          timeFrom={
            item?.timeFrom
              ? format_Time_To_HHss(item?.timeFrom)
                ? format_Time_To_HHss(item?.timeFrom) ?? 'No value'
                : 'No value'
              : 'No value'
          }
        />
      </View>
    );
  };

  const handlers = {
    handleSearchPost,
    onRefresh,
    setTextSearch,
    setRefreshing,
    onSubmit,
    handleSubmit,
    setValue,
  };
  const state = { refreshing, textSearch, cityName, currentLocation };
  const props = {
    checkInPostRegistrationList,
    postHomeUpcommingList,
    postHomeReOpenList,
    control,
    renderItemUpcomming,
  };
  return { handlers, state, props };
};

export default useHome;
