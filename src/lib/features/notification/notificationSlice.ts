import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface NotificationState {
  message: string,
  type: string,
  open: boolean
}

const initialState: NotificationState = {
    message: '',
    type: 'info',
    open: false
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<any>) => {
      state.message = action.payload.message;
      state.open = true;
      state.type = action.payload.type || 'info';
    },
    hideNotification: (state) => {
      state.open = false;
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const selectNotificationState = (state: RootState) => state.notification

export default notificationSlice.reducer