

import Profile from '../pages/auth/Profile';

const NavBar = () => {



  //<img src={logo}  width="30" height="24" className="d-inline-block align-text-top "/>
  return (

        <div className="navbar navbar expand-lg bg-light m-1">
        <div className="container-fluid">
        <a className="navbar-brand me-auto" href="#"> <i className="fa fa-tags m-2" aria-hidden="true"></i><strong>Servicios EyG</strong></a>
        <Profile  ></Profile>
          <a  className="navbar-brand ml-auto" href="#"> </a >

          <div className="vr m-2"></div>
          <a href="#" className="navbar-brand ml-auto "><i className="fa fa-power-off m-2" aria-hidden="true"></i><strong>Salir</strong></a>
 
        </div>
        </div>
  )
  {/*
        <div className="navbar w-100">
    <div className="container-fluid">


          <a className="navbar-brand me-auto" href="#"> <i className="fa fa-tags m-2" aria-hidden="true"></i><strong>Servicios EyG</strong></a>
          <a  className="navbar-brand ml-auto" href="#"><i class="fa fa-user-circle-o m-2" aria-hidden="true"></i><strong>jngalicia</strong> </a >

          <div className="vr m-2"></div>
          <a href="#" className="navbar-brand ml-auto "><i className="fa fa-power-off m-2" aria-hidden="true"></i><strong>Salir</strong></a>
 
                   
      
    </div>
  </div>
    */}
}

export default NavBar