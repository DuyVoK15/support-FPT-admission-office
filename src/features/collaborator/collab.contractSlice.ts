import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ViewContractResponse } from '../../dtos/collaborator/response/viewContract.dto';
import { contractService } from '../../services/collaborator/contract.service';
import { AxiosError } from 'axios';

interface ContractState {
  contract: ViewContractResponse | null;
  loading: boolean;
  error: string;
}

const initialState: ContractState = {
  contract: null,
  loading: false,
  error: '',
};

export const getAllContract = createAsyncThunk(
  'contract/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contractService.getAllContract();
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContract.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contract = action.payload;
      })
      .addCase(getAllContract.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default contractSlice.reducer;
