import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import UserProfile from '../../../screens/student/Profile/UserProfile'
import UserProfileSignup from '../../../screens/student/Profile/UserProfileSignup'
import { useAppDispatch } from '../../../app/store'
import { useAppSelector } from '../../../app/hooks'
import { getUserInfo } from '../../../features/student/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(state => state.auth.userInfo);
  // console.log('user info: ...', JSON.stringify(userInfo))
  const fetchUserInfo = async () => {
    await dispatch(getUserInfo()).catch(error=>{
      console.log(error)
    });
    unwrapResult
  }
  useEffect(()=> { try{
    fetchUserInfo();
  } catch (error){
    console.log(error)
  }
    console.log("<UserProfile> User Info: ", JSON.stringify(userInfo, null, 2));
  },[]);
  return (
    <UserProfile userInfo={userInfo}/>
  )
} 

export default Profile
