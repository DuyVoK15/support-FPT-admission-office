import { View, Text } from 'react-native'
import React from 'react'
import { useAppDispatch } from '../../../../app/store';
import { AccountInfoSignup } from '../../../../models/collaborator/account.model';
import { formatToISO_8601 } from '../../../../utils/formats';
import { signupAccountInformation } from '../../../../features/collaborator/collab.accountSlice';
import { useForm } from 'react-hook-form';

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
    //   const array = [
    //     {
    //       name: "identityNumber",
    //       placeholder: "identityNumber"
    //     },
    //     {
    //       name: "idStudent",
    //       placeholder: "idStudent"
    //     },
    //     {
    //       name: "fbUrl",
    //       placeholder: "fbUrl"
    //     },
    //     {
    //       name: "address",
    //       placeholder: "address"
    //     },
    //     {
    //       name: "identityIssueDate",
    //       placeholder: "identityIssueDate"
    //     },
    //     {
    //       name: "placeOfIssue",
    //       placeholder: "placeOfIssue"
    //     },
    //     {
    //       name: "identityFrontImg",
    //       placeholder: "identityFrontImg"
    //     },
    //     {
    //       name: "identityBackImg",
    //       placeholder: "identityBackImg"
    //     },
    //     {
    //       name: "taxNumber",
    //       placeholder: "taxNumber"
    //     },
    //   ]
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
        await dispatch(signupAccountInformation(AccountInfoSignup));
    console.log(JSON.stringify(AccountInfoSignup, null, 2))
      };
const handlers = {onSubmit, handleSubmit, setValue}
const props = {control}
  return {
    handlers,
    props
  }
}

export default useUserProfileSignup