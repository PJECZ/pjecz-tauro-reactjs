
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>

export default store