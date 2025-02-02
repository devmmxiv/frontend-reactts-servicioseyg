import { IUser } from '../pages/interfaces/iUser'

import { AuthContext } from './AuthContext'
import { getMunicipios } from '../pages/api/api_departamento/apimunicipios'

import { useEffect, useState } from 'react'
import { IMunicipio } from '../pages/interfaces/iMunicipio'
import { ETipoDireccion } from '../pages/interfaces/IDireccion'

const user1: IUser = {
       id: 0,
       codigo:'000',
       usuario: '',
       nombre: '',
       apellido: '',
       telefono: '',
       direccion: {
           id: 1,
           direccionCompleta: '',
           calle: 0,
           avenida: 0,
           zona: 0,
           tipoDireccion: ETipoDireccion.PRINCIPAL,
           municipio: {
               id: 1,
               nombre: 'Amatitlan',
             
           },
       },
      
       isCliente:false
}
 
    

interface props {
    children: JSX.Element | JSX.Element[]
}
export const AuthProvider = ({ children }: props) => {
    console.log("Entre al provider")
    const [user,setUsuario]=useState<IUser>(user1)
    const [logged,setLogged]=useState<boolean>(false)
    const [municipios,setMunicipios]=useState<IMunicipio[]>([])

    const listaMunicipioss = async () => {
      
        const d = await getMunicipios();

        if(d !=null){
            setMunicipios(d)
 

        }

    }
    const login = async(user:String, passwd:String)=>{
        

    }
    useEffect(() => {

        listaMunicipioss();
        setLogged(false)
        
      }, []);
    return (
        <>
            <AuthContext.Provider value={{ user,municipios ,logged}} >
                {children}
            </AuthContext.Provider>
        </>
    )
}

