import {Navigate,Outlet} from 'react-router-dom'

const ProtectedRoutes = ({
    canActivate,redirecPath='/login'
}) => {
    //console.log('protectesdroutes')
    if(!canActivate){

        return <Navigate to={redirecPath}></Navigate>
    }

  return <Outlet></Outlet>
}

export default ProtectedRoutes
