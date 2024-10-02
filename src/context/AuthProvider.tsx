import { IUser } from '../pages/interfaces/iUser'

import { AuthContext } from './AuthContext'
import { getMunicipios } from '../pages/api/api_departamento/apimunicipios'

import { useEffect, useState } from 'react'
import { IMunicipio } from '../pages/interfaces/iMunicipio'

const user1: IUser = {
    id: 0,
    usuario: 'jperez',
    nombre: 'Juan Antonio',
    apellido: 'Perez',
    telefono: '5896-9632',
    direccion: '4ta calle 0-69 col el encino zona 5',
    municipio: {
        id: 1,
        nombre: 'Amatitlan',
      
    }
}
 
    

interface props {
    children: JSX.Element | JSX.Element[]
}
export const AuthProvider = ({ children }: props) => {
    const [user,setUsuario]=useState<IUser>(user1)
    const [logged,setLogged]=useState<boolean>(false)
    const [municipios,setMunicipios]=useState<IMunicipio[]>([])

    const listaMunicipios = async () => {
    
        const d = await getMunicipios();
        setMunicipios(d)

    }
    useEffect(() => {
        listaMunicipios();
        setLogged(true)
        
      }, []);
    return (
        <>
            <AuthContext.Provider value={{ user,municipios ,logged}} >
                {children}
            </AuthContext.Provider>
        </>
    )
}

