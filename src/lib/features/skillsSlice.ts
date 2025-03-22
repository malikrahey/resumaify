import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { apiInstance } from '@/utils/apiInstance'

type SkillsState = {
  skills: string[]
  isLoading: boolean
  error: string | null
}

const initialState: SkillsState = {
  skills: [],
  isLoading: false,
  error: null,
}

export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async () => {
    try {
      const response = await apiInstance.get('/skills');
      return response.data.content;
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }
)

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkills.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchSkills.fulfilled, (state, action) => {
      state.isLoading = false
      state.skills = action.payload
    })
    builder.addCase(fetchSkills.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const selectSkills = (state: RootState) => state.skills.skills;
export const selectIsSkillsLoading = (state: RootState) => state.skills.isLoading;

export default skillsSlice.reducer