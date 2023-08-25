import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

type BackwardProps = TouchableOpacity['props'];

const Backward: React.FC<BackwardProps> = ({ style, ...otherProps }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...otherProps} >
      <Ionicons name="arrow-back" size={36} color="white" />
    </TouchableOpacity>
  )
}

export default Backward

const styles = StyleSheet.create({
    container: {

    }
})