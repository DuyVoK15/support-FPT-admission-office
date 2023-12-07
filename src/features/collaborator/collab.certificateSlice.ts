import { CancelTrainingCertificateRegistrationParam } from './../../dtos/collaborator/parameter/cancelTrainingCertificateRegistration.dto';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ViewCertificateResponse from '../../dtos/collaborator/response/viewCertificate.dto';
import { CertificateData } from '../../models/collaborator/certificate.model';
import { certificateService } from '../../services/collaborator/certificate.service';
import { AxiosError } from 'axios';
import { FilterCertificateParam } from '../../dtos/collaborator/parameter/filterCertificate.dto';
import ViewTrainingCertificateRegistrationResponse from '../../dtos/collaborator/response/viewTrainingCertificateRegistration.dto';
import CancelTrainingCertificateRegistrationResponse from '../../dtos/collaborator/response/cancelTrainingCertificateRegistration.dto';
import ViewCertificateAdmissionResponse from '../../dtos/collaborator/response/viewCertificateFromAdmisstion.dto';
import { CreateTrainingCertificateRegistrationParam } from '../../dtos/collaborator/parameter/createTrainingCertificateRegistration.dto';
import { FilterTrainingCertificateRegistrationParam } from '../../dtos/collaborator/parameter/filterTrainingCertificateRegistration.dto';

interface CertificateState {
  certificate: ViewCertificateResponse | null;
  certificateCompleted: ViewCertificateResponse | null;
  certificateRejected: ViewCertificateResponse | null;
  trainingCertificateRegistration: ViewTrainingCertificateRegistrationResponse | null;
  trainingCertificateRegistration_Pending: ViewTrainingCertificateRegistrationResponse | null;
  trainingCertificateRegistration_Assigned: ViewTrainingCertificateRegistrationResponse | null;
  trainingCertificateRegistration_Passed: ViewTrainingCertificateRegistrationResponse | null;
  trainingCertificateRegistration_NotPassed: ViewTrainingCertificateRegistrationResponse | null;
  trainingCertificateRegistration_Canceled: ViewTrainingCertificateRegistrationResponse | null;
  cancelResponse: CancelTrainingCertificateRegistrationResponse | null;
  certificateFromAdmission: ViewCertificateAdmissionResponse | null;
  loading: boolean;
  error: string;
}

const initialState: CertificateState = {
  certificate: null,
  certificateCompleted: null,
  certificateRejected: null,
  trainingCertificateRegistration: null,
  trainingCertificateRegistration_Pending: null,
  trainingCertificateRegistration_Assigned: null,
  trainingCertificateRegistration_Passed: null,
  trainingCertificateRegistration_NotPassed: null,
  trainingCertificateRegistration_Canceled: null,
  cancelResponse: null,
  certificateFromAdmission: null,
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
export const getAllTrainingCertificateRegistration = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllTrainingCertificateRegistration_Pending = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration/pending',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllTrainingCertificateRegistration_Assigned = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration/assigned',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllTrainingCertificateRegistration_Passed = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration/passed',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllTrainingCertificateRegistration_NotPassed = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration/notpassed',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllTrainingCertificateRegistration_Cannceled = createAsyncThunk(
  'certificate/viewAllTrainingCertificateRegistration/cannceled',
  async (params: FilterTrainingCertificateRegistrationParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const cancelTrainingCertificateRegistration = createAsyncThunk(
  'certificate/cancelTrainingCertificateRegistration',
  async (
    params: CancelTrainingCertificateRegistrationParam,
    { rejectWithValue }
  ) => {
    try {
      const response =
        await certificateService.cancelTrainingCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const createCertificateRegistration = createAsyncThunk(
  'certificate/createTrainingCertificateRegistration',
  async (
    params: CreateTrainingCertificateRegistrationParam,
    { rejectWithValue }
  ) => {
    try {
      const response =
        await certificateService.createCertificateRegistration(params);
      // console.log("<PostSlice> Post: ", JSON.stringify(response.data.data))
      return response.data;
    } catch (error: any) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);
export const getAllCertificateFromAdmission = createAsyncThunk(
  'certificate/getAllCertificateFromAdmission',
  async (params: FilterCertificateParam, { rejectWithValue }) => {
    try {
      const response =
        await certificateService.getAllCertificateFromAdmission(params);
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
      })

      .addCase(getAllTrainingCertificateRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(getAllTrainingCertificateRegistration_Pending.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration_Pending.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration_Pending = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration_Pending.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(getAllTrainingCertificateRegistration_Assigned.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration_Assigned.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration_Assigned = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration_Assigned.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(getAllTrainingCertificateRegistration_Passed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration_Passed.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration_Passed = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration_Passed.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(getAllTrainingCertificateRegistration_NotPassed.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration_NotPassed.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration_NotPassed = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration_NotPassed.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(getAllTrainingCertificateRegistration_Cannceled.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        getAllTrainingCertificateRegistration_Cannceled.fulfilled,
        (state, action) => {
          state.loading = false;
          state.trainingCertificateRegistration_Canceled = action.payload;
        }
      )
      .addCase(
        getAllTrainingCertificateRegistration_Cannceled.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(cancelTrainingCertificateRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(
        cancelTrainingCertificateRegistration.fulfilled,
        (state, action) => {
          state.loading = false;
          state.cancelResponse = action.payload;
        }
      )
      .addCase(
        cancelTrainingCertificateRegistration.rejected,
        (state, action) => {
          state.error = String(action.payload);
          state.loading = false;
        }
      )

      .addCase(createCertificateRegistration.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createCertificateRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingCertificateRegistration = action.payload;
      })
      .addCase(createCertificateRegistration.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      })

      .addCase(getAllCertificateFromAdmission.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAllCertificateFromAdmission.fulfilled, (state, action) => {
        state.loading = false;
        state.certificateFromAdmission = action.payload;
      })
      .addCase(getAllCertificateFromAdmission.rejected, (state, action) => {
        state.error = String(action.payload);
        state.loading = false;
      });
  },
});

export default certificateSlice.reducer;
