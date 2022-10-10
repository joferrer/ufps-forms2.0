import { AddOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Pregunta } from "./Pregunta"


export const Preguntas = ({preguntas, setPreguntas}) => {
    
    const onAgregarPregunta = ()=>{
        const nueva = {
            index: preguntas.length,
            enunciado: '',
            opciones: [{
              index: 0,
              texto: 'Opcion 1'
          }]
        }
        setPreguntas([... preguntas, nueva]);
    }
    const onSetPregunta = (index,nueva)=>{
        console.log('PERO BUENO: '+ index +" - "+ nueva.index)
        preguntas[index] = nueva;

        setPreguntas([...preguntas]);
    }

  return (
    <>
        <Typography variant="h5" color="initial">Preguntas</Typography>
        <Grid item xs={12} sx={{ mt: 2 }}>
            {
                preguntas.map((pregunta)=>(

                <Pregunta key={pregunta.index} pregunta={pregunta} setPregunta={onSetPregunta}/>)
                )
            }
        </Grid>
         <Grid item xs={1} sx={{ mt: 1, width: "100%" , display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 200 }}>
                    <Button color="primary"
                          sx={{padding: 2}}
                          onClick={onAgregarPregunta}
                          >
                      <AddOutlined sx={{fontSize: 30, mr: 1 }}/>
                      Agregar pregunta
                    </Button>
                    
                  </Box>

        </Grid>
    </>
    
  )
}
