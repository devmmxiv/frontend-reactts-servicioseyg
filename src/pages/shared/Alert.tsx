import React from 'react'
import { clearScreenDown } from 'readline'
interface props {
    show: Boolean
    mensaje:string
    clase:string
    toogle:()=>void
}
const Alert = ({ show ,toogle,mensaje,clase}: props) => {
    //"alert alert-danger alert-dismissible fade show"
    return (
        <>
            {show && (
                <div className= {`alert alert-${clase} alert-dismissible fade show`}      role="alert">
                    <strong>Alerta!</strong> {mensaje}
                    <button type="button"  onClick={()=>toogle()} className="btn-close"  data-bs-dismiss="alert" aria-label="Close" />
                </div>
            )
            }
        </>
    )
}

export default Alert
