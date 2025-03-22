import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store';
import { apiInstance } from '@/utils/apiInstance';



interface ExperienceState {
  experiences: Experience[],
  isLoading: boolean,
  error: string
}

// Define the initial state using that type
const initialState: ExperienceState = {
  experiences: [],
  isLoading: false,
  error: ''
}

export const fetchExperiences = createAsyncThunk('experiences/fetchExperiences', async () => {
  const response = await apiInstance.get('/experience');
  return response.data.content;
})

export const postExperience = createAsyncThunk('experiences/postExperience', async () => {
  const response = await apiInstance.post('/experience', {});
  return response.data.content;
})

export const removeExperience = createAsyncThunk('experiences/removeExperience', async (id: string) => {
  const response = await apiInstance.delete(`/experience/${id}`);
  return response.data.content;
})

export const updateExperience = createAsyncThunk('experiences/updateExperience', async (experience: Experience) => {
  const response = await apiInstance.patch(`/experience/${experience.id}`, experience);
  return response.data.content;
})

export const experienceSlice = createSlice({
  name: 'experience',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExperiences.fulfilled, (state, action) => {
      state.experiences = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchExperiences.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(fetchExperiences.pending, (state) => {
      state.isLoading = true;
    })
  }
})


// Other code such as selectors can use the imported `RootState` type

export const selectExperiences = (state: RootState) => state.experiences.experiences;
export const selectIsExperienceLoading = (state: RootState) => state.experiences.isLoading;

export default experienceSlice.reducer