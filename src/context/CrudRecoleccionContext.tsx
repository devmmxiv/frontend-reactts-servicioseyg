import { create } from "domain";
import { createContext, useEffect, useState } from "react";
import { api_getClientes } from "../pages/api/api_cliente/apiclientes";
import { ICliente } from "../pages/interfaces/ICliente";
import { clienteInit, entregaInit, recoleccionInit } from "../pages/interfaces/ObjectosdeInicio/InterfacesdeInicio";
import { ETipoDireccion } from "../pages/interfaces/IDireccion";
import { ESTATUSRECOLECCION, IEntrega, IRecoleccion, IRecoleccionEntrega, TIPOPAGO } from "../pages/interfaces/IRecoleccionEntrega";
import { api_deleteRecoleccion, api_getRecoleccionByClient, api_recoleccion, api_recoleccionEntrega, api_updateEntrega, api_updateRecoleccion } from "../pages/api/api_recoleccion/api_recoleccionentrega";
import { IMunicipio } from "../pages/interfaces/iMunicipio";
import { IEmpleado } from "../pages/interfaces/IEmpleado";
export interface CrudRecoleccionContextProps {
    envia: ICliente,
    entrega: IEntrega,
    clientes: ICliente[],

    entregas: IEntrega[],
    handleSelect: (labe?: string, value?: number) => void,
    handleRecoleccion: (entrega: IEntrega) => void,
    handleElimina: (id: number) => void,
    handleInicia: () => void,
    handleLimpiarEntrega: () => void,
    handleUpdate: (entrega: IEntrega) => void

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
interface props {
    children: JSX.Element | JSX.Element[]
}
const CrudRecoleccionContext = createContext<CrudRecoleccionContextProps>({} as CrudRecoleccionContextProps);
const CrudClienteProvider = ({ children }: props) => {
    const [entrega, setEntrega] = useState<IEntrega>(entregaInit)
    const [entregas, setEntregas] = useState<IEntrega[]>([])
    const [clientes, setClientes] = useState<ICliente[]>([])
    const [envia, setEnvia] = useState<ICliente>(clienteInit)

    const handleSelect = (label?: string, value?: number) => {

        const c = clientes.filter(x => x.id === value)
        const d = clientes[0].direcciones.filter(d => d.tipoDireccion === ETipoDireccion.PRINCIPAL)
        if (c.length === 0) {

            setEnvia(clienteInit)


        } else {


            getRecolecciones(c[0].id)
            setEntrega({
                ...entrega, clienteEnvia: { id: c[0].id },
                nombreRecibe: '',
                apellidoRecibe: '',
                zonaEntrega: 1,
                totalCobrar: '0.00',
                direccionEntrega: '',
                telefonoRecibe: ''
            })
            setEnvia(c[0]);

        }


    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setEntrega({
            ...entrega,
            [e.target.name]: e.target.value
        });


    }
    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if (e.target.name === 'municipioRecibe') {
            const m: IMunicipio = { id: Number(e.target.value), nombre: e.target[e.target.selectedIndex].textContent?.toString() }
            setEntrega({ ...entrega, municipioRecibe: m })
        } else if ((e.target.name === 'empleadoAsignado')) {

            const id = Number(e.target.value);

            const dataUser = e.target[e.target.selectedIndex].textContent!.toString();

            const nombre = dataUser!.split(" ")

            setEntrega({ ...entrega, empleadoAsignado: { id: id, nombre: nombre[0], apellido: nombre[1] } })

        } else if ((e.target.name === 'estado')) {

            switch (e.target.value) {
                case ESTATUSRECOLECCION.CREADA: {
                    setEntrega({ ...entrega, estado: ESTATUSRECOLECCION.CREADA })
                    break;
                }
                case ESTATUSRECOLECCION.ENRUTA: {

                    setEntrega({ ...entrega, estado: ESTATUSRECOLECCION.ENRUTA })
                    break;
                }
                case ESTATUSRECOLECCION.ENTREGADA: {
                    setEntrega({ ...entrega, estado: ESTATUSRECOLECCION.ENTREGADA })
                    break;
                }
                case ESTATUSRECOLECCION.RECOLECTADA: {
                    setEntrega({ ...entrega, estado: ESTATUSRECOLECCION.RECOLECTADA })
                    break;
                }
                case ESTATUSRECOLECCION.NORECIBIDA: {
                    setEntrega({ ...entrega, estado: ESTATUSRECOLECCION.NORECIBIDA })
                    break;
                }


            }


        }
        else {

            if (e.target.value === TIPOPAGO.YAPAGADO) {

                //setdisableCostoPRoducto(true);
                setEntrega({
                    ...entrega,
                    [e.target.name]: e.target.value,
                    totalCobrar: '0.00'
                });
            }
            else {
                // setdisableCostoPRoducto(false);
                setEntrega({
                    ...entrega,
                    [e.target.name]: e.target.value,

                });
            }



        }

    }
    const getRecolecciones = async (idCliente: number) => {

        const data = await api_getRecoleccionByClient(idCliente)

        setEntregas(data)

    }
    const handleRecoleccion = async (entrega: IEntrega) => {


        if (entrega.id < 1) {

            //insertar
            const resp = await api_recoleccionEntrega(entrega);
            if (resp?.status == 201) {
                getRecolecciones(envia.id)
                return true;
            }
        } else {

            const respuesta = await api_updateEntrega(entrega.id, entrega);
            if (respuesta?.status == 200) {

                const r = entregas.map((d) => {
                    if (d.id === entrega.id) {
                        return {
                            ...d,
                            nombreRecibe: entrega.nombreRecibe,
                            apellidoRecibe: entrega.apellidoRecibe,
                            direccionEntrega: entrega.direccionEntrega,
                            municipioRecibe: entrega.municipioRecibe,
                            tipoPago: entrega.tipoPago,
                            // precioProducto: recoleccion.precioProducto,
                            totalCobrar: entrega.totalCobrar,
                            precioEnvio: entrega.precioEnvio,
                            // costoEnvio: recoleccion.costoEnvio
                            zonaEntrega: entrega.zonaEntrega,

                            estado: entrega.estado,
                            empleadoAsignado: entrega.empleadoAsignado

                        }

                    }

                    return d;
                });
                setEntregas(r)
            }
        }
        setEntrega(entregaInit);

    }
    const handleUpdate = (entrega: IEntrega) => {

        setEntrega(entrega);
    }
    const handleElimina = async (id: number) => {
        const resp = await api_deleteRecoleccion(id)
        if (resp != null) {
            if (resp.status === 200) {

                const newrecoleccion = entregas.filter(m => m.id != id);
                setEntregas(newrecoleccion)
            }
        }



    }
    const handleInicia = () => {
        setEnvia(clienteInit);

    }
    const handleLimpiarEntrega = () => {
        setEntrega({
            ...entrega,
            id: 0.001,
            nombreRecibe: '',
            apellidoRecibe: '',
            zonaEntrega: 1,
            precioEnvio:'25.00',
            totalCobrar: '0.00',
            direccionEntrega: '',
            telefonoRecibe: ''
            , empleadoAsignado: { id: 0 },
            municipioRecibe: { id: 0 },
            clienteEnvia:{id:envia.id}

        })
    }
    useEffect(() => {

        const listarCliente = async () => {
            const data = await api_getClientes()
            console.log("listado de lcientes",data);
            setClientes(data)
        }
        listarCliente()


    }, [])

    const data = { clientes, entrega, entregas, envia, handleSelect, handleInicia, handleRecoleccion, handleElimina, handleUpdate, handleLimpiarEntrega, onChange, onSelect }
    return (
        <CrudRecoleccionContext.Provider value={data}>{children}</CrudRecoleccionContext.Provider>
    )
}
export { CrudClienteProvider }
export default CrudRecoleccionContext;