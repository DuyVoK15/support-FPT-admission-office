import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { useForm } from 'react-hook-form';
import { UserInfoUpdate } from '../../../../models/collaborator/userInfo.model';
import { loadStatusCode, updateProfile } from '../../../../features/collaborator/collab.accountSlice';
import { useAppSelector } from '../../../../app/hooks';
import { collab_getUserInfo } from '../../../../features/collaborator/collab.authSlice';
import { formatDateToDDMMYYYY, formatToDate } from '../../../../utils/formats';

const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.collab_auth.userInfo);
  const statusCode = useAppSelector((state) => state.collab_account.statusCode);

  const fetchUserInfo = async () => {
    await dispatch(collab_getUserInfo());
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.name ? userInfo?.name : '',
      phone: userInfo?.phone ? userInfo?.phone : '',
      dateOfBirth: userInfo?.dateOfBirth
        ? formatToDate({ dateProp: userInfo?.dateOfBirth })
        : '',
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
          ? formatToDate({
              dateProp: userInfo?.accountInformation?.identityIssueDate,
            })
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
    const AccountInfoUpdate = {
      name: data.name,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      imgUrl: data.imgUrl,
      accountInformation: data.accountInformation,
    } as UserInfoUpdate;
    console.log(JSON.stringify(AccountInfoUpdate, null, 2));
    await dispatch(updateProfile(AccountInfoUpdate)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });

    await dispatch(collab_getUserInfo()).catch((error) => {
      console.log('alo', error);
    });
    setTimeout(async () => {
      await dispatch(loadStatusCode()).catch((error) => {
        console.log('alo', error);
      });
    }, 4000)
  
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

  const handleConfirmDateOfBirthPicker = (date: any) => {
    console.log('A date has been picked: ', formatDateToDDMMYYYY(date));
    handlers.setValue('dateOfBirth', formatDateToDDMMYYYY(date));
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
    console.log('A date has been picked: ', formatDateToDDMMYYYY(date));
    handlers.setValue(
      'accountInformation.identityIssueDate',
      formatDateToDDMMYYYY(date)
    );
    hideIdentityIssueDatePicker();
  };

  const handlers = { onSubmit, handleSubmit, setValue, onRefresh };
  const props = { control, refreshing, statusCode };
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
