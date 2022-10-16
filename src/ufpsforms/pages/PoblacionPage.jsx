import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';
import { Tabla } from '../components';
import { UfpsFormsLayout } from '../layout/UfpsFormsLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import readXlsxFile from 'read-excel-file';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetPoblaciones } from '../../store/poblaciones';




const poblaciones = [{nombre : 'Estudiantes', cantidad: 0,link: `<Link href="#" underline="none">
{'underline="none"'}
</Link>`}, {nombre: 'profesores', cantidad: 0}, {nombre: 'Graduados', cantidad: 0}]

const poblacionInit = [{nombre: 'Jeison Ferrer', correo: 'jeisonomarfort@ufps.edu.co'}]

export const PoblacionPage = () => {
  const location = useLocation();
  const {search} = location;
  const dispatch = useDispatch();
  const {poblaciones} = useSelector(state => state.poblaciones);


  const [poblacion,setPoblacion] = useState(poblaciones);
  const [modificado, setModificado] = useState(false);
  //console.log(search.charAt(search.length-1) === '');
  //console.log(search === '')


  const traerPoblaciones = ()=>{
     dispatch(startSetPoblaciones());
  }

  useEffect(() => {
    traerPoblaciones();
  
  }, [])
  


  const guardarPoblacion = ()=>{

  }

  const readFile = async (e)=>{
    const file = e.target.files[0];
    if ( !file ) return;

    const archivo = await readXlsxFile(file);
    //console.log(archivo);

    let nuevaPoblacion = [];
    for (let i = 2; i < archivo.length; i++) {
      const fila = archivo[i];
      nuevaPoblacion[i-2] = {
        nombre: fila[0],
        correo: fila[1]
      }
      
    }
    console.log(nuevaPoblacion);
    setPoblacion(nuevaPoblacion);
    setModificado(true);

  }


  return (
    <UfpsFormsLayout >
        <Box
          sx={{marginBottom: 2}}
        >
        {
            search === '' ? <></>
            : 
              <Input 
                type="file"
                multiple={ false }
                onChange={ readFile }
              />

          }

          {
            modificado ? <Button><SaveOutlined/>Guardar Cambios</Button>: <></>
          }
        </Box>
          
         
          {poblaciones.length === 0 ?  <NothingSelectedView/>:
              search ==='' ?
              <Tabla cabeceras = {['Población','Cantidad','Ver','Eliminar']} filas={poblaciones} /> 
              :
              <Tabla cabeceras = {['Nombre','Correo']} filas={poblacion} />
          }
           
    </UfpsFormsLayout>
  )
}
