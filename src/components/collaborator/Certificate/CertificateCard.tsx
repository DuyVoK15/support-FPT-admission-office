import React, { Component, FC } from 'react';
import { Text, StyleSheet, View, ViewProps } from 'react-native';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import Dash from 'react-native-dash';
import DashedLine from 'react-native-dashed-line';
import { SHADOWS } from '../../../constants/Shadows';

interface CertificateCardProps extends ViewProps {
  dateReceive?: string | null;
  certificateID?: string;
  certificateName?: string;
  confirmBy?: string;
  status?: string;
  color?: string;
}

const CertificateCard: FC<CertificateCardProps> = (Props) => {
  const { ...otherProps } = Props;
  return (
      <View style={styles.containerRow}>
        <View style={styles.firstRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textFirst}>{Props?.dateReceive}</Text>
          </View>
          <View style={{ borderWidth: 1, borderRadius: 30 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 6,
              }}
            >
              <View>
                <Text style={styles.thirdText}>{Props?.status}</Text>
              </View>
              <View
                style={{
                  width: 12,
                  height: 12,
                  marginLeft: 5,
                  borderRadius: 100,
                  backgroundColor:
                    Props?.status === 'Rejected' ? 'red' : 'green',
                }}
              />
            </View>
          </View>
        </View>

        <DashedLine
          style={{ marginVertical: 15 }}
          dashGap={5}
          dashThickness={1}
          dashLength={8}
          dashColor={COLORS.light_grey}
        />
        <View style={styles.secondRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.textSecond}>
              {Props?.certificateID ? 'ID: ' + Props?.certificateID : ''}
            </Text>
          </View>
          <View>
            <Text style={styles.textSecond}>{Props?.certificateName}</Text>
          </View>
        </View>

        <View style={styles.thirdRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.thirdText}>
              {Props?.confirmBy ? 'Confirm By: ' + Props?.confirmBy : ''}
            </Text>
          </View>
        </View>
      </View>
  );
};

export default CertificateCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  containerRow: {
    margin: 15,
  },
  firstRow: { flexDirection: 'row', alignItems: 'center' },
  textFirst: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 16,
    color: COLORS.blue_date,
  },
  secondRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  textSecond: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 18,
    color: COLORS.light_grey,
  },
  thirdRow: { flexDirection: 'row', alignItems: 'center' },
  thirdText: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 15,
    color: COLORS.light_grey,
  },
});
