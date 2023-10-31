import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import { getAllPostRegistration } from '../../../features/collaborator/collab.postRegistrationSlice';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistration
  );
  const fetchPostRegistration = async () => {
    await dispatch(getAllPostRegistration()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    fetchPostRegistration();
  }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const [isShowDetail, setIsShowDetail] = useState<boolean[]>(
    Array(20).fill(false)
  );
  const toggleDetail = (index: number) => {
    const updatedStatus = [...isShowDetail];
    updatedStatus[index] = !updatedStatus[index];
    setIsShowDetail(updatedStatus);
  };

  const handlers = { onRefresh, toggleDetail };
  const state = { refreshing, isShowDetail };
  const props = { postRegistrationList };

  return {
    handlers,
    state,
    props,
  };
};

export default useIndex;
