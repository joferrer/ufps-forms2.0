import { useState,memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from '../../../hooks/useForm';
import { UfpsFormsLayout } from '../../layout/UfpsFormsLayout';
import dayjs from 'dayjs';

import { SaveOutlined } from '@mui/icons-material';
import { Preguntas } from '../../components';


import { startCambiarDescripcion, startCambiarFechaCierre, startCambiarPoblacion, startCambiarTituloEncuesta, startPublicarEncuesta } from '../../../store/crearEncuesta';

import {useGetDatosEncuesta} from '../../../hooks'
import { useMemo } from 'react';
import { startSetPoblaciones } from '../../../store/poblaciones/thunksPoblaciones';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { startCargarEncuesta } from '../../../store/crearEncuesta/thunksResponder';
import { ResponderPreguntas } from '../../components/encuestas/ResponderPreguntas';
import { startResponderEncuesta } from '../../../store/respuestas';

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
  const {respuestas} = useSelector(state => state.respuestas);

  const encuestaDatos = useSelector(state => state.crearEncuesta);
  
  const location  = useLocation();
  const {search} = location;
  
  const dispatch = useDispatch();
  
  const datos = useMemo(() => 
        encuestaDatos.preguntas.length == 1 && dispatch(startCargarEncuesta(search.split('=')[1]))
        , []);
  
 

  const onSubmit = async (event)=>{
    event.preventDefault();
    
    const resp = await dispatch(startResponderEncuesta(respuestas));  
    if (!!resp.error){
      setErrorFormulario(true);
      
    }
    else window.location.href = "/";
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
                  <Typography variant='h2'>{datosEncuesta.titulo}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <Typography variant='p'>{datosEncuesta.descripcion}</Typography>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                  <ResponderPreguntas />
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