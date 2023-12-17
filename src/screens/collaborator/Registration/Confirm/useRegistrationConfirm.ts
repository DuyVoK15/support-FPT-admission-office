import { REGISTRATION_STATUS_ENUM } from '../../../../enums/collaborator/RegistrationStatus';
import { View, Text, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useAppSelector } from '../../../../app/hooks';
import {
  cancelPostRegistration,
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../../type';
import {
  getLastCurrentLocation,
  getLocation,
} from '../../../../../useCurrentLocation';
import { updateCurrentLocation } from '../../../../features/collaborator/collab.locationSlice';

const useIndex = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();

  const postRegistrationList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirmed
  );
  const currentLocation = useAppSelector(
    (state) => state.collab_location.currentLocation
  );
  const dispatch_getAllPostRegistration_Confirmed = async () => {
    return await dispatch(
      getAllPostRegistration_Confirmed({
        Page: 1,
        PageSize: 10000,
        RegistrationStatus: [
          REGISTRATION_STATUS_ENUM.CONFIRM,
          REGISTRATION_STATUS_ENUM.CHECKIN,
        ],
        Sort: 'ConfirmTime',
        Order: 'DESCENDING',
      })
    );
  };

  const dispatch_getAllPostRegistration_Completed = async () => {
    return await dispatch(
      getAllPostRegistration_Completed({
        RegistrationStatus: [REGISTRATION_STATUS_ENUM.CHECKOUT],
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
  const [currentPosition, setCurrentPosition] =
    useState<Location.LocationObject | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { showToastError, showToastSuccess } = useCustomToast();

  // const delay = (timeInMilliseconds: number) => {
  //   return new Promise<null>((resolve) => {
  //     setTimeout(() => resolve(null), timeInMilliseconds);
  //   });
  // };
  // Check in function
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const checkInPostRegistation = async (postRegistrationId: number | null) => {
    setLoadingLocation(true);
    try {
      if (!currentLocation) {
        console.log('Can not get your location!');
        setLoadingLocation(false);
        showToastError('Error when get your current location! Try again!');
      } else {
        await dispatch(
          checkInPostRegistration({
            postRegistrationId: postRegistrationId,
            longtitude: currentLocation?.coords?.longitude,
            latitude: currentLocation?.coords?.latitude,
          })
        ).then(async (res) => {
          setLoadingLocation(false);
          console.log(JSON.stringify(res, null, 2));
          if (res?.meta?.requestStatus === 'fulfilled') {
            const resFulfilledData = res.payload as CheckAttendanceResponse;
            fetchPostRegistration();
            showToastSuccess('Check In Successful!');
          } else {
            const resRejectedData = res.payload as ErrorStatus;

            switch (resRejectedData?.errorCode) {
              default:
                showToastError(resRejectedData?.message);
            }
          }
        });
      }
      setLoadingLocation(false);
      console.log(
        currentLocation?.coords?.latitude +
          ' ' +
          currentLocation?.coords?.longitude
      );
    } catch (error) {
      setLoadingLocation(false);
      console.log(error);
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
          navigation.navigate('REGISTRATION_COMPLETED');
        } else {
          const resRejectedData = res.payload as ErrorStatus;

          switch (resRejectedData?.errorCode) {
            default:
              showToastError(resRejectedData?.message);
          }
        }
      }
    );
  };

  const cancelRegistrationById = async (id: number | null) => {
    await dispatch(
      cancelPostRegistration({
        postRegistrationId: id,
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      if (res?.meta?.requestStatus === 'fulfilled') {
        showToastSuccess('Send request cancel successful!');
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
    }, 1000);
  }, []);

  const handlers = {
    onRefresh,
    checkInPostRegistation,
    checkOutPostRegistation,
    cancelRegistrationById,
  };
  const state = { refreshing, loadingLocation };
  const props = { postRegistrationList };
  const setState = {};
  const stateRedux = { postRegistrationList };
  return {
    handlers,
    state,
    setState,
    stateRedux,
    props,
  };
};

export default useIndex;
