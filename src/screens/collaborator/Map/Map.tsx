import React, { useState, useEffect, useRef } from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Button,
  NativeModules,
  FlatList,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../../env';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useAppDispatch } from '../../../app/store';
import {
  getAllPostRegistration_Confirmed,
  getAllPostRegistration_Pending,
  getPostRegistrationById_Confirmed,
} from '../../../features/collaborator/collab.postRegistrationSlice';
import { REGISTRATION_STATUS_ENUM } from '../../../enums/collaborator/RegistrationStatus';
import { useAppSelector } from '../../../app/hooks';
import DataViewPostRegistration from '../../../models/collaborator/postRegistration.model';
import ViewPostRegistrationResponse from '../../../dtos/collaborator/response/viewPostRegistration.dto';
const statusBarHeight = Constants.statusBarHeight;
import { FlashList } from '@shopify/flash-list';
import { SHADOWS } from '../../../constants/Shadows';
import Carousel from 'react-native-reanimated-carousel';
import { FONTS_FAMILY } from '../../../constants/Fonts';
import { imageNotFoundUri } from '../../../utils/images';
import { COLORS } from '../../../constants/Colors';
import RegistrationStatus from '../Registration/RegistrationStatus';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { transformer } from '../../../../metro.config';
import { Entypo } from '@expo/vector-icons';

interface ItemCarouselProps {
  item?: DataViewPostRegistration;
  index: number;
  scrollX: number;
}

export default function Map() {
  const [scrollX, setScrollX] = useState(0);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markersKey, setMarkersKey] = useState('defaultKey');

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

  // let text = 'Waiting...';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<any>([]);
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(-1); // Default selected marker ID

  const handleMarkerPress = (index: number) => {
    setSelectedMarkerIndex(index);
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchPostRegistrationConfirmed();
    };
    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      handleMarkerPress(0);
    }, 2000);
  }, []);
  useEffect(() => {
    // Here you can handle moving the map to the selected marker's coordinates
    const selectedMarker = postRegistrationConfirmList?.data?.find(
      (item, index) => index === selectedMarkerIndex
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

        if (
          markerRefs &&
          markerRefs.current[selectedMarkerIndex] &&
          markerRefs.current[selectedMarkerIndex].showCallout
        ) {
          markerRefs.current[selectedMarkerIndex].showCallout();
        }
      }
    }
  }, [selectedMarkerIndex]);
  const dispatch = useAppDispatch();
  const postRegistrationConfirmList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirmed
  );
  const fetchPostRegistrationConfirmed = async () => {
    await dispatch(
      getAllPostRegistration_Confirmed({
        Sort: 'CreateAt',
        Order: 'DESCENDING',
        RegistrationStatus: [REGISTRATION_STATUS_ENUM.CONFIRM],
      })
    ).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      const resData = res?.payload as ViewPostRegistrationResponse;
    });
  };

  useEffect(() => {
    // Generate a new key whenever postRegistrationConfirmList changes
    setMarkersKey(Date.now().toString());
  }, [postRegistrationConfirmList]);

  const renderMarkers = () => {
    return postRegistrationConfirmList?.data.map((registration, index) => {
      console.log(registration?.registrationCode);

      return (
        <Marker
          key={index}
          ref={(ref) => (markerRefs.current[index] = ref)}
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
          // onPress={(event) => console.log(event)}
          isPreselected={true}
          onCalloutPress={() =>
            openGoogleMaps(
              registration?.postPosition?.latitude
                ? registration?.postPosition?.latitude
                : '0',
              registration?.postPosition?.longitude
                ? registration?.postPosition?.longitude
                : '0'
            )
          }
        >
          <Callout
            onPress={() =>
              openGoogleMaps(
                registration?.postPosition?.latitude
                  ? registration?.postPosition?.latitude
                  : '0',
                registration?.postPosition?.longitude
                  ? registration?.postPosition?.longitude
                  : '0'
              )
            }
            style={{ backgroundColor: '#FFF', padding: 10, borderRadius: 10 }}
          >
            <View style={{ borderRadius: 10 }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                    fontSize: 18,
                  }}
                >
                  {registration?.post?.postCategory?.postCategoryDescription
                    ? registration?.post?.postCategory?.postCategoryDescription
                    : 'No value'}
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    fontSize: 14,
                  }}
                >
                  Position:
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    {' '}
                    {registration?.postPosition?.positionName
                      ? registration?.postPosition?.positionName
                      : 'No value'}
                  </Text>
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    fontSize: 14,
                  }}
                >
                  School:
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    {' '}
                    {registration?.postPosition?.schoolName
                      ? registration?.postPosition?.schoolName
                      : 'No value'}
                  </Text>
                </Text>
              </View>

              <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                    fontSize: 14,
                    color: '#4287f5',
                    textDecorationLine: 'underline',
                  }}
                >
                  Click to Show On GoogleMap
                </Text>
              </TouchableOpacity>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  const onRegionChangeComplete = () => {};

  const carouselRef = useRef<any>(null);

  const regionTS = {
    latitude: 10.74325841775703,
    latitudeDelta: 7.359512544608724,
    longitude: 106.04260778054595,
    longitudeDelta: 3.957008980214596,
  };

  const openGoogleMaps = (latitude: string, longitude: string) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const renderCarouselItem = ({ item }: { item: DataViewPostRegistration }) => {
    return (
      <View
        style={[
          {
            backgroundColor: 'transparent',
            width: ScreenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            // marginLeft: index === 0 ? SIDE_CARD_LENGTH : SPACING,
            // marginRight: index === 2 ? SIDE_CARD_LENGTH : SPACING,
          },
          // cardStyle,
        ]}
      >
        <View
          style={{
            width: ScreenWidth * 0.9,
            borderRadius: 15,
            // height: ScreenWidth * 0.3,
            backgroundColor: 'white',
          }}
        >
          <View style={{ margin: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  flex: 0,
                  borderRadius: 10,
                }}
              >
                <Image
                  style={{
                    height: ScreenWidth * 0.2,
                    width: ScreenWidth * 0.3,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item?.post?.postImg
                      ? item?.post?.postImg
                      : imageNotFoundUri,
                  }}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 13,
                    color: COLORS.light_black,
                  }}
                >
                  General
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
                    fontSize: 16,
                    color: 'black',
                    marginTop: 5,
                  }}
                >
                  {item?.post?.postCategory?.postCategoryDescription
                    ? item?.post?.postCategory?.postCategoryDescription
                    : 'No value'}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    fontSize: 12,
                    color: COLORS?.light_grey,
                    marginTop: 5,
                  }}
                >
                  {item?.registrationCode
                    ? 'PRCode: ' + item?.registrationCode
                    : 'No value'}
                </Text>
              </View>
            </View>
            <RegistrationStatus status={REGISTRATION_STATUS_ENUM.CONFIRM} />
            <View style={{ marginTop: 15, alignItems: 'flex-start' }}>
              <TouchableOpacity
              onPress={() =>
                openGoogleMaps(
                  item?.postPosition?.latitude
                    ? item?.postPosition?.latitude
                    : '0',
                    item?.postPosition?.longitude
                    ? item?.postPosition?.longitude
                    : '0'
                )}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 15,
                  backgroundColor: COLORS?.blue_status,
                  justifyContent: 'space-evenly',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      color: '#FFF',
                    }}
                  >
                    Show on Google Map
                  </Text>
                </View>
                <View style={{ marginLeft: 5 }}>
                  <Entypo name="direction" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
        moveOnMarkerPress={false}
        // onRegionChange={(region) => console.log(region)}
        // onRegionChangeComplete={onRegionChangeComplete}
      >
        {postRegistrationConfirmList && renderMarkers()}
      </MapView>
      <View style={{ position: 'absolute', bottom: 20 }}>
        <FlatList
          style={{}}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
          snapToInterval={ScreenWidth}
          snapToAlignment="center"
          pagingEnabled={true}
          data={postRegistrationConfirmList?.data}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.x;

            const index = Math.floor(offset / (ScreenWidth - 50));
            handleMarkerPress(index);
            console.log(index);
          }}
          scrollEventThrottle={0}
          renderItem={renderCarouselItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {/* <View>
        <Button title="Redirect" onPress={openGoogleMaps} />
      </View> */}

      {/* <View
        style={{
          position: 'absolute',
          width: ScreenWidth * 0.9,
          top: statusBarHeight + 100,
        }}
      > */}
      {/* <Button title="Refresh Map" onPress={handleRefresh} /> */}
      {/* </View> */}
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
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
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
