import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../../env';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      // if (Platform.OS === 'android') {
      //   Location.setGoogleApiKey;
      // }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
      ></MapView>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
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
