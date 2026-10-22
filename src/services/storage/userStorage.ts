import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'tizzycrm.user_id';

export const userStorage = {
  async saveUserId(userId: number | string | null | undefined): Promise<void> {
    if (userId == null || String(userId).trim() === '') return;
    try {
      await AsyncStorage.setItem(USER_ID_KEY, String(userId));
    } catch {
      // Best-effort.
    }
  },

  async getUserId(): Promise<number | null> {
    try {
      const raw = await AsyncStorage.getItem(USER_ID_KEY);
      if (!raw) return null;
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    } catch {
      return null;
    }
  },

  async clearUserId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_ID_KEY);
    } catch {
      // Best-effort.
    }
  },
};
