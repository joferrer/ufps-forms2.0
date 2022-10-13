
import { 
    agregarPregunta,
    cambiarTitulo,
    publicarEncuesta, 
    cambiarEnunciado, 
    modificarOpcion,
    agregarOpcion,
    eliminarOpcion,
    cambiarFechaDeCierre,
    cambiarPoblacion,
    cambiarDescripcion,
} from "./"

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

export const startCambiarEnunciado = (index, enunciado='' )=>{
    console.log("okkdclksmvñsd: "+ index + " - "+ enunciado )
    return dispatch => dispatch(cambiarEnunciado({index,enunciado}));
}

export const startModificarOpcion = (indice, valor ,opcion) =>{
    return dispatch => dispatch(modificarOpcion({indice,valor,opcion}));
}

export const startAgregarOpcion = (indice)=>{
    return dispatch => dispatch(agregarOpcion({indice}))
}

export const startEliminarOpcion = (indice)=>{
    return dispatch => dispatch(eliminarOpcion({indice}))
}

export const startCambiarFechaCierre = (fechaCierre)=>{
    return dispatch => dispatch(cambiarFechaDeCierre({fechaCierre}))
}

export const startCambiarPoblacion = (poblacion)=>{
    return dispatch => dispatch(cambiarPoblacion({poblacion}))
}

export const startCambiarDescripcion = (descripcion)=>{
    return dispatch => dispatch(cambiarDescripcion({descripcion}));
}

export const startPublicarEncuesta = ()=>{

}

