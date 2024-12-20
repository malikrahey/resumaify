import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { apiInstance } from '@/utils/apiInstance';

export interface PersonalState {
  personalInfo: PersonalInfo;
  isLoading: boolean;
  error: string;
}

const initialState: PersonalState = {
  personalInfo: {
    id: '',
    user_id: '',
    name: '',
    phone: '',
    location: '',
    email: '',
    links: []
  },
  isLoading: true,
  error: ''
}

export const fetchPersonalInfo = createAsyncThunk('personal/fetchPersonalInfo', async () => {
  const response = await apiInstance.get('/personal');
  return response.data.content;
})

export const updatePersonalInfo = createAsyncThunk('personal/updatePersonalInfo', async (personalInfo: PersonalInfo) => {
  const response = await apiInstance.patch(`/personal`, personalInfo);
  return response.data.content;
})

export const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonalInfo.fulfilled, (state, action) => {
      state.personalInfo = action.payload;
      state.isLoading = false;
      state.error = '';
    })
    .addCase(fetchPersonalInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    })
    .addCase(fetchPersonalInfo.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    })
  }
})

export const selectPersonalInfo = (state: RootState) => state.personal.personalInfo;
export const selectIsPersonalLoading = (state: RootState) => state.personal.isLoading;

export default personalSlice.reducer;