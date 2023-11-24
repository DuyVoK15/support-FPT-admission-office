import { View, Text } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../../../app/store';
import { AccountInfoSignup } from '../../../../models/collaborator/account.model';
import { formatToISO_8601 } from '../../../../utils/formats';
import { useForm } from 'react-hook-form';
import { collab_signupAccountInformation } from '../../../../features/collaborator/collab.accountSlice';

const useUserProfileSignup = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identityNumber: '',
      idStudent: '',
      fbUrl: '',
      address: '',
      identityIssueDate: '',
      placeOfIssue: '',
      identityFrontImg: '',
      identityBackImg: '',
      taxNumber: '',
    },
  });
  
  const onSubmit = async (data: AccountInfoSignup) => {
    const AccountInfoSignup = {
      identityNumber: data.identityNumber,
      idStudent: data.idStudent,
      fbUrl: data.fbUrl,
      address: data.address,
      identityIssueDate: formatToISO_8601({ dateProp: data.identityIssueDate }),
      placeOfIssue: data.placeOfIssue,
      identityFrontImg: data.identityFrontImg,
      identityBackImg: data.identityBackImg,
      taxNumber: data.taxNumber,
    } as AccountInfoSignup;
    console.log(JSON.stringify(AccountInfoSignup, null, 2));

    await dispatch(collab_signupAccountInformation(AccountInfoSignup)).then(
      (res) => {
        console.log(JSON.stringify(res, null, 2));
      }
    );
  };
  const handlers = { onSubmit, handleSubmit, setValue };
  const props = { control,errors };
  return {
    handlers,
    props,
  };
};

export default useUserProfileSignup;
