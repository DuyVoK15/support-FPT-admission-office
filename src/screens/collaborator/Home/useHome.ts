import { View, Text } from 'react-native';
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

const useHome = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 3 });
    setLocation(location);

    // Use reverse geocoding to get city name
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
  };

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
      await fetchHomePostUpcomming();
      await fetchHomePostReOpen();
      await fetchCheckInPostRegistration();
      await getCurrentLocation();
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
    await fetchHomePostUpcomming();
    await fetchHomePostReOpen();
    await fetchCheckInPostRegistration();
    await getCurrentLocation();
    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  const handlers = {
    handleSearchPost,
    onRefresh,
    setTextSearch,
    setRefreshing,
    onSubmit,
    handleSubmit,
    setValue,
  };
  const state = { refreshing, textSearch, cityName };
  const props = {
    checkInPostRegistrationList,
    postHomeUpcommingList,
    postHomeReOpenList,
    control,
  };
  return { handlers, state, props };
};

export default useHome;
