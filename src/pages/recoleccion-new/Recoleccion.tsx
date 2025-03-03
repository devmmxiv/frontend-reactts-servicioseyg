import React, { useEffect, useState } from 'react'

import { useCrudRecoleccion } from '../hooks/useCrudRecoleccion'
import SelectSearchCliente from '../shared/select/SelectSearchCliente'
import ClienteEnvia from './ClienteEnvia'
import ListadoRecolecciones from './ListadoRecolecciones'
import { EmpleadosProvider } from '../../context/EmpleadosContext'
import ModalRecoleccion from './ModalRecoleccion'
import ModalRecoleccion1 from './ModalRecoleccion1'


const RecoleccionN = () => {
  const [show,setShow]=useState(false);
  const { envia, handleInicia,handleLimpiarEntrega } = useCrudRecoleccion()

  const openModal=()=>{
  
    setShow(true);
  }
  const hideModal=()=>{

    setShow(false);
  }
  useEffect(() => {
 

    handleInicia()
  }, [])


  return (
    <>
      <div className="flex-container mt-4">
        <div className="row">
          <div className="col-md-12">

            <div className="card">
              <div className="card-header">
                <div className="row">  <p className="text-center h1 mt-2">Recoleccion  de paquetes</p>
                  <SelectSearchCliente></SelectSearchCliente></div>
                <div className="row">
                  <div className="col-8">
                    <ClienteEnvia></ClienteEnvia>
                  </div>
     
                  <div className="col">
                    {envia.id > 0 && (
                      <button type="button" className="btn btn-success" 
                
                      onClick={()=>openModal()}
                      >Asignar Recoleccion</button>
                    )}
                  </div>
                </div>

              </div>
              <div className="card-body">
                {envia.id > 0 && (

                  <ListadoRecolecciones           
                  ></ListadoRecolecciones>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
      {envia.id > 0 && (
        <><EmpleadosProvider>
          <ModalRecoleccion        
          ></ModalRecoleccion>
             <ModalRecoleccion1 show={show}   hideModal={hideModal}     
          ></ModalRecoleccion1>
        </EmpleadosProvider></>
      )}
    </>
  )
}

export default RecoleccionN
