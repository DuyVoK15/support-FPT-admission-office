import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeCollaboratorScreenNavigationProp } from '../../../../type';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import { ScreenHeight } from '../../../constants/Demesions';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { COLORS } from '../../../constants/Colors';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import Checkbox from 'expo-checkbox';

const PositionRegistration = () => {
  const navigation = useNavigation<HomeCollaboratorScreenNavigationProp>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [textNote, setTextNote] = useState<string>('');
  const [isChecked, setChecked] = useState<boolean>(false);

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Vị trí 1: Nhận đoàn và dẫn đoàn tham quan: Số lượng 17 bạn',
        value: '1',
        color: COLORS.orange_button,
        containerStyle: { marginBottom: 15 },
      },
      {
        id: '2',
        label: 'Vị trí 3: Trực HT : Số lượng 2 bạn',
        value: '2',
        color: COLORS.orange_button,
        containerStyle: { marginBottom: 15 },
      },
      {
        id: '3',
        label: 'Vị trí 6: Logistic : Số lượng 3 bạn',
        value: '3',
        color: COLORS.orange_button,
        containerStyle: { marginBottom: 15 },
      },
    ],
    []
  );
  return (
    <View>
      <Header>
        <Backward
          onPress={() => navigation.goBack()}
          titleBackward="Position Registration"
        />
      </Header>
      <View style={styles.containerPosition}>
        <View style={styles.positionBox}>
          <View style={styles.positionContent}>
            <Text style={styles.textPosition} numberOfLines={1}>
              Position
            </Text>
            <View style={styles.containerRadioGroup}>
              <RadioGroup
                containerStyle={{ alignItems: 'flex-start', }}
                radioButtons={radioButtons}
                onPress={(value) => {
                  console.log(value);
                  setSelectedId(value);
                }}
                selectedId={selectedId}
              />
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? COLORS.green_filter_button : undefined}
              />
              <Text style={styles.paragraph}>Use Bus Service?</Text>
            </View>

            <TouchableOpacity onPress={() => setSelectedId(undefined)}>
              <Text style={styles.textClear}>Clear your choice</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.positionBox}>
          <View style={styles.positionContent}>
            <Text style={styles.textPosition} numberOfLines={1}>
              Note
            </Text>
            <View style={styles.containerTextArea}>
              <TextInput
                onChangeText={(value) => setTextNote(value)}
                value={textNote}
                numberOfLines={6}
                multiline={true}
                style={styles.textArea}
                placeholder="Please enter note..."
                clearButtonMode="always"
              />
            </View>

            <TouchableOpacity onPress={() => setTextNote('')}>
              <Text style={styles.textClear}>Clear all text</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerSubmitButton}>
          <SubmitButton titleButton="SUBMIT" />
        </View>
      </View>
    </View>
  );
};

export default PositionRegistration;

const styles = StyleSheet.create({
  containerPosition: {
    marginHorizontal: 20,
  },
  positionBox: {
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  positionContent: {
    margin: 20,
  },
  textPosition: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 20,
    overflow: 'scroll',
  },
  containerRadioGroup: {
    marginTop: 10,
  },
  textClear: {
    fontFamily: FONTS_FAMILY.Ubuntu_300Light_Italic,
    fontSize: 14,
    marginLeft: 15,
  },
  containerTextArea: {
    marginTop: 10,
    marginBottom: 15,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.orange_icon,
  },
  textArea: {
    margin: 15,
  },
  containerSubmitButton: {
    marginTop: 50,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 10
  },
  paragraph: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    borderColor: COLORS.green_filter_button
  },
});
