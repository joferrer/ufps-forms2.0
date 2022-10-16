import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { crearSlice } from './crearEncuesta';
import { encuestasSlice } from './encuestas';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crearEncuesta: crearSlice.reducer,
    encuestas: encuestasSlice.reducer
  },
})