
import {  useSelector } from "react-redux"



export const useGetDatosEncuesta = () =>{
    console.log('PERO BUENO!')
    const {index, titulo,poblacion,descripcion,fechaCierre,preguntas} = useSelector(state => state.crearEncuesta);
    

    
    


    return {
        index,
        titulo      ,
        poblacion   ,
        descripcion ,
        fechaCierre ,
        preguntas   
    }
}