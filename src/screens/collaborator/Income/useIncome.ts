import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import {
  getAllReport,
  getRegistrationByReport,
} from '../../../features/collaborator/collab.reportSlice';
import { useAppSelector } from '../../../app/hooks';

export interface DataFilterReport {
  Sort: string | null;
  Order: string | null;
  CreateAtStart: string | null;
  CreateAtEnd: string | null;
}
const useIndex = () => {
  const dispatch = useAppDispatch();

  const reportList = useAppSelector((state) => state.collab_report.report);
  const totalSalary = useAppSelector(
    (state) => state.collab_report.totalSalary
  );
  const [dataFilterReport, setDataFilterReport] =
    useState<DataFilterReport | null>(
      {
        Sort: 'CreateAt',
        Order: 'DESCENDING',
        CreateAtStart: null,
        CreateAtEnd: null,
      } || null
    );
  const fetchReport = async () => {
    await dispatch(
      getAllReport({
        Page: 1,
        PageSize: 100,
        Sort: dataFilterReport?.Sort,
        Order: dataFilterReport?.Order,
        CreateAtStart: dataFilterReport?.CreateAtStart,
        CreateAtEnd: dataFilterReport?.CreateAtEnd,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useEffect(() => {
    fetchReport();
  }, [dataFilterReport]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDataFilterReport({
        Sort: 'CreateAt',
        Order: 'DESCENDING',
        CreateAtStart: null,
        CreateAtEnd: null,
      });
      setRefreshing(false);
    }, 500);
  }, []);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const showRegistration = () => {
    setIsVisible(true);
  };
  const hideRegistration = () => {
    setIsVisible(false);
  };
  const incomeRegistration = useAppSelector(
    (state) => state.collab_report.reportRegistration
  );
  const getRegistrationByReportId = async (params: {
    accountReportId: number;
  }) => {
    await dispatch(getRegistrationByReport(params)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
    showRegistration();
  };

  const handlers = {
    getRegistrationByReportId,
    onRefresh,
    showRegistration,
    hideRegistration,
  };
  const props = {};
  const state = { refreshing, dataFilterReport, isVisible };
  const setState = { setDataFilterReport };
  const stateRedux = { reportList, incomeRegistration, totalSalary };
  return {
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useIndex;
