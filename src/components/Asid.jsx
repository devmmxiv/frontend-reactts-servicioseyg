
import { Link, NavLink } from "react-router-dom";
const Asid = () => {
  return (

   <>
    <nav className="sidebar">
      <div className="">
        <div className="ml-1">
        <ul>
            <li id="1" className="mt-3 mb-3">
            <NavLink to="/home" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ">
          <i className="fa fa-home me-2  " aria-hidden="true"></i><strong>Inicio</strong>
            </NavLink>
            </li>
            <li id="2" className="mb-3"  >
            <NavLink to="/cliente" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ">
            <i className="bi bi-person-add me-2 " aria-hidden="true"></i>Clientes
            </NavLink>
            </li>
            <li id="3" className="mb-3">
           
            <NavLink to="/recoleccion" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <p><i className="bi bi-box-fill me-2 "></i>Recoleccion y Entrega</p>
            </NavLink>
   
            </li>
         </ul>
        </div>
      </div>
    </nav>
    </>
  )
      {/* 
<div className='sidebar bg-light'>
        
 
         <ul>
            <li id="1">
            <NavLink to="/home" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <i className="fa fa-home me-2 " aria-hidden="true"></i>Inicio
            </NavLink>
            </li>
            <li id="2">
           
            <NavLink to="/recoleccion" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
            <i className="bi bi-box-fill me-2"></i>Recoleccion y Entrega
            </NavLink>
   
            </li>
         </ul>
    
    </div>*/}

}

export default Asid