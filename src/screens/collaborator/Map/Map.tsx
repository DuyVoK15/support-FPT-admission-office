import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
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
  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };

  const locations = {
    latitude: '10.2131',
    longitude: '106.123123',
  };

  const mapRef = useRef<MapView>(null);
  const markerCoordinates = { latitude: 10.826561, longitude: 106.760897 };

  const moveToMarker = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: markerCoordinates.latitude,
        longitude: markerCoordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={{
          latitude: 10.826561,
          longitude: 106.760897,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
        showsUserLocation={true}
        // showsMyLocationButton={true}
      >
        <Marker
          coordinate={markerCoordinates}
          title="Marker Title"
          description="Marker Description"
        />
       
        {/* <View style={{ position: 'absolute' }}>
          <View style={{ width: 300, height: 300, backgroundColor: 'white' }}>
            <Text>ALOALOA</Text>
          </View>
        </View> */}
      </MapView>
      <View style={{position: 'absolute', width: ScreenWidth * 0.9,top: 60,}}>
          <Button title="View market" onPress={moveToMarker}/>
        </View>
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
