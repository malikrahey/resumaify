import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { apiInstance } from '@/utils/apiInstance'

type EducationState = {
  education: Education[]
  isLoading: boolean
  error: string | null
}

const initialState: EducationState = {
  education: [],
  isLoading: false,
  error: null,
}

export const fetchEducation = createAsyncThunk(
  'education/fetchEducation',
  async () => {
    try {
      const response = await apiInstance.get('/education');
      return response.data.content;
    } catch (error) {
      console.error('Error fetching education:', error)
    }
  }
);

export const addEducation = createAsyncThunk(
  'education/addEducation',
  async (education: any, {rejectWithValue}) => {
    try {
      const response = await apiInstance.post('/education', education);
      if (response.status !== 201) {
        rejectWithValue(null)
        return;
      }
      return response.data.content;
    } catch (error) {
      console.error('Error adding education:', error)
    }
  }
)

export const updateEducation = createAsyncThunk(
  'education/updateEducation',
  async (education: Education) => {
    try {
      const response = await apiInstance.patch(`/education/${education.id}`, education);
      return response.data.content;
    } catch (error) {
      console.error('Error updating education:', error)
    }
  }
)

export const deleteEducation = createAsyncThunk(
  'education/deleteEducation',
  async (id: string) => {
    try {
      const response = await apiInstance.delete(`/education/${id}`);
      return response.data.content;
    } catch (error) {
      console.error('Error deleting education:', error)
    }
  }
)

export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    updateSingleEducation: (state, action: PayloadAction<Education>) => {
      const education = state.education.find(education => education.id === action.payload.id)
      if (education) {
        const index = state.education.indexOf(education)
        state.education[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEducation.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(fetchEducation.fulfilled, (state, action) => {
      state.isLoading = false
      if (typeof action.payload === 'object') {
        state.education = action.payload
        return;
      }
      state.education = action.payload.map((education: any) => ({
        id: education.id,
        school: education.school,
        major: education.major,
        degree: education.degree,
        startDate: education.start_date,
        endDate: education.end_date,
        location: education.location,
        grade: education.grade,
        userId: education.user_id,
      }))
    })
    .addCase(fetchEducation.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(addEducation.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(addEducation.fulfilled, (state, action) => {
      state.isLoading = false
      state.education = [...state.education, action.payload]
    })
    .addCase(addEducation.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(updateEducation.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(updateEducation.fulfilled, (state, action) => {
      state.isLoading = false
      state.education = state.education.map(education => education.id === action.payload.id ? action.payload : education)
    })
    .addCase(updateEducation.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(deleteEducation.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    .addCase(deleteEducation.fulfilled, (state, action) => {
      state.isLoading = false
      state.education = state.education.filter(education => education.id !== action.payload.id)
    })
    .addCase(deleteEducation.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})
export const { updateSingleEducation } = educationSlice.actions;

export const selectEducation = (state: RootState) => state.education.education;
export const selectIsEducationLoading = (state: RootState) => state.education.isLoading;

export default educationSlice.reducer;