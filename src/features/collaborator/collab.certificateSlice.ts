import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ViewCertificateResponse from "../../dtos/collaborator/response/viewCertificate.dto";
import { CertificateData } from "../../models/collaborator/certificate.model";
import { certificateService } from "../../services/collaborator/certificate.service";
import { AxiosError } from "axios";

interface CertificateState {
    certificate: ViewCertificateResponse | null,
    loading: boolean,
    error: string,
}

const initialState : CertificateState = {
    certificate: null,
    loading: false,
    error: "",
}

export const getAllCertificate = createAsyncThunk(
    'certificate/getAll',
    async (_, { rejectWithValue }) => {
      try {
        const response = await certificateService.getAllCertificate();
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
    
    },
  });
  
  export default certificateSlice.reducer;
  