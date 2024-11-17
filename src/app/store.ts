import { configureStore, Middleware, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import companiesReducer from './pages/ListCompanies/ListCompaniesSlice';
import { saveStateMiddleware } from './localStorageUtils';

const store = configureStore({
  reducer: {
    companies: companiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStateMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
