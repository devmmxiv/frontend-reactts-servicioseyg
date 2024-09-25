import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { ICliente } from '../interfaces/ICliente'
interface props{
  cliente:ICliente
}

const PersonaEnvia = ({cliente}:props) => {

  return (
    <div>
      <ul>
      <li>Codigo Cliente   :<strong>{' '}{cliente.codigoCliente}</strong> </li>
        <li>Nombre   :<strong>{' '+cliente.nombre+' '+cliente.apellido}</strong></li>
    
        <li>Telefono :<strong>{' '+cliente.telefono}</strong></li>
        
        <li>
         Direccion:  <strong>{' '+cliente.direcciones[0].direccionCompleta}</strong>
        </li>
        <li>
         Municipio:  <strong>{' '+cliente.direcciones[0].municipio.nombre}</strong>
        </li>
      </ul>
    </div>
  )
}

export default PersonaEnvia
