import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CrmUser } from '../../services/apiservices/authApi';

interface AuthState {
  token: string | null;
  user: CrmUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ token: string; user: CrmUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateUser: (state, action: PayloadAction<Partial<CrmUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setLogin, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
