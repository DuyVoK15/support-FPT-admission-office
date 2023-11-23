import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useAppDispatch } from '../../../../app/store';
import { RegistrationStatus } from '../../../../enums/collaborator/RegistrationStatus';
import {
  getAllPostRegistration,
  getAllPostRegistration_Pending,
} from '../../../../features/collaborator/collab.postRegistrationSlice';
import { useFocusEffect } from '@react-navigation/native';

export type dataFilterRegistration = {
  Sort: string | null;
  Order: string | null;
  RegistrationStatus: number[] | [];
};
const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationPending
  );
  const [dataFilterRegis_Pending, setDataFilterRegis_Pending] =
    useState<dataFilterRegistration | null>({
      Sort: 'CreateAt',
      Order: 'DESCENDING',
      RegistrationStatus: [RegistrationStatus.PENDING],
    });
  const fetchPostRegistration = async () => {
    await dispatch(
      getAllPostRegistration_Pending({
        Sort: dataFilterRegis_Pending?.Sort,
        Order: dataFilterRegis_Pending?.Order,
        RegistrationStatus: dataFilterRegis_Pending?.RegistrationStatus,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  // useEffect(() => {

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
