import { createSlice } from "@reduxjs/toolkit";

export const crearSlice = createSlice({
    name: 'crearEncuesta',
    initialState: {
        index: 0,
        titulo: '',
        poblacion: 0,
        decripcion:'',
        fechaCierre: new Date(Date.now()).toISOString(),
        preguntas: [{
            indice: 0,
            enunciado: 'Pregunta 1',
            opciones: [{
                valor: 0,
                texto: 'Opcion 1'
            }]
        }]
    },

    reducers:{
        /**
         * Cambiar el titulo de la encuesta
         * @param {*} state 
         * @param {*} payload contiene el nuevo titulo de la encuesta. 
         */
        cambiarTitulo: (state,{ payload })=>{
            state.titulo = payload.titulo;
        },
        /**
         * Agrega una nueva pregunta con una estructura basica. 
         * @param {*} state 
         */
        agregarPregunta: (state)=>{
            const nuevaPregunta = {
            indice: state.preguntas.length,
            enunciado: `Pregunta ${state.preguntas.length}`,
            opciones: [{
                valor: 0,
                texto: 'Opcion 1'
            }]
        }
            state.preguntas = [...state.preguntas , nuevaPregunta];
        }, 
        /**
         * Recibe el indice de la pregunta que se va a eliminar. 
         * @param {*} state 
         * @param {*} indice Indice de la pregunta a eliminar.
         */
        eliminarPregunta: (state,{ payload })=>{

            const preguntas = state.preguntas.filter(
                (pregunta)=> pregunta.indice !== payload.indice);     

            state.preguntas = preguntas;

        },
        /**
         * Cambia el enunciado de la pregunta con el indice dado.
         * @param {*} state 
         * @param {payload} payload Contiene el nuevo enunciado y el indice.
         */
        cambiarEnunciado: (state,{payload})=>{
            console.log(payload)
            state.preguntas[payload.index].enunciado = payload.enunciado; 
        },


        modificarOpcion: (state, {payload})=>{
            state.preguntas[payload.indice].opciones[payload.valor] = payload.opcion;
        },

        agregarOpcion: (state, {payload}) =>{
            const opciones = state.preguntas[payload.indice].opciones;
            const nuevaOpcion = {
                valor: opciones.length,
                texto: `Opcion ${opciones.length}`
            }
            state.preguntas[payload.indice].opciones = [... opciones, nuevaOpcion]
        },
        /**
         * Elimina la ultima opción de la lista.
         * @param {} state 
         * @param {indice} param1 indice de la pregunta a la que pertenecen las opciones. 
         */
        eliminarOpcion: (state,{payload})=>{
            state.preguntas[payload.indice].opciones.pop();
        },

        publicarEncuesta: (state,{ payload })=>{
            
            state.titulo = payload.titulo;
        }


    }
})

export const {
    cambiarTitulo,
    cambiarEnunciado,
    agregarPregunta,
    publicarEncuesta, 
    modificarOpcion,
    agregarOpcion,
    eliminarOpcion,
} = crearSlice.actions;