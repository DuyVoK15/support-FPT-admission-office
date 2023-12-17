import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Location from 'expo-location';

interface LocationState {
  currentLocation: Location.LocationObject | null;
  loading: boolean;
  error: string;
}

const initialState: LocationState = {
  currentLocation: null,
  loading: false,
  error: '',
};

export const updateCurrentLocation = createAsyncThunk(
  'location/getCurrent',
  async (
    newCurrentLocation: Location.LocationObject,
    { rejectWithValue }
  ) => {
    try {
      return newCurrentLocation;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const locaitonSlice = createSlice({
  name: 'locaiton',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(updateCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(updateCurrentLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
      })
      .addCase(updateCurrentLocation.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default locaitonSlice.reducer;
