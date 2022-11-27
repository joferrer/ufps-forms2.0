import { useState,memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { UfpsFormsLayout } from '../../layout/UfpsFormsLayout';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SaveOutlined } from '@mui/icons-material';
import { Preguntas } from '../../components';


import { startCambiarDescripcion, startCambiarFechaCierre, startCambiarPoblacion, startCambiarTituloEncuesta, startPublicarEncuesta } from '../../../store/crearEncuesta';

import {useGetDatosEncuesta} from '../../../hooks'
import { useMemo } from 'react';
import { startSetPoblaciones } from '../../../store/poblaciones/thunksPoblaciones';
import { useLocation } from 'react-router-dom';

const poblacionInit = [{id_poblacion: 9, nombre: ""}]

const initialState = {
  id_encuesta : '',
  nombre: '',
  porcentaje: '',
  id_población: '',
  fechaFin: '',
  disponible: true
}


const fechaActual = dayjs(new Date(Date.now()).toISOString());

export const ResponderEncuesta = memo(() => {

  const [formSubmitted, setformSubmitted] = useState(false);
  const {nombre, descripcion , formState, nombreValid, descripcionValid, onInputChange} = useForm(initialState);
  const [fechaCierre, setFechaCierre] = useState(fechaActual);
  const [errorFormulario, setErrorFormulario] = useState(false);
  const datosEncuesta = useGetDatosEncuesta();
  const {poblaciones} = useSelector(state => state.poblaciones);
  const {poblacion} = useSelector(state => state.auth);
  
  const location  = useLocation();


  const dispatch = useDispatch();
  

  const onSubmit = async (event)=>{
    event.preventDefault();
    /** 
    dispatch(startCambiarTituloEncuesta(nombre));
    dispatch(startCambiarFechaCierre(fechaCierre.toISOString()));
    dispatch(startCambiarDescripcion(descripcion));  

    console.log(fechaCierre.toISOString());
    if(poblacion === '' || fechaCierre.isBefore(fechaActual) ){
      setErrorFormulario(true);
      return;
    }
    
    datosEncuesta.fechaCierre = datosEncuesta.fechaCierre.replace("T"," ");
    datosEncuesta.fechaCierre = datosEncuesta.fechaCierre.replace("Z","");
    datosEncuesta.titulo      = nombre;
    datosEncuesta.descripcion = descripcion;
    
    console.log('Datos encuesta: '+ datosEncuesta);
   const publicarEncuesta = await dispatch(startPublicarEncuesta(datosEncuesta));

   //TODO:HAY UN ERROR, AL PARECER SE PUBLICAN LA ENCUESTAS PERO NO LAS PREGUNTAS NI LAS OPCIONES :(   
    if(!publicarEncuesta.error){
      window.location = "/" 
    }
    setErrorFormulario(true)      
    */
  }

  return (
    <UfpsFormsLayout >
          {
            errorFormulario ? <Alert severity="error">Por favor, revice que todos los campos fueron devidamente diligenciados</Alert>:''

          }
           <form onSubmit={onSubmit}>
        
              <Grid item xs={1} sx={{ mt: 1, width: 200 }}>
                  
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField             
                
                    label="Titulo"
                    type="text"
                    placeholder="Titulo de la encuesta"
                    fullWidth 
                    name= 'nombre'
                    value= { nombre }
                    onChange= { onInputChange }
                    error= { !!nombreValid && formSubmitted}
                    helperText = {nombreValid }
                    disabled={poblacion != 0}

                    />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                    label="Descripción"
                    type="text"
                    placeholder="Descripción de la encuesta"
                    fullWidth 
                    name= 'descripcion'
                    value= { descripcion }
                    onChange= { onInputChange }
                    error= { !!descripcionValid && formSubmitted}
                    helperText = {descripcionValid }
                    multiline
                    minRows={5}
                    disabled={poblacion != 0}
                    />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <Preguntas />
              </Grid>
              <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'flex-end' }}>
                 
                  <Box sx={{ minWidth: 200 }}>
                  <Button color="primary"
                          sx={{padding: 2}}
                          onClick={onSubmit}
                          >
                      <SaveOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Enviar
                    </Button>
                    
                  </Box>
                  
              </Grid>

           </form>
    </UfpsFormsLayout>
    
  )
}
)