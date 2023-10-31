import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store';
import {
  getAllReport,
  getRegistrationByReport,
} from '../../../features/collaborator/collab.reportSlice';

const useIndex = () => {
  const dispatch = useAppDispatch();


  const fetchReport = async () => {
    await dispatch(getAllReport()).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const getRegistrationByReportId = async (params: {
    accountReportId: number;
  }) => {
    await dispatch(getRegistrationByReport(params)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  const handlers = {getRegistrationByReportId};
  const props = {};
  const state = {};
  return {
    handlers,
    props,
    state,
  };
};

export default useIndex;
