import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useForm } from 'react-hook-form';
import { UserInfoUpdate } from '../../../../models/collaborator/userInfo.model';
import { useAppSelector } from '../../../../app/hooks';

import { formatDateToDDMMYYYY, formatToDate } from '../../../../utils/formats';
import {
  collab_getUserInfo,
  collab_loadStatusCode,
  collab_updateProfile,
} from '../../../../features/collaborator/collab.accountSlice';
import useCustomToast from '../../../../utils/toasts';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';

const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(
    (state) => state.collab_account.userInfo?.data
  );
  const { showToastError, showToastSuccess } = useCustomToast();

  const fetchUserInfo = async () => {
    try {
      await dispatch(collab_getUserInfo()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchUserInfo();
  // }, []);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserInfo();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      name: userInfo?.name ? userInfo?.name : '',
      phone: userInfo?.phone ? userInfo?.phone : '',
      dateOfBirth: userInfo?.dateOfBirth ? userInfo?.dateOfBirth : '',
      imgUrl: userInfo?.imgUrl ? userInfo?.imgUrl : '',
      accountInformation: {
        identityNumber: userInfo?.accountInformation?.identityNumber
          ? userInfo?.accountInformation?.identityNumber
          : '',
        idStudent: userInfo?.accountInformation?.idStudent
          ? userInfo?.accountInformation?.idStudent
          : '',
        fbUrl: userInfo?.accountInformation?.fbUrl
          ? userInfo?.accountInformation?.fbUrl
          : '',
        address: userInfo?.accountInformation?.address
          ? userInfo?.accountInformation?.address
          : '',
        identityIssueDate: userInfo?.accountInformation?.identityIssueDate
          ? userInfo?.accountInformation?.identityIssueDate
          : '',
        placeOfIssue: userInfo?.accountInformation?.placeOfIssue
          ? userInfo?.accountInformation?.placeOfIssue
          : '',
        identityFrontImg: userInfo?.accountInformation?.identityFrontImg
          ? userInfo?.accountInformation?.identityFrontImg
          : '',
        identityBackImg: userInfo?.accountInformation?.identityBackImg
          ? userInfo?.accountInformation?.identityBackImg
          : '',
        taxNumber: userInfo?.accountInformation?.taxNumber
          ? userInfo?.accountInformation?.taxNumber
          : '',
      },
    },
  });

  const onSubmit = async (data: UserInfoUpdate) => {
    // console.log('object');
    // const AccountInfoUpdate = {
    //   name: data.name,
    //   phone: data.phone,
    //   dateOfBirth: data.dateOfBirth,
    //   imgUrl: data.imgUrl,
    //   accountInformation: data.accountInformation,
    // } as UserInfoUpdate;
    try {
      await dispatch(collab_updateProfile(data)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Update profile successfully!');
        } else {
          const resRejectedData = res?.payload as ErrorStatus;
          showToastError(resRejectedData?.message); 
        }
      });
    } catch (error) {
      console.log(error);
    }

    // await dispatch(collab_getUserInfo()).catch((error) => {
    //   console.log('alo', error);
    // });
  };

  // Date Of Birth
  const [isDateOfBirthPickerVisible, setIsDateOfBirthPickerVisible] =
    useState<boolean>(false);

  const showDateOfBirthPicker = () => {
    setIsDateOfBirthPickerVisible(true);
  };

  const hideDateOfBirthPicker = () => {
    setIsDateOfBirthPickerVisible(false);
  };

  const handleConfirmDateOfBirthPicker = (date: Date) => {
    console.log('A date has been picked: ', date);
    handlers.setValue('dateOfBirth', date.toISOString());
    hideDateOfBirthPicker();
  };

  // IdentityIssueDate
  const [
    isIdentityIssueDatePickerVisible,
    setIsIdentityIssueDatePickerVisible,
  ] = useState<boolean>(false);

  const showIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(true);
  };

  const hideIdentityIssueDatePicker = () => {
    setIsIdentityIssueDatePickerVisible(false);
  };

  const handleConfirmIdentityIssueDatePicker = (date: Date) => {
    console.log('A date has been picked: ', date);
    handlers.setValue(
      'accountInformation.identityIssueDate',
      date.toISOString()
    );
    hideIdentityIssueDatePicker();
  };

  const handlers = { onSubmit, handleSubmit, setValue, onRefresh };
  const props = { control, refreshing, isDirty, isValid };
  const datePickerHandlers = {
    showDateOfBirthPicker,
    hideDateOfBirthPicker,
    handleConfirmDateOfBirthPicker,
    showIdentityIssueDatePicker,
    hideIdentityIssueDatePicker,
    handleConfirmIdentityIssueDatePicker,
  };
  const state = {
    isDateOfBirthPickerVisible,
    isIdentityIssueDatePickerVisible,
  };
  const setState = {};
  return {
    handlers,
    props,
    datePickerHandlers,
    state,
    setState,
  };
};

export default useUserProfile;
