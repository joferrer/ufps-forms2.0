
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TablaEncuestas } from "../components"
import { startLoadingEncuestas } from "../../store/encuestas"
import { startSetPoblaciones } from "../../store/poblaciones/thunksPoblaciones"



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
            :<TablaEncuestas cabeceras={['ID','Titulo','Población','Decripción','Fecha de cierre','Eliminar']} filas={encuestas}></TablaEncuestas>
          }
          
           
        </UfpsFormsLayout>
        

        
    </>
  )
}
