
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { UfpsFormsLayout } from '../layout/UfpsFormsLayout';

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AddOutlined, PlusOneOutlined, SaveOutlined } from '@mui/icons-material';

const initialState = {
  id_encuesta : '',
  nombre: '',
  porcentaje: '',
  id_población: '',
  fechaFin: '',
  disponible: true
}

const fechaActual = dayjs(new Date(Date.now()).toISOString());

export const CrearFormPage = () => {

  const [formSubmitted, setformSubmitted] = useState(false);
  const {nombre, descripcion , formState, nombreValid, descripcionValid, onInputChange} = useForm(initialState);
  const [poblacion, setPoblacion] = useState('');
  const [fechaCierre, setFechaCierre] = useState(fechaActual);

  console.log(fechaCierre);


  const handleChange = (event) => {
    setPoblacion(event.target.value);
  };

  const onSubmit = (event)=>{
    event.preventDefault();
    console.log(formState)
  }

  return (
    <UfpsFormsLayout >
           <Typography variant="h3" color="initial">{nombre}</Typography>
           <form onSubmit={onSubmit}>
              <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 200 }}>
                      <FormControl fullWidth  >
                        <InputLabel id="demo-simple-select-label">Población</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={poblacion}
                          label="Población"
                          onChange={handleChange}
                        >
                          <MenuItem value={0}>Estudiantes</MenuItem>
                          <MenuItem value={1}>Profesores</MenuItem>
                          <MenuItem value={2}>Graduados</MenuItem>
                        </Select>
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
              <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 200 }}>
                    <Button color="primary"
                          sx={{padding: 2}}>
                      <AddOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Agregar pregunta
                    </Button>
                  </Box>
              </Grid>

           </form>
    </UfpsFormsLayout>
    
  )
}
