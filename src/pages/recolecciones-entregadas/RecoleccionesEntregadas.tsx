import React, { useEffect, useState } from 'react'
import { useCrudRecoleccion, } from '../hooks/useCrudRecoleccion'
import { ESTATUSRECOLECCION, IEntrega } from '../interfaces/IRecoleccionEntrega'
import { Pagination, Table } from 'react-bootstrap'
import { currencyFormatter, dateFormatter } from '../../utils/utilidades'
import { IEmpleado } from '../interfaces/IEmpleado'

import { EmpleadosProvider } from '../../context/EmpleadosContext'
import ModalRecoleccion from '../recoleccion-new/ModalRecoleccion'
import ModalRecoleccion1 from '../recoleccion-new/ModalRecoleccion1'
import ListadoRecolecciones from '../recoleccion-new/ListadoRecolecciones'
const initEmpleado: IEmpleado = {
  id: 0,
  codigoEmpleado: '',
  nombre: '',
  apellido: '',
  telefono: '',
  estado: false
}
const RecoleccionesEntregadas = () => {
  const [show,setShow]=useState(false);
  const {recoleccionesEntregadasNoCerradas,handleSetRecoleccionesEntregadas,handleRecoleccionesEntregadasNoCerradas,entrega}=useCrudRecoleccion()
  const [temporalRecolecciones, setTemporalRecolecciones] = useState<IEntrega[]>([])
const [busqueda,setBusqueda]=useState("");

const hideModal=()=>{
  setShow(false);
}
const openModal=()=>{
  
  setShow(true);
}
const filtro = () => {

  const filtroRecolecciones = temporalRecolecciones.filter(
    c => {
      return (
        c.empleadoAsignado.nombre!
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        c
          .empleadoAsignado.apellido!
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      );
    }
  );

  if (busqueda.length == 0) {
    handleSetRecoleccionesEntregadas(temporalRecolecciones);
  } else {

    handleSetRecoleccionesEntregadas(filtroRecolecciones);
  }

}

  useEffect(()=>{
 
    handleRecoleccionesEntregadasNoCerradas();

    setTemporalRecolecciones(recoleccionesEntregadasNoCerradas)
  },[])
  return (
<>
   <div className="container-fluid">

        <p className="text-left h1 mt-2">Entregadas sin Cierre <h6>Aun se pueden modificar. Si usted realizar el cierre ya no se podran modificar</h6></p>
        <div className="row">
           

                  </div>
    
        <ListadoRecolecciones      openModal={openModal}   entregas={recoleccionesEntregadasNoCerradas} entregadas={true} 
                  ></ListadoRecolecciones>

      
      </div>

      <EmpleadosProvider>
      <ModalRecoleccion1 show={show}   hideModal={hideModal} ></ModalRecoleccion1>
      </EmpleadosProvider>

</>

  )
}

export default RecoleccionesEntregadas