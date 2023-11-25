import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWidth } from '../../../../constants/Demesions';
import { COLORS } from '../../../../constants/Colors';
import Dash from 'react-native-dash';
import { FONTS_FAMILY } from '../../../../constants/Fonts';
import CertificateCard from '../../../../components/collaborator/Certificate/CertificateCard';
import Certificate_Rejected from '../../../../screens/collaborator/Certificate/Rejected/CertificateRejected';

const RejectedTab = () => {
  return (
    <Certificate_Rejected />
  );
};

export default RejectedTab;
