import { ArrowForwardOutlined, ArrowOutwardOutlined, ArrowRightOutlined, DeleteOutlineOutlined } from "@mui/icons-material"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { startEliminarEncuesta } from "../../../store/encuestas";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const poblaciones = {
    9:  'Graduados',
    10: 'Estudiantes',
    11: 'Docentes'
}

/**
 * Ej: cabecera = [nombre, cantidad]
 * filas = [{nombre : 'Estudiantes', cantidad: 0}, {nombre: 'profesores', cantidad: 0}, {nombre: 'Graduados', cantidad: 0}]
 * @param {*} param0 
 * @returns 
 */
export const TablaFinalizadas = ({cabeceras, filas}) => {

    const {encuestas} = useSelector(state => state.encuestas);
    const {poblacion} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const onDeleteEncuesta = async(event)=>{
        const encuestaAEliminar = filas[event].id_encuestas;
        console.log(encuestaAEliminar);
        const resp = await dispatch(startEliminarEncuesta(encuestaAEliminar));

        console.log(await resp.msg)
        
    }

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {
                        cabeceras.map((titulo, index)=>(
                            <TableCell key={`cabecera-tabla ${index}`}>{titulo}</TableCell>
                        ))
                    }
                </TableRow>
                
            </TableHead>

            <TableBody>
                {
                    filas.map((fila, index)=>(
                        <TableRow
                            key={`fila-tabla: ${index}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                Object.keys(fila).map((valor,index)=>(
                                    valor !== 'link' ?  
                                        valor != 'id_poblacion' ?
                                            <TableCell key={`columna-tabla: ${index}`} >{fila[valor]}</TableCell>
                                            :
                                            <TableCell key={`columna-tabla: ${index}`} >{poblaciones[fila[valor]]}</TableCell>

                                    : 
                                    <TableCell key={`columna-tabla: ${index}`} >
                                        <Link to={`/encuestas/respuestas?p=${fila['id_encuestas']}`}><ArrowForwardOutlined /></Link>
                                    </TableCell>

                                ))
                            }
                            <TableCell key={`columna-tabla: ${index}`} >
                                <Link to={`/encuestas/respuestas?p=${fila['id_encuestas']}`}><ArrowForwardOutlined /></Link>
                            </TableCell>
                            {
                                poblacion == 0 ? 
                                    <TableCell key={`columna-tabla-delete: ${index}`}>
                                        <Button onClick={()=>onDeleteEncuesta(index)}><DeleteOutlineOutlined/></Button>
                                    </TableCell>
                                    :
                                    <></>
                            }
                            
                        </TableRow>                       
                    ))
                    
                }
                
            </TableBody>

        </Table>
    </TableContainer>
  )
}
