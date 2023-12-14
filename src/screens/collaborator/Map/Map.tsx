import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../../env';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { COLORS } from '../../../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import CurrentUserLocationButton from './CurrentUserLocationButton';
import useMap from './useMap';
import ConfirmAlert from '../../../components/shared/AwesomeAlert/ConfirmAlert';

export default function Map() {
  const { ref, state, setState, stateRedux, props, handlers } = useMap();
  return (
    <View style={styles.container}>
      <Spinner visible={state.isOpenMapLoading} />
      <MapView
        key={state.markersKey.toString()}
        provider={PROVIDER_GOOGLE}
        ref={ref.mapRef}
        initialRegion={state.initialRegion}
        style={styles.map}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        showsUserLocation={true}
        showsMyLocationButton={false}
        moveOnMarkerPress={false}
      >
        {stateRedux.postRegistrationConfirmList && props.renderMarkers()}
      </MapView>
      <CurrentUserLocationButton onPress={handlers.handleCurrentButton} />
      <View style={{ flex: 1, position: 'absolute', bottom: 5 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          snapToInterval={ScreenWidth}
          snapToAlignment="center"
          pagingEnabled={true}
          data={stateRedux.postRegistrationConfirmList?.data}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.floor(offset / (ScreenWidth * 0.8));
            handlers.handleMarkerPress(index);
            console.log(index);
          }}
          scrollEventThrottle={0}
          renderItem={props.renderCarouselItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <ConfirmAlert
        show={state.showAlert}
        title="CONFIRMATION"
        message={state.confirmInfo?.message}
        confirmText="Yes"
        cancelText="No"
        confirmButtonColor={COLORS.orange_button}
        onConfirmPressed={() => {
          switch (state.confirmInfo?.typeButton) {
            case props.TYPE_BUTTON_ENUM.CHECKIN:
              handlers.checkInPostRegistation(state.Item?.id ?? null);
              console.log(state.Item?.id);
              break;

            default:
              console.log('Type Button Null');
          }
          handlers.hideAlertHandler();
        }}
        onCancelPressed={handlers.hideAlertHandler}
      />
      {/* <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          GoogleReverseGeocodingQuery={{ language: 'vi' }}
          GooglePlacesDetailsQuery={{ fields: 'geometry' }}
          fetchDetails={true}
          styles={{ textInput: styles.input }}
          placeholder="Search"
          onPress={(data: any, details: any = null) => {
            // 'details' is provided when fetchDetails = true

            console.log(JSON.stringify(data, null, 2));
            console.log(JSON.stringify(details, null, 2));
            console.log(JSON.stringify(details?.geometry?.location));
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'vi',
          }}
          onFail={(e) => console.log(e)}
          onNotFound={() => console.log('không thấy')}
          // currentLocation={true}
          // // currentLocationLabel="Đây "
          predefinedPlaces={[homePlace, workPlace]}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
  },
  searchContainer: {
    position: 'absolute',
    width: ScreenWidth * 0.9,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 60,
    left: (ScreenWidth * 0.1) / 2,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
});
{
  /* <Marker
          coordinate={{
            latitude: location?.coords?.latitude
              ? location?.coords?.latitude
              : 0,
            longitude: location?.coords?.longitude
              ? location?.coords?.longitude
              : 0,
          }}
          image={require('../../../assets/Images/ic_location.png')}
        /> */
}
