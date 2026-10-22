import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UiState = {
  loader: {
    visible: boolean;
    transparent: boolean;
  };
  toast: {
    message: string;
    title: string;
    type: 'success' | 'error' | 'info' | 'warning' | null;
    key: number;
  };
};

const initialState: UiState = {
  loader: {
    visible: false,
    transparent: false,
  },
  toast: {
    message: '',
    title: '',
    type: null,
    key: 0,
  },
};

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    showLoader: (
      state,
      action: PayloadAction<{ transparent?: boolean } | undefined>,
    ) => {
      state.loader.visible = true;
      state.loader.transparent = action.payload?.transparent ?? false;
    },
    hideLoader: state => {
      state.loader.visible = false;
      state.loader.transparent = false;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: NonNullable<UiState['toast']['type']>;
        title?: string;
      }>,
    ) => {
      state.toast.message = action.payload.message;
      state.toast.type = action.payload.type;
      state.toast.title = action.payload.title?.trim() ?? '';
      state.toast.key += 1;
    },
    hideToast: state => {
      state.toast.message = '';
      state.toast.title = '';
      state.toast.type = null;
    },
  },
});

export const { showLoader, hideLoader, showToast, hideToast } =
  viewSlice.actions;

export default viewSlice.reducer;
