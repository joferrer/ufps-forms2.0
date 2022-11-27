import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Input } from '@mui/material';
import { AddOutlined, SaveOutlined } from '@mui/icons-material';
import { Tabla } from '../components';
import { UfpsFormsLayout } from '../layout/UfpsFormsLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { useDispatch, useSelector } from 'react-redux';
import { startCargarEncuestadosPorPoblacion, startResgistrarEncuestadosAPoblacion, startSetPoblaciones } from '../../store/poblaciones';

import readXlsxFile from 'read-excel-file';


export const PoblacionPage = () => {

  const location = useLocation();
  const {search} = location;
  const dispatch = useDispatch();
  const {poblaciones} = useSelector(state => state.poblaciones);
  const [listaPoblacion, setListaPoblacion] = useState([]);
  const [poblacion,setPoblacion] = useState([]);
  const [modificado, setModificado] = useState(false);


  const traerPoblaciones =  async()=>{
    await dispatch( startSetPoblaciones());
    console.log(poblaciones)
    await traerEncuestados();
     
  }
  const traerEncuestados = async()=>{
    await poblaciones.forEach(async (p) =>  await dispatch(startCargarEncuestadosPorPoblacion(p.id_poblacion)));
  }
  const vistaPoblacion = ()=>{
      let pobl = [];
      for (let i = 0; i < poblaciones.length; i++) {
        const p = poblaciones[i];
        pobl[i] = {
            id_poblacion: p.id_poblacion,
            nombre: p.nombre,
            cantidad: p.listaEncuestados.length,
            link: `/poblacion?p=${i}`,
            eliminar: 'true'
        }

        
      }
      setPoblacion(pobl);
  }
  
  const presentarPoblaciones = ()=>{
      
    if(search  != ''){
      const busqueda = Number(search.charAt(search.length-1)) ;

      if(busqueda < poblaciones.length){
        const p = poblaciones[busqueda];
        const encuestadosDePoblacion = p.listaEncuestados;
        let retornar = [];
        encuestadosDePoblacion.forEach((item, index) =>{
            retornar[ index] = {
                nombre: item.nombre,
                correo: item.correo
            }
        });
        setListaPoblacion(retornar); 
  
      }
      
    }
  }


  useEffect(() => {
    if(poblacion.length === 0){
        traerPoblaciones();       
    }
    if(search != ''){
      presentarPoblaciones();
    }
    vistaPoblacion();
  }, [poblaciones, search])


  

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
    setListaPoblacion([...listaPoblacion, ...nuevaPoblacion]);
    setModificado(true);
    
  }

  const onGuardarPoblacion = async ()=>{
      //TODO: GUARDAR POBLACIÓN
      
      if(search != ''){
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        const busqueda = Number(search.charAt(search.length-1));
        const poblacion = poblaciones[busqueda].id_poblacion;
        console.log("que esta pasando" + poblacion)
        await dispatch(await startResgistrarEncuestadosAPoblacion(listaPoblacion, poblacion));

      }
  }
  return (
    <UfpsFormsLayout >
        <Box
          sx={{marginBottom: 2}}
        >
        {
            search === '' ? <Button><AddOutlined/>Agregar Población</Button>
            : 
              <Input 
                type="file"
                multiple={ false }
                onChange={ readFile }
              />

          }

          {
            modificado ? <Button onClick={onGuardarPoblacion}><SaveOutlined/>Guardar Cambios</Button>: <></>
          }
        </Box>
          
         
          {poblaciones.length === 0 ?  <NothingSelectedView/>:
              search ==='' ?
              <Tabla cabeceras = {['ID','Población','Cantidad','Ver','Eliminar']} filas={poblacion} /> 
              :
              <Tabla cabeceras = {['Nombre','Correo']} filas={listaPoblacion} />
          }
           
    </UfpsFormsLayout>
  )
}
