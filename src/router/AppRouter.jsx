import { Navigate, Route, Routes } from 'react-router-dom';
import { UfpsformRouters } from '../ufpsforms/routers/UfpsformRouters';


export const AppRouter = () => {
    const status = 'authenticated';
  return (
    <Routes>
        {
          status === 'authenticated' ? 
          <Route path="/*" element={<UfpsformRouters/>} />
          :<Route path="/auth/*" element={<UfpsformRouters/>} />
        }

        <Route path="/*" element={<Navigate to ='/'/>} />
    </Routes>
  )
}
