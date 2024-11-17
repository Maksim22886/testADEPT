import { Middleware } from '@reduxjs/toolkit';

export const saveStateMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const result = next(action);
    try {
      const stateToSave = storeAPI.getState().companies;
      localStorage.setItem('companiesState', JSON.stringify(stateToSave));
    } catch (err) {
      console.error('Could not save state', err);
    }
    return result;
  };
