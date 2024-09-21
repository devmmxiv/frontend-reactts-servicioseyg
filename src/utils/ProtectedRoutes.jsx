import {Navigate,Outlet} from 'react-router-dom'

const ProtectedRoutes = ({
    canActivate,redirecPath='/login'
}) => {
    console.log('protectesdroutes')
    if(!canActivate){
        console.log('cantActivate',canActivate);
        return <Navigate to={redirecPath}></Navigate>
    }

  return <Outlet></Outlet>
}

export default ProtectedRoutes
