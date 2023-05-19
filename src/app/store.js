import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedAuthReducer from '../features/userSlice';
import mailReducer from '../features/mailSlice';

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
