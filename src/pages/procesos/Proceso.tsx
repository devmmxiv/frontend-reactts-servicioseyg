import React, { useEffect, useState } from 'react'
import ResumenCierre from './componentes/ResumenCierre'
import { IRecoleccion, IRecoleccionResumenCierre } from '../interfaces/IRecoleccionEntrega'
import { api_getDatosCierre, api_getRecoleccionesEstado, api_getRecoleccioneToCierre } from '../api/api_recoleccion/api_recoleccionentrega'
import ResumenRecolecciones from './componentes/ResumenRecolecciones'
import { api_createCierre } from '../api/api_cierre/api_cierre'
import Alert from '../shared/Alert'
import { ICierre } from '../interfaces/ICierre'
const Proceso = () => {
  const [refresh, setRefresh] = useState(false)
  const [datosCierre, setDatosCierre] = useState<IRecoleccionResumenCierre[]>([])
  const [datosRecoleccionesEstado, setDatosRecoleccionesEstado] = useState<IRecoleccionResumenCierre[]>([])
  const [recolecciones, setRecolecciones] = useState<IRecoleccion[]>([])
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState('')
  const [clase, setClase] = useState('')
  const onRefresh = () => {
    setRefresh(!refresh)

  }
  const getRecoleccionesToCierre = async () => {
    const data: IRecoleccion[] = await api_getRecoleccioneToCierre();

    console.log('iniciar con get')

    const r = data.map((d) => {

      return {

        ...d,
        isCerrada: true,
        cerrada:true

      }


    });

    setRecolecciones(r)
  }
  const onChangeCerrada = (id: number, valor: boolean) => {

    const r = recolecciones.map((d) => {
     

      if (d.id === id) {

        return {
          ...d,
          isCerrada: !valor,
          
        }
      }
      return d;
    });

    setRecolecciones(r)

  }
  const handlerCierre = () => {
    const newRecolecciones = recolecciones.filter(x => x.isCerrada === true)

    if (newRecolecciones.length === 0) {
      
      mostrarAlert("No hay recolecciones para realizar el cierre","danger")

    } else {

      const cierre: ICierre = {
        "id": 0,
        recolecciones: newRecolecciones
      }

      crearcierre(cierre)
    }



  }

  const crearcierre = async (cierre: ICierre) => {
    const resp = await api_createCierre(cierre)

    if (resp?.status === 201) {
      mostrarAlert("Cierre Asignado Con Exito", "success")
      onRefresh()
    } else {
      mostrarAlert("No se pudo asignar el cierre ", "danger")

    }
  }
  const mostrarAlert = (mensaje: string, clase: string) => {
    setShow(true)
    setMensaje(mensaje)
    setClase(clase)
  }
  const toggle = () => {
    setShow(false)
  }
  useEffect(() => {

    const obtenerCierre = async () => {
      const data = await api_getDatosCierre();
      setDatosCierre(data)
    }
    const obtenerRecolecionesEstado = async () => {
      const data = await api_getRecoleccionesEstado();
      setDatosRecoleccionesEstado(data)
    }
    obtenerCierre();
    obtenerRecolecionesEstado();
    getRecoleccionesToCierre();
  }, [refresh])

  return (

    <div className='row m-1'>
      <Alert show={show} mensaje={mensaje} clase={clase} toogle={toggle}></Alert>
      <ResumenRecolecciones resumen={datosRecoleccionesEstado}></ResumenRecolecciones>
      <ResumenCierre resumen={datosCierre} onRefresh={onRefresh} 
      handlerCierre={handlerCierre}
        onChangeCerrada={onChangeCerrada}
        recolecciones={recolecciones}
        ></ResumenCierre>


    </div>

  )
}

export default Proceso
