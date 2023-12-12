import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useAppDispatch } from '../../../../app/store';
import { REGISTRATION_STATUS_ENUM } from '../../../../enums/collaborator/RegistrationStatus';
import {
  cancelPostRegistration,
  getAllPostRegistration,
  getAllPostRegistration_Pending,
} from '../../../../features/collaborator/collab.postRegistrationSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useCustomToast from '../../../../utils/toasts';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import DataViewPostRegistration from '../../../../models/collaborator/postRegistration.model';
import { ROUTES } from '../../../../constants/Routes';

export type dataFilterRegistration = {
  Sort: string | null;
  Order: string | null;
  RegistrationStatus: number[] | [];
};
const useIndex = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const { showToastSuccess, showToastError } = useCustomToast();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationPending
  );
  const [dataFilterRegis_Pending, setDataFilterRegis_Pending] =
    useState<dataFilterRegistration | null>({
      Sort: 'CreateAt',
      Order: 'DESCENDING',
      RegistrationStatus: [REGISTRATION_STATUS_ENUM.PENDING],
    });
  const fetchPostRegistration = async () => {
    await dispatch(
      getAllPostRegistration_Pending({
        Page: 1,
        PageSize: 10000,
        Sort: dataFilterRegis_Pending?.Sort,
        Order: dataFilterRegis_Pending?.Order,
        RegistrationStatus: dataFilterRegis_Pending?.RegistrationStatus,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPostRegistration();
    }, [])
  );

  const cancelRegistrationById = async (id: number | null) => {
    await dispatch(
      cancelPostRegistration({
        postRegistrationId: id,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === 'fulfilled') {
        showToastSuccess('Cancel successful!');
        navigation.navigate(ROUTES.REGISTRATION_CANCELLED);
      } else {
        const resRejected = res?.payload as ErrorStatus;
        showToastError(resRejected?.message);
      }
    });
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handlers = {
    onRefresh,
    cancelRegistrationById,
  };
  const state = { refreshing };
  const stateRedux = { postRegistrationList };

  return {
    handlers,
    state,
    stateRedux,
  };
};

export default useIndex;
