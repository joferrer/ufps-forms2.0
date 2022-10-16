import { createSlice } from "@reduxjs/toolkit";


export const poblacionesSlice = createSlice({

    name: 'poblaciones',
    initialState:{
        poblaciones: [],
        error:''
    },

    reducers:{

        setPoblaciones: (state,{payload})=>{
            state.poblaciones = payload.poblaciones;
            state.error = '';
        }, 


        regitrarError: (state,{payload})=>{
            state.error = payload.error;
        },


        /**
         * Elimina una población dada su id.
         * TODO: no creo que sirva esta cosa. 
         * @param {*} state 
         * @param {Number} id ID de la población a eliminar. 
         */
        deletePoblacion: (state,{payload})=>{
            const nuevaPoblacion = state.poblaciones.filter(poblacion => poblacion.id !== payload.id);

            state.poblaciones = nuevaPoblacion;
        }

    }

})

export const {setPoblaciones, regitrarError}= poblacionesSlice.actions;