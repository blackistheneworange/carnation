import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AuthState {
  authenticated: boolean,
  user_type: string,
  loading: boolean,
  attempted_auth: boolean
}

const initialState: AuthState = {
    authenticated: false,
    user_type: 'guest',
    loading: false,
    attempted_auth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<any>) => {
      state.authenticated = action.payload.authenticated;
      state.user_type = action.payload.user_type;
      state.loading = false;
      state.attempted_auth = true;
    },
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    login: (state, action: PayloadAction<any>) => {
      state.authenticated = action.payload.authenticated;
      state.attempted_auth = true;
      state.loading = false;
      state.user_type = action.payload.user_type
    }
  },
})

export const { setAuthData, setLoadingState, login } = authSlice.actions

export const selectAuthState = (state: RootState) => state.auth

export default authSlice.reducer