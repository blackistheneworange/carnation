import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice';
import carReducer from './features/car/carSlice';
import notificationReducer from './features/notification/notificationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
        car: carReducer,
        notification: notificationReducer
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']