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

const useHome = () => {
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
      console.log('Alo: ', JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    console.log('tao vô đây 1');
    fetchHomePostUpcomming();
  }, [textSearch]);

  const fetchHomePostReOpen = async () => {
    const params = {
      Page: 1,
      PageSize: 50,
      Sort: 'CreateAt',
      search: textSearch,
    };
    await dispatch(getHomePostReOpen(params)).then((res) => {
      // console.log('Alo: ', JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    console.log('tao vô đây 1');
    fetchHomePostReOpen();
  }, []);

  const checkInPostRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.checkInPostRegistration
  );
  const fetchCheckInPostRegistration = async () => {
    await dispatch(getAllCheckInPostRegistration({}));
  };
  useEffect(() => {
    console.log('tao vô đây 2');

    fetchCheckInPostRegistration();
  }, []);

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
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTextSearch(null);
    fetchHomePostUpcomming();
    fetchHomePostReOpen();
    fetchCheckInPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
  const state = { refreshing, textSearch };
  const props = {
    checkInPostRegistrationList,
    postHomeUpcommingList,
    postHomeReOpenList,
    control,
  };
  return { handlers, state, props };
};

export default useHome;
