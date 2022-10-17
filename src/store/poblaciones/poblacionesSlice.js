import { createSlice } from "@reduxjs/toolkit";


export const poblacionesSlice = createSlice({

    name: 'poblaciones',
    initialState:{
        poblaciones: [],
        error:''
    },

    reducers:{

        setPoblaciones: (state,{payload})=>{
            
            state.poblaciones =  payload.poblaciones;
            state.error = '';
            
        }, 


        regitrarError: (state,{payload})=>{
            state.error = payload.error;
        },

        registrarListaPoblacion: (state, {payload})=>{
            
            let indice= -1;
            for (let i = 0; i < state.poblaciones.length; i++) {
                const p = state.poblaciones[i];
                if(p.id_poblacion === payload.id_poblacion) indice = i;
            }
            console.log("aaaa: "+indice)
            if(indice != -1) state.poblaciones[indice].listaEncuestados = payload.listaEncuestados; // listaEncuestados
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

export const {setPoblaciones, regitrarError, registrarListaPoblacion}= poblacionesSlice.actions;