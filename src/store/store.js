import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { crearSlice } from './crearEncuesta';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crearEncuesta: crearSlice.reducer
  },
})