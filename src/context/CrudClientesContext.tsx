import { createContext, useEffect, useState } from "react"
import { ICliente } from "../pages/interfaces/ICliente"
import { clienteInit } from "../pages/interfaces/ObjectosdeInicio/InterfacesdeInicio"
import { api_createCliente, api_deleteCliente, api_getClientes, api_updateCliente } from "../pages/api/api_cliente/apiclientes"

export interface CrudClienteContextProps {
    cliente: ICliente,
    clientes: ICliente[],
    handleCliente: (cliente: ICliente) => void
    handlerEliminaCliente: (id: number) => void
    //  handleSelect: (labe?: string, value?: number) => void,

    /*handleElimina: (id: number) => void,
    handleInicia: () => void,
    handleLimpiar: () => void,
    handleUpdate: (cliente: ICliente) => void

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void*/
}
interface props {
    children: JSX.Element | JSX.Element[]
}
const CrudClienteContext = createContext<CrudClienteContextProps>({} as CrudClienteContextProps);


const CrudClienteProvider = ({ children }: props) => {
    const [cliente, setCliente] = useState<ICliente>(clienteInit)
    const [clientes, setClientes] = useState<ICliente[]>([])
    const getClientes = async () => {

        const data = await api_getClientes();

        setClientes(data)

    }
    const handleCliente = async (cliente: ICliente) => {


        if (cliente.id < 1) {

            //insertar
            const resp = await api_createCliente(cliente);
            if (resp?.status == 201) {
                getClientes()
                return true;
            }
        } else {

            const respuesta = await api_updateCliente(cliente.id, cliente);
            if (respuesta?.status == 200) {

                const r = clientes.map((d) => {
                    if (d.id === cliente.id) {
                        return {
                            ...d,
                            nombre: cliente.nombre,
                            apellido: cliente.apellido,
                            telefono: cliente.telefono

                        }

                    }

                    return d;
                });
                setClientes(r)
            }
        }
        setCliente(clienteInit);

    }
    const handlerEliminaCliente = async (id: number) => {
        try {
            const resp = await api_deleteCliente(id);

            if (resp != null) {
                if (resp.status === 200) {

                    const newClientes = clientes.filter(m => m.id != id);
                
                    setClientes(newClientes)
                }
            }
        } catch (error) {
            console.log("Error al eliminar", error)
        }

    }
    useEffect(() => {

        getClientes();


    }, [])
    const data = { clientes, cliente, handleCliente, handlerEliminaCliente }
    return (
        <CrudClienteContext.Provider value={data}>{children}</CrudClienteContext.Provider>
    )
}
export { CrudClienteProvider }
export default CrudClienteContext;