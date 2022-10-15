import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Tabla } from "../components";
import { UfpsFormsLayout } from "../layout/UfpsFormsLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"

const poblaciones = [{nombre : 'Estudiantes', cantidad: 0,link: `<Link href="#" underline="none">
{'underline="none"'}
</Link>`}, {nombre: 'profesores', cantidad: 0}, {nombre: 'Graduados', cantidad: 0}]

const poblacion = [{nombre: 'Jeison Ferrer', correo: 'jeisonomarfort@ufps.edu.co'}]

export const PoblacionPage = () => {

  const location = useLocation();
  const {search} = location;
  //console.log(search.charAt(search.length-1) === '');
  //console.log(search === '')

  const readFile = (e)=>{
    console.log(e);
  }


  return (
    <UfpsFormsLayout >
          {
            search === '' ? <Button>Cargar población</Button>:<input 
            type="file"
            multiple={ false }
            onChange={ readFile }
          />
          }

          {poblaciones.length === 0 ?  <NothingSelectedView/>:
              search ==='' ?
              <Tabla cabeceras = {['Población','Cantidad','Ver','Eliminar']} filas={poblaciones} /> 
              :
              <Tabla cabeceras = {['Nombre','Correo']} filas={poblacion} />
          }
           
    </UfpsFormsLayout>
  )
}
