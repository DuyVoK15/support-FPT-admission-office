import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import EventMissingSlot from '../../../../screens/collaborator/Event/EventMissingSlot';

const EventMissingSlotTab: FC = () => {
  return (
    <EventMissingSlot />
  )
}

export default EventMissingSlotTab;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: 'white',
  },
})