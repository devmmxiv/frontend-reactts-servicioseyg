import React, { useState } from 'react'
import { IDireccion, ETipoDireccion } from '../../interfaces/IDireccion'
import Departamento from '../../shared/Departamento'
import ComponenteDirecciones from './ListadoDirecciones'
import { IMunicipio } from '../../interfaces/iMunicipio'
import Componente from './Direccion'
import Direccion from './Direccion'
import ListadoDirecciones from './ListadoDirecciones'
interface props {
  children?: React.ReactNode
    direcciones:IDireccion[]
    ManejadorDirecciones:(direccion:IDireccion,accion:number)=>void
  }

 let address:IDireccion= 
    {
      id: 0,
      direccionCompleta: "",
      calle: 0,
      avenida: 0,
      zona: 0,
      tipoDireccion:ETipoDireccion.PRINCIPAL,
      municipio:{
        id: 0
      }
    }


const MainDirecciones
 = ({direcciones,ManejadorDirecciones}:props) => {
  //alerta
 

  const [actualizarDireccion,setActualizarDireccion]=useState<boolean>(false)

  const [direccion,setDireccion]=useState<IDireccion>(address) 
  

  const onUpdateDireccion=(direccion:IDireccion)=>{
    setActualizarDireccion(true)
     setDireccion(direccion)
  }

  const onNuevaDireccion=()=>{
    setActualizarDireccion(false)
    setDireccion(address)
  }
  const onchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let nombre=e.target.name;
    let value=e.target.value;
    setDireccion({...direccion,[nombre]:value})
  }
  const onselect=(e:React.ChangeEvent<HTMLSelectElement>)=>{

   if(e.target.name==='tipoDireccion'){
    let nombre=e.target.name;
    console.log(nombre)
    setDireccion({...direccion,[nombre]:e.target.value})

   }else{
    const id:number=Number(e.target.value)
    const  m:IMunicipio={id:id,nombre:e.target[e.target.selectedIndex].textContent?.toString()}
    direccion.municipio.id=id;
   setDireccion({...direccion, municipio:m})

   }

  }
  //datosdireccion
  const onButtonSaveDireccion=(actualizar:Boolean)=>{
   

    ManejadorDirecciones(direccion,1);
  }
  return (
    <div>
       <div className="card-header">
        Datos de direccion del cliente   
      </div>
      <div className="card-body">
        <Direccion direccion={direccion} onchange={onchange} onselect={onselect}
         onNuevaDireccion={onNuevaDireccion}
         actualizar={actualizarDireccion}
          ManejadorDirecciones={ManejadorDirecciones}
          direcciones={direcciones}
         
         ></Direccion>
        <ListadoDirecciones direcciones={direcciones} onUpdateDireccion={onUpdateDireccion} ManejadorDirecciones={ManejadorDirecciones} ></ListadoDirecciones>
      </div>

    </div>
  )
}

export default MainDirecciones

