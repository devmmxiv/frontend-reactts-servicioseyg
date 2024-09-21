

import { createContext } from 'react';
import { IUser } from '../pages/interfaces/iUser';
import { IDepartamento } from '../pages/interfaces/iDepartamento';
import { IMunicipio } from '../pages/interfaces/iMunicipio';

export interface AuthContextProps{
    user:IUser;
    municipios:IMunicipio[];
    logged:Boolean;

}
export const AuthContext =createContext<AuthContextProps>({} as AuthContextProps);


