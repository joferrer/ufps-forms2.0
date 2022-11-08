import { SideBar } from "../../ui"
import Typography from '@mui/material/Typography'
import { CrearFormPage } from "./CrearFormPage"
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabla } from "../components"
import { startLoadingEncuestas } from "../../store/encuestas"
import { startCargarEncuestadosPorPoblacion, startSetPoblaciones } from "../../store/poblaciones/thunksPoblaciones"



export const FormsPage = () => {

  const dispatch = useDispatch();
  const {encuestas} = useSelector(state => state.encuestas);
  const {poblaciones} = useSelector(state => state.poblaciones);

  const cargarEncuestas = ()=>{
    dispatch(startLoadingEncuestas());
  }
  const cargarPoblaciones = ()=>{
    dispatch(startSetPoblaciones());
  }

  useEffect(() => {
    cargarEncuestas();
    cargarPoblaciones();
  
    
  }, [])
      

  return (
    <>
        <UfpsFormsLayout >
          {
            encuestas.length === 0 ? <NothingSelectedView/>
            :<Tabla cabeceras={['ID','Titulo','Población','Decripción','Fecha de cierre']} filas={encuestas}></Tabla>
          }
          
           
        </UfpsFormsLayout>
        

        
    </>
  )
}
