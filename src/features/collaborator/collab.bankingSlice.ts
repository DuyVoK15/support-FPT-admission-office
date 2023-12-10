import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ViewBankingResponse } from '../../dtos/collaborator/response/viewBanking.dto';
import { bankingService } from '../../services/collaborator/banking.service';
import { AxiosError } from 'axios';
import CreateBankingParam from '../../dtos/collaborator/parameter/createBanking.dto';
import UpdateBankingParam from '../../dtos/collaborator/parameter/updateBanking.dto';

interface BankingState {
  bankingInformation: ViewBankingResponse | null;
  isCreated: boolean;
  loading: boolean;
  loadingUpdate: boolean;
  error: string;
}

const initialState: BankingState = {
  bankingInformation: null,
  isCreated: true,
  loading: false,
  loadingUpdate: false,
  error: '',
};

export const getBankingInformation = createAsyncThunk(
  'banking/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bankingService.getBankingInformation();
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const createBankingInformation = createAsyncThunk(
  'banking/create',
  async (params: CreateBankingParam, { rejectWithValue }) => {
    try {
      const response = await bankingService.createBankingInformation(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const updateBankingInformation = createAsyncThunk(
  'banking/update',
  async (params: UpdateBankingParam, { rejectWithValue }) => {
    try {
      const response = await bankingService.updateBankingInformation(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const bankingSlice = createSlice({
  name: 'banking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBankingInformation.pending, (state) => {
        state.loading = true;
        state.isCreated = true;
        state.error = '';
      })
      .addCase(getBankingInformation.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = true;
        state.bankingInformation = action.payload;
      })
      .addCase(getBankingInformation.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
        state.bankingInformation = null;
        state.isCreated = false;
      })

      .addCase(createBankingInformation.pending, (state) => {
        state.loadingUpdate = true;
        state.isCreated = false;
        state.error = '';
      })
      .addCase(createBankingInformation.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.bankingInformation = action.payload;
        state.isCreated = true;
      })
      .addCase(createBankingInformation.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loadingUpdate = false;
        state.isCreated = false;
      })

      .addCase(updateBankingInformation.pending, (state) => {
        state.loadingUpdate = true;
        state.error = '';
      })
      .addCase(updateBankingInformation.fulfilled, (state, action) => {
        state.loadingUpdate = false;

        state.bankingInformation = action.payload;
      })
      .addCase(updateBankingInformation.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loadingUpdate = false;
      });
  },
});

export default bankingSlice.reducer;
