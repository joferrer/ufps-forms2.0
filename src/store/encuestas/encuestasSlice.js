import { createSlice } from "@reduxjs/toolkit";




export const encuestasSlice = createSlice({
    name: 'encuestas',
    initialState:{
        isLoading: false,
        page:0 , 
        encuestas: [],
        error: ''
    },
    reducers: {
        loadEncuestas: (state) => {
            state.isLoading = true;
        },
        setEncuestas: (state,{payload})=>{
            state.page      = payload.page;
            state.isLoading = false;
            state.encuestas = payload.encuestas;
        },
        setError: (state, {payload})=>{
            state.error = payload.error;
        }

    }
})

export const {
    loadEncuestas,
    setEncuestas,
    setError
} = encuestasSlice.actions;