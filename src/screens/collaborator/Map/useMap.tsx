import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Alert,
} from 'react-native';
import Device from 'expo-device';
import * as Location from 'expo-location';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../../env';
import { ScreenHeight, ScreenWidth } from '../../../constants/Demesions';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { useAppDispatch } from '../../../app/store';
import {
  getAllPostRegistrationConfirmedOnMap,
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
import {
  Entypo,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons';
import CheckInButton from '../../../components/shared/Button/CheckInButton';
import Spinner from 'react-native-loading-spinner-overlay';
import CurrentUserLocationButton from './CurrentUserLocationButton';
import useCustomToast from '../../../utils/toasts';
import ErrorStatus from '../../../dtos/collaborator/response/errorStatus.dto';
import { checkInPostRegistration } from '../../../features/collaborator/collab.checkAttendanceSlice';
import { CheckAttendanceResponse } from '../../../dtos/collaborator/response/checkAttendance.dto';
import SeeDirectionButon from './SeeDirectionButon';
import {
  format_ISODateString_To_DayOfWeekMonthDD,
  format_Time_To_HHss,
} from '../../../utils/formats';
import { getLocation } from '../../../../useCurrentLocation';

const useMap = () => {
  const dispatch = useAppDispatch();
  const { showToastSuccess, showToastError } = useCustomToast();
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<any>([]);
  const flatListRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [markersKey, setMarkersKey] = useState('defaultKey');
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number>(0); // Default selected marker ID
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(
    undefined
  );
  const [isOpenMapLoading, setIsOpenMapLoading] = useState(false);

  const postRegistrationConfirmList = useAppSelector(
    (state) => state.collab_postRegistration.postRegistrationConfirmedOnMap
  );
  const currentLocation = useAppSelector(
    (state) => state.collab_location.currentLocation
  );
  const fetchPostRegistrationConfirmed = async () => {
    await dispatch(
      getAllPostRegistrationConfirmedOnMap({
        Page: 1,
        PageSize: 10000,
        Sort: 'ConfirmTime',
        Order: 'DESCENDING',
      })
    ).then((res) => {
      const resData = res?.payload as ViewPostRegistrationResponse;
      // console.log(JSON.stringify(resData, null, 2));
    });
  };

  const initialRegionObject = {
    latitude: 10.841417,
    longitude: 106.810074,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostRegistrationConfirmed();
    };
    fetchData();
    setInitialRegion(initialRegionObject);
  }, []);

  const delay = (timeInMilliseconds: number) => {
    return new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeInMilliseconds);
    });
  };

  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const checkInPostRegistation = async (postRegistrationId: number | null) => {
    setLoadingLocation(true);
    try {
      if (!currentLocation) {
        console.log('Can not get your location!');
        setLoadingLocation(false);
        showToastError('Error when get your current location! Try again!');
      } else {
        await dispatch(
          checkInPostRegistration({
            postRegistrationId: postRegistrationId,
            longtitude: currentLocation?.coords?.longitude,
            latitude: currentLocation?.coords?.latitude,
          })
        ).then(async (res) => {
          setLoadingLocation(false);
          console.log(JSON.stringify(res, null, 2));
          if (res?.meta?.requestStatus === 'fulfilled') {
            const resFulfilledData = res.payload as CheckAttendanceResponse;
            showToastSuccess('Check In Successful!');
            fetchPostRegistrationConfirmed();
          } else {
            const resRejectedData = res.payload as ErrorStatus;

            switch (resRejectedData?.errorCode) {
              default:
                showToastError(resRejectedData?.message);
            }
          }
        });
      }
      setLoadingLocation(false);
      console.log(
        currentLocation?.coords?.latitude +
          ' ' +
          currentLocation?.coords?.longitude
      );
    } catch (error) {
      setLoadingLocation(false);
      console.log(error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location: Location.LocationObject =
        await Location.getCurrentPositionAsync({ accuracy: 2 });
      console.log('1');
      setLocation(location);
      return location;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkerPress = async (Index: number) => {
    setSelectedMarkerIndex(Index);
    const selectedMarker = postRegistrationConfirmList?.data?.find(
      (item, index) => index === Index
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
          markerRefs.current[Index] &&
          markerRefs.current[Index].showCallout
        ) {
          markerRefs.current[Index].showCallout();
        }
      }
    }
  };

  const handleCurrentButton = async () => {
    // const currentLocation = await getCurrentLocation();
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation?.coords?.latitude
          ? currentLocation?.coords?.latitude
          : 0,
        longitude: currentLocation?.coords?.longitude
          ? currentLocation?.coords?.longitude
          : 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       const userLocation = await getCurrentLocation();
  //       if (userLocation) {
  //         setInitialRegion({
  //           latitude: userLocation?.coords?.latitude,
  //           longitude: userLocation?.coords?.longitude,
  //           latitudeDelta: 0.01,
  //           longitudeDelta: 0.01,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserLocation();
  // }, []);

  const openGoogleMaps = async (latitude: string, longitude: string) => {
    setIsOpenMapLoading(true);
    try {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url)
          .then((res) => {
            setIsOpenMapLoading(false);
          })
          .catch((error) => {
            setIsOpenMapLoading(false);
            console.log('linking', error);
          })
          .finally(() => {
            setIsOpenMapLoading(false);
          });
      } else {
        setIsOpenMapLoading(false);
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      setIsOpenMapLoading(false);
      console.log(error);
    }
  };
  const renderCarouselItem = ({ item }: { item: DataViewPostRegistration }) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          width: ScreenWidth,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            ...SHADOWS.SHADOW_06,
            width: ScreenWidth * 0.9,
            borderRadius: 15,
            // height: ScreenWidth * 0.3,
            backgroundColor: 'white',
          }}
        >
          <View style={{}}>
            <View style={{ alignItems: 'center' }}>
              {item?.isNearCheckIn && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    right: 20,
                    height: 40,
                    paddingHorizontal: 16,
                    backgroundColor: '#FFF',
                    ...SHADOWS.SHADOW_05,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    zIndex: 999,
                    borderWidth: 3,
                    borderColor: COLORS?.orange_button,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_700Bold,
                      color: COLORS?.orange_button,
                    }}
                  >
                    Upcomming
                  </Text>
                </View>
              )}

              <View
                style={{
                  width: ScreenWidth * 0.9,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomWidth: 0.4,
                  borderColor: COLORS?.grey_underline,
                }}
              >
                <Image
                  style={{
                    height: ScreenWidth * 0.25,
                    width: '100%',
                    resizeMode: 'cover',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                  source={{
                    uri: item?.post?.postImg
                      ? item?.post?.postImg
                      : imageNotFoundUri,
                  }}
                />
              </View>
            </View>

            <View style={{ margin: 15 }}>
              <View
                style={[
                  styles.secondRow,
                  { marginTop: item?.isNearCheckIn ? 10 : 0 },
                ]}
              >
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Position</Text>
                  <Text style={styles.textSecond_2}>
                    {item?.postPosition?.positionName
                      ? item?.postPosition?.positionName
                      : 'No value'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Date</Text>
                  <Text style={styles.textSecond_2}>
                    {item?.postPosition?.date
                      ? format_ISODateString_To_DayOfWeekMonthDD(
                          item?.postPosition?.date
                        )
                        ? format_ISODateString_To_DayOfWeekMonthDD(
                            item?.postPosition?.date
                          )
                        : 'No value'
                      : 'No value'}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={styles.textSecond}>Time</Text>
                  <Text style={styles.textSecond_2}>
                    {item?.postPosition?.timeFrom &&
                      item?.postPosition?.timeTo &&
                      format_Time_To_HHss(item?.postPosition?.timeFrom) &&
                      format_Time_To_HHss(item?.postPosition?.timeTo) &&
                      format_Time_To_HHss(item?.postPosition?.timeFrom) +
                        ' - ' +
                        format_Time_To_HHss(item?.postPosition?.timeTo)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 15,
                  // alignItems: 'flex-start  ',
                }}
              >
                <CheckInButton
                  onPress={() =>
                    showAlertHandler(TYPE_BUTTON_ENUM.CHECKIN, item)
                  }
                />
                <SeeDirectionButon
                  onPress={() =>
                    openGoogleMaps(
                      item?.postPosition?.latitude
                        ? item?.postPosition?.latitude
                        : '0',
                      item?.postPosition?.longitude
                        ? item?.postPosition?.longitude
                        : '0'
                    )
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderMarkers = () => {
    return postRegistrationConfirmList?.data.map((registration, index) => {
      // console.log(registration?.registrationCode);

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
        >
          <Callout
            tooltip
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ borderRadius: 10, width: ScreenWidth - 50 }}>
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
                  PRCode:
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    {' '}
                    {registration?.registrationCode
                      ? registration?.registrationCode
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
                  PCode:
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    {' '}
                    {registration?.post?.postCode
                      ? registration?.post?.postCode
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
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FONTS_FAMILY?.Ubuntu_400Regular,
                    fontSize: 14,
                  }}
                >
                  Address:
                  <Text
                    style={{
                      fontFamily: FONTS_FAMILY?.Ubuntu_500Medium,
                      fontSize: 14,
                    }}
                  >
                    {' '}
                    {registration?.postPosition?.location
                      ? registration?.postPosition?.location
                      : 'No value'}
                  </Text>
                </Text>
              </View>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  const scrollToIndexZero = async () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ x: 0, animated: true });
    }
  };

  useEffect(() => {
    // Generate a new key whenever postRegistrationConfirmList changes
    setMarkersKey(Date.now().toString());
  }, [postRegistrationConfirmList]);

  enum TYPE_BUTTON_ENUM {
    CHECKIN = 3,
  }
  type ConfirmInfo = {
    title: string | null;
    message: string | null;
    typeButton: number | null;
  };
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo | null>(null);
  const [Item, setItem] = useState<DataViewPostRegistration | null>(null);
  const showAlertHandler = (
    action: number | null,
    item: DataViewPostRegistration | null
  ) => {
    switch (action) {
      case TYPE_BUTTON_ENUM.CHECKIN:
        setConfirmInfo({
          title: 'CONFIRMATION',
          message: `You want to Check In "${item?.postPosition?.positionName}" position?`,
          typeButton: TYPE_BUTTON_ENUM.CHECKIN,
        });
        break;
      default:
        setConfirmInfo({
          title: '',
          message: '',
          typeButton: 0,
        });
    }
    setItem(item);
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  const [isShowMarker, setIsShowMarker] = useState<boolean>(false);
  const showMarker = () => {
    setIsShowMarker(true);
  };
  const hideMarker = () => {
    setIsShowMarker(false);
  };
  const [isVisibleRegistration, setIsVisibleRegistration] =
    useState<boolean>(false);
  const showRegistration = () => {
    setIsVisibleRegistration(true);
    showMarker();
    handleMarkerPress(0);
  };
  const hideRegistration = () => {
    setIsVisibleRegistration(false);
    hideMarker();
    if (
      markerRefs &&
      markerRefs.current[selectedMarkerIndex] &&
      markerRefs.current[selectedMarkerIndex].hideCallout
    ) {
      markerRefs.current[selectedMarkerIndex].hideCallout();
    }
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const fetchData = async () => {
      await fetchPostRegistrationConfirmed();
      await scrollToIndexZero();
    };
    fetchData();

    setTimeout(() => {
      setRefreshing(false);
    }, 0);
  }, []);

  const handlers = {
    handleMarkerPress,
    handleCurrentButton,
    checkInPostRegistation,
    showAlertHandler,
    hideAlertHandler,
    showRegistration,
    hideRegistration,
    showMarker,
    hideMarker,
    onRefresh,
    scrollToIndexZero,
  };
  const props = { renderCarouselItem, renderMarkers, TYPE_BUTTON_ENUM };
  const ref = { mapRef, markerRefs, flatListRef };
  const state = {
    isOpenMapLoading,
    initialRegion,
    markersKey,
    showAlert,
    confirmInfo,
    Item,
    isVisibleRegistration,
    isShowMarker,
    refreshing,
    loadingLocation,
  };
  const setState = {};
  const stateRedux = { postRegistrationConfirmList };
  return {
    ref,
    handlers,
    props,
    state,
    setState,
    stateRedux,
  };
};

export default useMap;

const styles = StyleSheet.create({
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: 10,
    // marginBottom: 20,
  },
  column: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textColumn: {
    fontFamily: FONTS_FAMILY.Ubuntu_500Medium,
    fontSize: 14,
  },
  textColumn_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
  },
  textSecond: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 13,
    color: COLORS.light_grey,
  },
  textSecond_2: {
    fontFamily: FONTS_FAMILY.Ubuntu_400Regular,
    fontSize: 14,
    color: 'black',
    marginVertical: 5,
    textAlign: 'center',
  },
});
