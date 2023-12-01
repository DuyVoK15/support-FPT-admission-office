import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import { getAllApplication } from '../../../../features/collaborator/collab.applicationSlice';
import { useAppSelector } from '../../../../app/hooks';

const useViewApplication = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const applicationList = useAppSelector(
    (state) => state.collab_application.application
  );
  const fetchApplication = async () => {
    try {
      await dispatch(getAllApplication()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchApplication();
    setRefreshing(false);
  }, []);

  const handlers = { onRefresh };
  const props = { navigation };
  const state = { refreshing };
  const setState = { setRefreshing };
  const stateRedux = { applicationList };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useViewApplication;
