import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { apiInstance } from '@/utils/apiInstance';


interface ProjectState {
  projects: Project[],
  loading: boolean,
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
}

export const fetchProjects = createAsyncThunk('project/fetchProjects', async () => {
  try {
    const response = await apiInstance.get('/projects');
    return response.data.content;
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
});

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false
      })
  }
});

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectIsProjectLoading = (state: RootState) => state.projects.loading;

export default projectSlice.reducer;