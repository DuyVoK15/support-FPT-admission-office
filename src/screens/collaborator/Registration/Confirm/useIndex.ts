import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import { getAllPostRegistration } from '../../../../features/collaborator/collab.postRegistrationSlice';
import { RegistrationStatus } from '../../../../enums/collaborator/RegistrationStatus';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirm
  );
  const fetchPostRegistration = async () => {
    await dispatch(getAllPostRegistration({Status: RegistrationStatus.CONFIRM})).then((res) => {
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
