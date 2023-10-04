import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard'

const Certificate_All_Status = () => {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <ScrollView>
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Tu Van Lop Certificate"
            confirmBy='DatTD'
            status='Completed'
          />
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Openday Certificate"
            confirmBy='DatTD'
            status='Rejected'
          />
          <CertificateCard
            dateReceive="25-9-2023"
            certificateID="11010"
            certificateName="Tu Van Lop Certificate"
            confirmBy='DatTD'
            status='Completed'
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

export default Certificate_All_Status;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });