import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';

const RejectedTab = () => {
  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <View style={styles.containerItem}>
            <View style={styles.containerRow}>
            <View style={styles.firstRow}>
              <Text>25-5-2019</Text>
            </View>
            <View style={styles.secondRow}>
              <Text style={{flex: 1}}>ID: 1231 </Text>
              <Text>Tu Van Lop Certificate</Text>
            </View>

            <View style={styles.thirdRow}>
              <View style={{flex: 1}}>
                <Text>Confirm by: DatTD</Text>
              </View>
              <View>
                <Text>Confirm</Text>
              </View>
            </View>
            </View>
            
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RejectedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerItem: {
    marginVertical: 20,
    marginHorizontal: 30,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    shadowColor: "#453e3e",
shadowOffset: {
  width: 0,
  height: 1,
},
shadowOpacity:  0.16,
shadowRadius: 1.51,
elevation: 2,
    borderWidth: 1
  },
  containerRow: {
    margin: 10
  },
  firstRow: { flexDirection: 'row' },
  secondRow: { flexDirection: 'row' },
  thirdRow: { flexDirection: 'row' },
});
