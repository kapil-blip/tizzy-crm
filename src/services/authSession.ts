import { apiClient } from './apiservices/api';
import { authApi } from './apiservices/authApi';
import { userStorage } from './storage/userStorage';
import { reset } from '../navigation/NavigationService';
import { logout as logoutAction } from '../store/slices/authSlice';
import { store } from '../store/store';

export async function performLogout(options?: { skipApi?: boolean }) {
  if (!options?.skipApi) {
    try {
      await authApi.logout();
    } catch {
      // Continue clearing local session even if API fails.
    }
  }

  await apiClient.clearToken();
  await userStorage.clearUserId();
  store.dispatch(logoutAction());
  reset('Login');
}
