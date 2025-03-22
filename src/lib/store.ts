import { configureStore } from '@reduxjs/toolkit'
import experienceReducer from './features/experienceSlice';
import personalReducer from './features/personalSlice';
import skillsReducer from './features/skillsSlice';
import projectsReducer from './features/projectSlice';
import educationReducer from './features/educationSlice';


export const makeStore = () => {
  return configureStore({
    reducer: {
      experiences: experienceReducer,
      personal: personalReducer,
      skills: skillsReducer,
      projects: projectsReducer,
      education: educationReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']