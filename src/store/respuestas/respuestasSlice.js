import { createSlice } from '@reduxjs/toolkit';
export const respuestasSlice = createSlice({
    name: 'respuestas',
    initialState: {
        respuestas: [
           
        ]
    },
    reducers: {
        registrarRespuesta: (state, {payload} ) => {
            if(payload.pregunta == state.respuestas.length){
                const nuevaRespuesta = {
                    indice: payload.indice,
                    pregunta: payload.pregunta,
                    respuesta: payload.respuesta
                }
                state.respuestas = [...state.respuestas, nuevaRespuesta]
            }
            else{
                if(payload.pregunta < state.respuestas.length)
                    state.respuestas[payload.pregunta].respuesta = payload.respuesta;
            }
            
        },
        cambiarRespuesta:  (state, {payload} ) => {
            
            state.respuestas[payload.pregunta].respuesta = payload.respuesta;
        }

        ,
        darRespuestas : (state)=>{
            const respuestas = state.respuestas;
            return respuestas;
        }
    }
});
// Action creators are generated for each case reducer function
export const { registrarRespuesta,cambiarRespuesta, darRespuestas } = respuestasSlice.actions;