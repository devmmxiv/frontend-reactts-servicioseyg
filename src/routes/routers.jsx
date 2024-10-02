
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from '../utils/ProtectedRoutes'
import Home from '../pages/home/Home'
import Login from '../pages/auth/Login'
import Cliente from '../pages/cliente/Cliente'
import Recoleccion from "../pages/recoleccion/Recoleccion";
import { useAuth } from "../pages/hooks/useAuth";
import Proceso from '../pages/procesos/Proceso'
import Reporte from "../pages/reportes/reporte";

const MisRutas = () => {
  const {logged}=useAuth()
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes
            canActivate={logged}
            redirectPath="/home"
          />
        }
      >

        <Route path="/home" exact={true} Component={Home}></Route>
        <Route path="/cliente" exact={true} Component={Cliente}></Route>
        <Route path="/recoleccion" exact={true} Component={Recoleccion}></Route>
        <Route path="/proceso" exact={true} Component={Proceso}></Route>
        <Route path="/reportes" exact={true} Component={Reporte}></Route>
      </Route>
      <Route path="/login" exact={true} Component={Login}></Route>
    </Routes>
  )
}

export default MisRutas