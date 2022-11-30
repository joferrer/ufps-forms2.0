import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { CrearFormPage, EncuestasFinalizadasPage, FormsPage, PoblacionPage, MetricasEncuesta } from "../pages";
import { EncuestasDisponiblesPage } from "../pages/encuestados/EncuestasDisponiblesPage";
import { ResponderEncuesta } from "../pages/encuestados/ResponderEncuesta";

const RoutesAdmin = ()=>{
  const encuesta = '/encuestas';
  const poblacion = '/poblacion';
  return (
    <Routes>

      
        <Route path="/" element={<FormsPage/>}/>
        <Route path={`${encuesta}/crear`} element={<CrearFormPage/>}/>
        <Route path={`${encuesta}/finalizadas`} element={<EncuestasFinalizadasPage/>}/>
        <Route path={`${encuesta}/respuestas`} element={<MetricasEncuesta/>}/>
        <Route path={`${poblacion}`} element={<PoblacionPage/>}/>
        <Route path="/*" element = {<Navigate to="/" />} />
    </Routes>
  )
}

const EncuestadosRoutes = ()=>{

  return (
    <Routes>
        <Route path="/" element={<EncuestasDisponiblesPage/>}/>
        <Route path={`/responder`} element={<ResponderEncuesta/>}/>
        <Route path="/*" element = {<Navigate to="/" />} />
    </Routes>
  )
}

export const UfpsformRouters = () => {

  const {poblacion} = useSelector(state => state.auth);

  return (
    <Routes>

      
        {
          poblacion == 0 ? 
          <Route path="/*" element={<RoutesAdmin/>} />
          :
          <Route path="/*" element={<EncuestadosRoutes/>} />
        }
    </Routes>
  )
}
