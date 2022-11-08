import { useState,memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { UfpsFormsLayout } from '../layout/UfpsFormsLayout';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SaveOutlined } from '@mui/icons-material';
import { Preguntas } from '../components';


import { startCambiarDescripcion, startCambiarFechaCierre, startCambiarPoblacion, startCambiarTituloEncuesta, startPublicarEncuesta } from '../../store/crearEncuesta';

import {useGetDatosEncuesta} from '../../hooks'
import { useMemo } from 'react';
import { startSetPoblaciones } from '../../store/poblaciones/thunksPoblaciones';
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

export const CrearFormPage = memo(() => {

  const [formSubmitted, setformSubmitted] = useState(false);
  const {nombre, descripcion , formState, nombreValid, descripcionValid, onInputChange} = useForm(initialState);
  const [poblacion, setPoblacion] = useState('');
  const [fechaCierre, setFechaCierre] = useState(fechaActual);
  const [errorFormulario, setErrorFormulario] = useState(false);
  const datosEncuesta = useGetDatosEncuesta();
  const {poblaciones} = useSelector(state => state.poblaciones);
  const location  = useLocation();


  const dispatch = useDispatch();
  
 
  

  const handleChange = (event) => {
    dispatch(startCambiarPoblacion(event.target.value));
    setPoblacion(event.target.value);
    
  };

  const onSubmit = async (event)=>{
    event.preventDefault();
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
 
      

  }

  return (
    <UfpsFormsLayout >
          {
            errorFormulario ? <Alert severity="error">Por favor, revice que todos los campos fueron devidamente diligenciados</Alert>:''

          }
           <form onSubmit={onSubmit}>
              <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth  error={poblacion === ''}>
                        <InputLabel id="demo-simple-select-label">Población</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={poblacion}
                          label="Población"
                          onChange={handleChange}
                        >
                          <MenuItem value={9}>Estudiantes</MenuItem>
                          <MenuItem value={10}>Profesores</MenuItem>
                          <MenuItem value={11}>Graduados</MenuItem>
                        </Select>
                        <FormHelperText>{errorFormulario? 'Por favor, seleccione una población':''}</FormHelperText>
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                          label="Fecha de cierre"
                          renderInput={(params) => <TextField {...params} />}
                          value={fechaCierre}
                          onChange={(newValue) => {
                            setFechaCierre(newValue);
                          }}
                          minDateTime={fechaActual}
                        />
                        </LocalizationProvider>
                        <FormHelperText>{fechaCierre.isBefore(fechaActual) ? 'Por favor, seleccione una fecha posterior a la actual':''}</FormHelperText>
                      </FormControl>
                    </Box>
              </Grid>
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
                      Publicar
                    </Button>
                    
                  </Box>
                  
              </Grid>

           </form>
    </UfpsFormsLayout>
    
  )
}
)