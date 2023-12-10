import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../../components/shared/Header/Back';
import Backward from '../../../components/shared/Direction/Backward/Backward';
import useBanking from './useBanking';
import { ROUTES } from '../../../constants/Routes';
import TextInputField from './TextInputField';
import SubmitButton from '../../../components/shared/Button/SubmitButton';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { COLORS } from '../../../constants/Colors';
import { SHADOWS } from '../../../constants/Shadows';
import CreateBankingButton from '../../../components/shared/Button/CreateBankingButton';
import CancelEditBanking from '../../../components/shared/Button/CancelEditBankingButton';
import UpdateBankingButton from '../../../components/shared/Button/UpdateBankingButton';
import { MaterialIcons } from '@expo/vector-icons';
import EditBankingButton from '../../../components/shared/Button/EditBankingButton';
import LoadingScreen from '../../../components/shared/Loading/Loading';
import Spinner from 'react-native-loading-spinner-overlay';

const Banking = () => {
  const { state, setState, props, stateRedux, handlers } = useBanking();

  if (stateRedux.loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Spinner visible={stateRedux.loadingUpdate} />
      <Header>
        <Backward
          onPress={() => props.navigation.navigate(ROUTES.ACCOUNT)}
          titleBackward="My Banking"
        />
      </Header>
      <View style={{ flex: 0, marginTop: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text
            style={{ fontFamily: FONTS_FAMILY?.Ubuntu_500Medium, fontSize: 20 }}
          >
            Your banking account information
          </Text>
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <View style={{ alignItems: 'flex-end' }}>
            {stateRedux?.isCreated && (
             state.isDisable && <EditBankingButton onPress={() => setState.setIsDisable(false)} />
            )}
          </View>
        </View>
        <ScrollView>
          <TextInputField
            disabled={state.isDisable}
            control={props.control}
            name={'beneficiary'}
            label={'Beneficiary Name'}
            // rules={{ required: true }}
          />
          <TextInputField
            disabled={state.isDisable}
            control={props.control}
            name={'accountNumber'}
            label={'Account Number'}
            // rules={{ required: true }}
          />
          <TextInputField
            disabled={state.isDisable}
            control={props.control}
            name={'bankName'}
            label={'Bank Name'}
            // rules={{ required: true }}
          />
          <TextInputField
            disabled={state.isDisable}
            control={props.control}
            name={'branch'}
            label={'Bank Branch'}
            // rules={{ required: true }}
          />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 30,
            marginHorizontal: 15,
          }}
        >
          {stateRedux?.isCreated ? (
            !state.isDisable &&
            <>
              <UpdateBankingButton
                onPress={handlers.handleSubmit(
                  handlers.onUpdateBankingInformation
                )}
              />
              <CancelEditBanking onPress={() => setState.setIsDisable(true)} />
            </>
          ) : (
            <CreateBankingButton
              onPress={handlers.handleSubmit(
                handlers.onCreateBankingInformation
              )}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Banking;

const styles = StyleSheet.create({});
