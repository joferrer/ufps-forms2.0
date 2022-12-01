import { AddOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Pregunta } from "./Pregunta"
import { memo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { startCrearPregunta } from "../../../store/crearEncuesta"

export const Preguntas = memo(() => {
    
    const dispatch = useDispatch();
    const {preguntas} = useSelector(state => state.crearEncuesta);
    
    const {poblacion} = useSelector(state => state.auth);


    const onAgregarPregunta = ()=>{
        dispatch(startCrearPregunta());
    }


  return (
    <>
        <Typography variant="h5" color="initial">Preguntas</Typography>
        <Grid item xs={12} sx={{ mt: 2 }}>
            {
                preguntas.map((pregunta,index)=>(

                <Pregunta key={index+"- Pregunta "+pregunta.index} pregunta={pregunta} />)
                )
            }
        </Grid>
         <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
          {
            poblacion == 0 ? 
            <Box sx={{ minWidth: 200 }}>
                    <Button color="primary"
                          sx={{padding: 2}}
                          onClick={onAgregarPregunta}
                          >
                      <AddOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Agregar pregunta
                    </Button>
                    
                  </Box>
            :
            <></>
          }
                  

        </Grid>
    </>
    
  )
}
)