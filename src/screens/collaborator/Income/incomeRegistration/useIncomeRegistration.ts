import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import { useAppDispatch } from '../../../../app/store';
import { getRegistrationByReport } from '../../../../features/collaborator/collab.reportSlice';
import { useAppSelector } from '../../../../app/hooks';

const useIncomeRegistration = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const route = useRoute();
  const { id } = route?.params as {
    id: number;
  };

  const incomeRegistration = useAppSelector(
    (state) => state.collab_report.reportRegistration
  );
  const fetchIncomeRegistration = async () => {
    try {
      await dispatch(
        getRegistrationByReport({ accountReportId: id ?? null })
      ).then((res) => console.log(JSON.stringify(res, null, 2)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncomeRegistration();
  }, []);

  const handlers = {};
  const props = { navigation };
  const state = {};
  const setState = {};
  const stateRedux = { incomeRegistration };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useIncomeRegistration;
