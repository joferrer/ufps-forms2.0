import { SideBar } from "../../ui"
import Typography from '@mui/material/Typography'
import { CrearFormPage } from "./CrearFormPage"
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabla } from "../components"
import { startLoadingEncuestas } from "../../store/encuestas"



export const FormsPage = () => {

  const dispatch = useDispatch();
  const {encuestas} = useSelector(state => state.encuestas)

  const cargarEncuestas = ()=>{
    dispatch(startLoadingEncuestas());
  }

  useEffect(() => {
    cargarEncuestas();
  
    
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
