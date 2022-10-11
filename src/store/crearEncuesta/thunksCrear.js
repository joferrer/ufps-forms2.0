
import { agregarPregunta,cambiarTitulo,publicarEncuesta } from "./"

export const startCambiarTituloEncuesta = (titulo)=>{
    return (dispatch)=>{
        dispatch(publicarEncuesta({titulo}));
    }
}

export const startCrearPregunta = ()=>{
    return (dispatch) =>{
        dispatch(agregarPregunta())
    }
} 

