import React, { useState } from 'react'
interface props {
  
  handlerEliminar: () => void
}
const ConfirmDialog = ({  handlerEliminar }: props) => {

  return (
    <>
      <div className="modal fade" id="modalDialog" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Pregunta de Confirmacion</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <p>Seguro desea Eliminar el Registro</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handlerEliminar} data-bs-dismiss="modal">SI</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">NO</button>
            </div>
          </div>
        </div>
      </div>


    
    

    </>
  )
}

export default ConfirmDialog
