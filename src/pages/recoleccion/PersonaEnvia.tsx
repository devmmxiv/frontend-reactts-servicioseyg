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
        <li>Nombre   :{cliente.nombre}</li>
        <li>Apellido :{cliente.apellido}</li>
        <li>Telefono :{cliente.telefono}</li>
        
        <li>
          Direccion: {cliente.direcciones[0].direccionCompleta}
        </li>
        <li>
          Municipio: {cliente.direcciones[0].municipio.nombre}
        </li>
      </ul>
    </div>
  )
}

export default PersonaEnvia
