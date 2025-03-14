
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from '../utils/ProtectedRoutes'
import Home from '../pages/home/Home'
import Login from '../pages/auth/Login'
import Cliente from '../pages/cliente/Cliente'
import Recoleccion from "../pages/recoleccion/Recoleccion";
import RecoleccionN from "../pages/recoleccion-new/Recoleccion";
import { useLogin } from "../pages/hooks/useLogin";
import Proceso from '../pages/procesos/Proceso'
import Reporte from "../pages/reportes/reporte";
import RecoleccionesEntregadas from "../pages/recolecciones-entregadas/RecoleccionesEntregadas";




const MisRutas = () => {
  const {userLogin}=useLogin()
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes
            canActivate={userLogin.logged}
            redirectPath="/home"
         
          />
        }
      >
       
        <Route path="/home" exact={true} Component={Home}></Route>
        <Route path="/cliente" exact={true} Component={
          Cliente}></Route>
            <Route path="/recoleccioneporcerrar" exact={true} Component={RecoleccionesEntregadas}></Route>
          
        <Route path="/recoleccion" exact={true} Component={RecoleccionN}></Route>

        
        <Route path="/proceso" exact={true} Component={Proceso}></Route>
        <Route path="/reportes" exact={true} Component={Reporte}></Route>
      </Route>
      <Route path="/login" exact={true} Component={Login}></Route>

    </Routes>
  )
}

export default MisRutas