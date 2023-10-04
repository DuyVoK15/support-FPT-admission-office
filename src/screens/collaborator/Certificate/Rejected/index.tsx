import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard'

const Certificate_Rejected = () => {
  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Tu Van Lop Certificate"
            confirmBy='DatTD'
            status='Rejected'
          />
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Tu Van Lop Certificate"
            confirmBy='DatTD'
            status='Rejected'
          />
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Tu Van Lop Certificate"
            confirmBy='DatTD'
            status='Rejected'
          />
        </ScrollView>
      </View>
    </View>
  )
}

export default Certificate_Rejected

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });