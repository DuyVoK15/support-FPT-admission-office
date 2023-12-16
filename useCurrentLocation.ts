import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject,
} from 'expo-location';
import * as Location from 'expo-location';

import { Platform } from 'react-native';

function delay(timeInMilliseconds: number) {
  return new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), timeInMilliseconds);
  });
}

export async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // setErrorMsg('Permission to access location was denied');
    return;
  }
  const ANDROID_DELAY_IN_MS = 1500; // 👈 4s
  const IOS_DELAY_IN_MS = 15 * 1000; // 👈 15s

  const DELAY_IN_MS =
    Platform.OS === 'ios' ? IOS_DELAY_IN_MS : ANDROID_DELAY_IN_MS;

  const MAX_TRIES = 6;
  let tries = 1;
  let location: LocationObject | null = null;

  let locationError: Error | null = null;

  do {
    try {
      console.log('try time', tries);
      location = await Promise.race([
        delay(DELAY_IN_MS),
        getCurrentPositionAsync({
          accuracy:
            Platform.OS === 'android'
              ? LocationAccuracy.Low
              : LocationAccuracy.Lowest,
          distanceInterval: 0,
        }),
      ]);

      if (!location) {
        throw new Error('Timeout');
      }
    } catch (err) {
      locationError = err as Error;
    } finally {
      tries += 1;
    }
    ``;
  } while (!location && tries <= MAX_TRIES);

  if (!location) {
    const error = locationError ?? new Error('💣');

    throw error;
  }

  return location;
}
