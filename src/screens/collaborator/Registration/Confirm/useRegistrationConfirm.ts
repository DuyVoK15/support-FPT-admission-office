import { RegistrationStatus } from '../../../../enums/collaborator/RegistrationStatus';
import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import {
  getAllPostRegistration,
  getAllPostRegistration_Completed,
  getAllPostRegistration_Confirmed,
} from '../../../../features/collaborator/collab.postRegistrationSlice';
import { CheckInParam } from '../../../../dtos/collaborator/parameter/checkAttendance.dto';
import {
  checkInPostRegistration,
  checkOutPostRegistration,
} from '../../../../features/collaborator/collab.checkAttendanceSlice';
import * as Location from 'expo-location';
import { CheckAttendanceResponse } from '../../../../dtos/collaborator/response/checkAttendance.dto';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';
import useCustomToast from '../../../../utils/toasts';
import { useFocusEffect } from '@react-navigation/native';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirmed
  );

  const dispatch_getAllPostRegistration_Confirmed = async () => {
    return await dispatch(
      getAllPostRegistration_Confirmed({
        RegistrationStatus: [
          RegistrationStatus.CONFIRM,
          RegistrationStatus.CHECKIN,
        ],
        Sort: 'CreateAt',
      })
    );
  };

  const dispatch_getAllPostRegistration_Completed = async () => {
    return await dispatch(
      getAllPostRegistration_Completed({
        RegistrationStatus: [RegistrationStatus.CHECKOUT],
        Sort: 'CreateAt',
      })
    );
  };

  const fetchPostRegistration = async () => {
    dispatch_getAllPostRegistration_Confirmed().then((res) => {
      console.log('data', JSON.stringify(res, null, 2));
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { showToastError, showToastSuccess } = useCustomToast();

  // Check in function
  const checkInPostRegistation = async (postRegistrationId: number | null) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    console.log(location?.coords?.latitude + ' ' + location?.coords?.longitude);
    if (location) {
      await dispatch(
        checkInPostRegistration({
          postRegistrationId: postRegistrationId,
          longtitude: location?.coords?.longitude,
          latitude: location?.coords?.latitude,
        })
      ).then(async (res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          const resFulfilledData = res.payload as CheckAttendanceResponse;
          showToastSuccess('Check In Successful!');
          dispatch_getAllPostRegistration_Confirmed(); // Call dispatch update List
        } else {
          const resRejectedData = res.payload as ErrorStatus;
          switch (resRejectedData?.statusCode) {
            case 400:
              switch (resRejectedData?.errorCode) {
                case 400:
                  showToastError(resRejectedData?.message);
                  break;
                case 4001:
                  showToastError(resRejectedData?.message);
                  break;
                case 4002:
                  showToastError(resRejectedData?.message);
                  break;
                case 4003:
                  showToastError(resRejectedData?.message);
                  break;
                case 4004:
                  showToastError(resRejectedData?.message);
                  break;
                case 4005:
                  showToastError(resRejectedData?.message);
                  break;
                case 4006:
                  showToastError(resRejectedData?.message);
                  break;
                case 4007:
                  showToastError(resRejectedData?.message);
                  break;
                case 4008:
                  showToastError(resRejectedData?.message);
                  break;
                default:
                  showToastError('Unknown error!');
              }
              break;
            case 401:
              showToastError('You not permission!');
            case 404:
              showToastError('404 NOT FOUND!');

            default:
              showToastError('Undefined error!');
          }
        }
      });
    } else {
      console.log('Can not get your location!');
    }
  };

  // Check out function
  const checkOutPostRegistation = async (postRegistrationId: number | null) => {
    await dispatch(checkOutPostRegistration({ postRegistrationId })).then(
      async (res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          const resFulfilledData = res.payload as CheckAttendanceResponse;
          showToastSuccess('Check Out Successful!');
          dispatch_getAllPostRegistration_Confirmed();
          dispatch_getAllPostRegistration_Completed();
        } else {
          const resRejectedData = res.payload as ErrorStatus;
          switch (resRejectedData?.statusCode) {
            case 400:
              switch (resRejectedData?.errorCode) {
                case 4001:
                  showToastError(resRejectedData?.message);
                  break;
                case 4002:
                  showToastError(resRejectedData?.message);
                  break;
                case 4003:
                  showToastError(resRejectedData?.message);
                  break;
                case 4004:
                  showToastError(resRejectedData?.message);
                  break;
                case 4005:
                  showToastError(resRejectedData?.message);
                  break;
                case 4006:
                  showToastError(resRejectedData?.message);
                  break;
                case 4006:
                  showToastError(resRejectedData?.message);
                  break;
                case 4007:
                  showToastError(resRejectedData?.message);
                  break;
                case 4008:
                  showToastError(resRejectedData?.message);
                  break;
                default:
                  showToastError('Unknown error!');
              }
              break;
            case 401:
              showToastError('You not permission!');
            case 404:
              showToastError('404 NOT FOUND!');

            default:
              showToastError('Undefined error!');
          }
        }
      }
    );
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPostRegistration();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handlers = {
    onRefresh,
    checkInPostRegistation,
    checkOutPostRegistation,
  };
  const state = { refreshing };
  const props = { postRegistrationList };

  return {
    handlers,
    state,
    props,
  };
};

export default useIndex;
