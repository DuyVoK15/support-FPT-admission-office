import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Registration_Pending from '../../../../screens/collaborator/Registration/Pending/RegistrationPending';

interface PendingTabProps {
  // item: string | null;
}
const PendingTab:FC<PendingTabProps> = (props) => {
  return (
    <Registration_Pending />
  )
}

export default PendingTab;

const styles = StyleSheet.create({})