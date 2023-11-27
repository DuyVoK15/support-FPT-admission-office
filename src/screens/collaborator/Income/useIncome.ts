import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store';
import {
  getAllReport,
  getRegistrationByReport,
} from '../../../features/collaborator/collab.reportSlice';
import { useAppSelector } from '../../../app/hooks';

const useIndex = () => {
  const dispatch = useAppDispatch();

  const reportList = useAppSelector((state) => state.collab_report.report);
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

  const handlers = { getRegistrationByReportId };
  const props = {};
  const stateRedux = { reportList };
  return {
    handlers,
    props,
    stateRedux,
  };
};

export default useIndex;
