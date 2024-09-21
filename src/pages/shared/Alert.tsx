import React from 'react'
interface props {
    show: Boolean
    mensaje:String
    toogle:()=>void
}
const Alert = ({ show ,toogle,mensaje}: props) => {
    return (
        <>
            {show && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Alerta!</strong> {mensaje}
                    <button type="button"  onClick={()=>toogle()} className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
            )
            }
        </>
    )
}

export default Alert
