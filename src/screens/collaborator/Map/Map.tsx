import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  NativeModules,
} from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../../env';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useAppDispatch } from '../../../app/store';
import {
  getAllPostRegistration_Confirmed,
  getPostRegistrationById_Confirmed,
} from '../../../features/collaborator/collab.postRegistrationSlice';
import { RegistrationStatus } from '../../../enums/collaborator/RegistrationStatus';
import { useAppSelector } from '../../../app/hooks';
import DataViewPostRegistration from '../../../models/collaborator/postRegistration.model';
import ViewPostRegistrationResponse from '../../../dtos/collaborator/response/viewPostRegistration.dto';
const statusBarHeight = Constants.statusBarHeight;

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     // if (Platform.OS === 'android') {
  //     //   Location.setGoogleApiKey;
  //     // }
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(location);
  //   })();
  // }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
  const [selectedMarkerId, setSelectedMarkerId] = useState(1); // Default selected marker ID

  const handleMarkerPress = (markerId: any) => {
    setSelectedMarkerId(markerId);
  };

  useEffect(() => {
    // Here you can handle moving the map to the selected marker's coordinates
    const selectedMarker = postRegistrationConfirmList?.data?.find(
      (marker) => marker.id === selectedMarkerId
    );
    if (selectedMarker) {
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: selectedMarker?.postPosition?.latitude
            ? Number(selectedMarker?.postPosition?.latitude)
            : 0,
          longitude: selectedMarker?.postPosition?.longitude
            ? Number(selectedMarker?.postPosition?.longitude)
            : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
    }
  }, [selectedMarkerId]);
  const dispatch = useAppDispatch();
  const postRegistrationConfirmList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirmed
  );
  const fetchPostRegistrationConfirmed = async () => {
    await dispatch(
      getAllPostRegistration_Confirmed({
        RegistrationStatus: [RegistrationStatus.CONFIRM],
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      const resData = res?.payload as ViewPostRegistrationResponse;
    });
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchPostRegistrationConfirmed();
    };
    fetch();
    console.log(postRegistrationConfirmList);
  }, []);

  const renderMarkers = () => {
    return postRegistrationConfirmList?.data.map((registration, index) => {
      console.log(registration?.registrationCode);

      return (
        <Marker
          key={index}
          coordinate={{
            latitude: registration?.postPosition?.latitude
              ? Number(registration?.postPosition?.latitude)
              : 0,
            longitude: registration?.postPosition?.longitude
              ? Number(registration?.postPosition?.longitude)
              : 0,
          }}
          title={registration?.post?.postCategory?.postCategoryDescription}
          description={registration?.postPosition?.positionDescription}
          onPress={() => handleMarkerPress(registration?.id)}
        />
      );
    });
  };
  const [markersKey, setMarkersKey] = useState('defaultKey');

  useEffect(() => {
    // Generate a new key whenever postRegistrationConfirmList changes
    setMarkersKey(Date.now().toString());
  }, [postRegistrationConfirmList]);

  const regionTS = {
    latitude: 10.74325841775703,
    latitudeDelta: 7.359512544608724,
    longitude: 106.04260778054595,
    longitudeDelta: 3.957008980214596,
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" />
      <MapView
        key={markersKey.toString()}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={{
          latitude: 10.826561,
          longitude: 106.760897,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        showsUserLocation={true}
        showsMyLocationButton={true}
        // showsTraffic={true}
        // followsUserLocation={true}
        customMapStyle={[]}
        // onMapLoaded={(map) => console.log(map)}

        onRegionChange={(region) => console.log(region)}
      >
        {postRegistrationConfirmList && renderMarkers()}
      </MapView>
      <View
        style={{
          position: 'absolute',
          width: ScreenWidth * 0.9,
          top: statusBarHeight + 100,
        }}
      >
        {/* <Button title="Refresh Map" onPress={handleRefresh} /> */}
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
    paddingTop: statusBarHeight,
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