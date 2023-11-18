import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Booking_Pending from '../../../../screens/collaborator/Registration/Pending';

interface PendingTabProps {
  item: string | null;
}
const PendingTab:FC<PendingTabProps> = (props) => {
  return (
    <Booking_Pending item={props.item} />
  )
}

export default PendingTab;

const styles = StyleSheet.create({})