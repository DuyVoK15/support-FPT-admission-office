import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../../app/store';
import { searchPostByPostCode } from '../../../features/collaborator/collab.postSlice';
import UpdateAvatarDto from '../../../dtos/collaborator/parameter/updateAvatar.dto';
import { collab_updateAvatar } from '../../../features/collaborator/collab.accountSlice';
import Header from '../../../components/shared/Header/Back';
import { ScreenHeight } from '../../../constants/Demesions';
import { Image } from '@rneui/base';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import EventTopTabs from '../../../navigation/collaborator/EventStack/EventTopTabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { HomeAdmissionScreenNavigationProp } from '../../../../type';
import { ROUTES } from '../../../constants/Routes';

const Event = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeAdmissionScreenNavigationProp>();
  const pageList = [1, 2, 3, 4, 5, 6, 7];
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, marginHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate(ROUTES.HOME_STACK_NAVIGATOR, {
                screen: ROUTES.HOME,
              })
            }
          >
            <Image
              style={{ height: 50, width: 50, resizeMode: 'contain' }}
              source={require('../../../assets/Images/ic_app_no_text.png')}
            />
          </TouchableOpacity>

          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                fontSize: 24,
              }}
            >
              ALL Events
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'flex-end' }}
            onPress={() => {
              navigation.navigate('EVENT_NOTIFICATION');
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
                backgroundColor: '#fff2d4',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name="notifications"
                size={30}
                color={COLORS.orange_button}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <EventTopTabs />
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
