import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ViewCertificateResponse from '../../dtos/collaborator/response/viewCertificate.dto';
import { CertificateData } from '../../models/collaborator/certificate.model';
import { certificateService } from '../../services/collaborator/certificate.service';
import { AxiosError } from 'axios';
import { FilterCertificateParam } from '../../dtos/collaborator/parameter/filterCertificate.dto';

interface CertificateState {
  certificate: ViewCertificateResponse | null;
  certificateCompleted: ViewCertificateResponse | null;
  certificateRejected: ViewCertificateResponse | null;
  loading: boolean;
  error: string;
}

const initialState: CertificateState = {
  certificate: null,
  certificateCompleted: null,
  certificateRejected: null,
  loading: false,
  error: '',
};

export const getAllCertificate = createAsyncThunk(
  'certificate/getAll',
  async (params: FilterCertificateParam, { rejectWithValue }) => {
    try {
      const response = await certificateService.getAllCertificate(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllCertificate_Completed = createAsyncThunk(
  'certificate/getAll/completed',
  async (params: FilterCertificateParam, { rejectWithValue }) => {
    try {
      const response = await certificateService.getAllCertificate(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllCertificate_Rejected = createAsyncThunk(
  'certificate/getAll/rejected',
  async (params: FilterCertificateParam, { rejectWithValue }) => {
    try {
      const response = await certificateService.getAllCertificate(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const certificateSlice = createSlice({
  name: 'certificate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get All
      .addCase(getAllCertificate.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.certificate = action.payload;
      })
      .addCase(getAllCertificate.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // get Completed
      .addCase(getAllCertificate_Completed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllCertificate_Completed.fulfilled, (state, action) => {
        state.loading = false;
        state.certificateCompleted = action.payload;
      })
      .addCase(getAllCertificate_Completed.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })
      // get Rejected
      .addCase(getAllCertificate_Rejected.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllCertificate_Rejected.fulfilled, (state, action) => {
        state.loading = false;
        state.certificateRejected = action.payload;
      })
      .addCase(getAllCertificate_Rejected.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default certificateSlice.reducer;
