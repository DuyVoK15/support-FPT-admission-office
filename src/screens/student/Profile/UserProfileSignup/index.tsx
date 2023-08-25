import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../../components/shared/Header/Back';
import Backward from '../../../../components/shared/Direction/Backward';


const UserProfileSignup = () => {
  return (
    <View>
      <Header>
        <Backward style={styles.backwardButton} onPress={() => console.log("Back to ")} />
        <Text style={styles.titleHeader}>Sign-up Profile Infomation</Text>
      </Header>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Text>HAHA</Text>

        </View>
      </ScrollView>

    </View>
  )
}

export default UserProfileSignup;

const styles = StyleSheet.create({
  backwardButton: {
    marginHorizontal: 15
  },
  titleHeader: {
    fontSize: 22,
    color: "white",
    fontStyle: "italic"
  },
  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})