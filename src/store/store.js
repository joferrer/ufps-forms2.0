import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { crearSlice } from './crearEncuesta';
import { encuestasSlice } from './encuestas';
import { poblacionesSlice } from './poblaciones';
import { respuestasSlice } from './respuestas';


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crearEncuesta: crearSlice.reducer,
    encuestas: encuestasSlice.reducer,
    poblaciones: poblacionesSlice.reducer,
    respuestas: respuestasSlice.reducer,
  },
})