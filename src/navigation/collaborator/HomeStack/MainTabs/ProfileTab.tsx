import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import UserProfile from '../../../../screens/collaborator/Profile/UserProfile'
import UserProfileSignup from '../../../../screens/collaborator/Profile/UserProfileSignup'
import { useAppDispatch } from '../../../../app/store'
import { useAppSelector } from '../../../../app/hooks'
import { getUserInfo } from '../../../../features/collaborator/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const ProfileTab: React.FC = () => {
 
  return (
    <UserProfile />
  )
} 

export default ProfileTab;
