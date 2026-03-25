
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/AuthSlice';
import snackbarSlice from './slices/SnackbarSlice';

const store = configureStore({
    reducer: {
        auth:       authSlice,
        snackbar:   snackbarSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>

export default store