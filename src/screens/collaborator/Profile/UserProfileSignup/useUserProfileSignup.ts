import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { AccountInfoSignup } from '../../../../models/collaborator/account.model';
import { formatToISO_8601 } from '../../../../utils/formats';
import { useForm } from 'react-hook-form';
import {
  collab_getUserInfo,
  collab_signupAccountInformation,
} from '../../../../features/collaborator/collab.accountSlice';
import { useAppSelector } from '../../../../app/hooks';
import useCustomToast from '../../../../utils/toasts';
import ErrorStatus from '../../../../dtos/collaborator/response/errorStatus.dto';

const useUserProfileSignup = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(
    (state) => state.collab_account.userInfo?.data
  );
  const fetchUserInfo = async () => {
    try {
      await dispatch(collab_getUserInfo());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
  });

  const { showToastSuccess, showToastError } = useCustomToast();
  const onSubmit = async (data: AccountInfoSignup) => {
    const AccountInfoSignup = {
      identityNumber: data.identityNumber,
      idStudent: data.idStudent,
      fbUrl: data.fbUrl,
      address: data.address,
      identityIssueDate: formatToISO_8601(data.identityIssueDate),
      placeOfIssue: data.placeOfIssue,
      identityFrontImg: data.identityFrontImg,
      identityBackImg: data.identityBackImg,
      taxNumber: data.taxNumber,
    } as AccountInfoSignup;
    console.log(JSON.stringify(AccountInfoSignup, null, 2));

    await dispatch(collab_signupAccountInformation(AccountInfoSignup)).then(
      (res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === 'fulfilled') {
          showToastSuccess('Update account information success!');
        } else {
          const resData = res?.payload as ErrorStatus;
          showToastError(resData?.message);
        }
      }
    );
  };

  const state = { userInfo };
  const handlers = { onSubmit, handleSubmit, setValue };
  const props = { control, errors };
  return {
    state,
    handlers,
    props,
  };
};

export default useUserProfileSignup;
