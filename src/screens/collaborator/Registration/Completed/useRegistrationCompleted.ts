import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import {
  getAllPostRegistration,
  getAllPostRegistration_Completed,
} from '../../../../features/collaborator/collab.postRegistrationSlice';
import { REGISTRATION_STATUS_ENUM } from '../../../../enums/collaborator/RegistrationStatus';
import { useFocusEffect } from '@react-navigation/native';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationCompleted
  );
  const fetchPostRegistration = async () => {
    await dispatch(
      getAllPostRegistration_Completed({
        Page: 1,
        PageSize: 10000,
        RegistrationStatus: [REGISTRATION_STATUS_ENUM.CHECKOUT],
        Sort: 'CreateAt',
        Order: 'DESCENDING'
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  // useEffect(() => {
  //   fetchPostRegistration();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Đây là nơi bạn muốn chạy lại các logic hoặc useEffect khi tab này được focus
      fetchPostRegistration();
      // Thực hiện các hành động cần thiết khi tab này được chọn
      // Ví dụ: gọi các hàm, cập nhật state, hoặc fetch dữ liệu mới,...
    }, [])
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlers = { onRefresh };
  const state = { refreshing };
  const props = { postRegistrationList };

  return {
    handlers,
    state,
    props,
  };
};

export default useIndex;
