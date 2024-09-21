import React, { useEffect, useState } from 'react'
import PersonaEnvia from './PersonaEnvia'
import SelectSearch from '../shared/select/SelectSearch'
import { ICliente } from '../interfaces/ICliente'
import { api_getClientes } from '../api/api_cliente/apiclientes'
import { ETipoDireccion } from '../interfaces/IDireccion'
import { useAuth } from '../hooks/useAuth'
import { ESTATUSRECOLECCION, IRecoleccionEntrega, TIPOPAGO } from '../interfaces/IRecoleccionEntrega'

const init: ICliente = {
    id: 0,
    codigoCliente: '',
    nombre: '',
    apellido: '',
    nombrePagina: '',
    telefono: '',
    estado: false,
    direcciones: [
        {
            id: 0,
            direccionCompleta: '',
            calle: 0,
            avenida: 0,
            zona: 0,
            tipoDireccion: ETipoDireccion.PRINCIPAL,
            municipio: {
                id: 0,
                nombre: ''
            }
        }
    ],
    cuentas: []
}
const recoleccionEntrega: IRecoleccionEntrega = {
    nombreRecibe: '',

    apellidoRecibe: '',
    telefonoRecibe: '',
    montoCobrar: 0,
    direccionEntrega: '',
    estado: ESTATUSRECOLECCION.CREADA,
    clienteEnvia: 0,
    direccionClienteEnvia: 0,
    municipioRecibe: 0,
    costoEnvio: 0
}
const Recoleccion = () => {
    const { municipios } = useAuth()

    const [clientes, setCliente] = useState<ICliente[]>([])
    const [envia, setEnvia] = useState<ICliente>(init)
    const [recolecion, setRecoleccion] = useState<IRecoleccionEntrega>(recoleccionEntrega)

    const handleSelect = (label?: string, value?: number) => {

        const c = clientes.filter(x => x.id == value)
        if (c.length === 0) {
            setEnvia(init)
        } else {
            setRecoleccion({
                ...recolecion,
                'clienteEnvia': c[0].id
            });
            setRecoleccion({
                ...recolecion,
                'direccionClienteEnvia': c[0].direcciones[0].id
            });
            setEnvia(c[0]);
        }


    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setRecoleccion({
            ...recolecion,
            [e.target.name]: e.target.value
        });

    }
    const onSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        console.log('name',e.target.name)
        console.log('value',e.target.value)
        setRecoleccion({
            ...recolecion,
            [e.target.name]: e.target.value
        });
       }
    const handleSubmit = () => {
        console.log('recoleccion a grabar',recolecion)
    }

    useEffect(() => {

        const listarCliente = async () => {
            const data = await api_getClientes()
            setCliente(data)
        }
        listarCliente()
    }, [])

    return (
        <>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-12">

                        <div className="card">
                            <div className="card-header">
                                <p className="text-center h1 mt-2">Recoleccion y Entrega de paquetes</p>
                                <h3>Datos persona que envia</h3>

                                <SelectSearch clientes={clientes} handleSelect={handleSelect}></SelectSearch>
                                <PersonaEnvia cliente={envia} ></PersonaEnvia>

                            </div>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-body-secondary">Ingrese los Datos de la Persona que Recibe</h6>
                                <form className='mt-3'>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombre</span>
                                        <input type="text" className="form-control" 
                                        value={recolecion.nombreRecibe} 
                                        name='nombreRecibe'
                                        onChange={(e)=>onChange(e)}
                                        placeholder="Ingrese Nombre quien Recibe" aria-label="nombre" />
                                        <span className="input-group-text">Apellido</span>
                                        <input type="text" className="form-control" placeholder="Ingrese Apellido quien recibe" aria-label="apellido" 
                                           value={recolecion.apellidoRecibe} 
                                           name='apellidoRecibe'
                                           onChange={(e)=>onChange(e)}
                                        />

                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Telefonos</span>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                               value={recolecion.telefonoRecibe} 
                                               name='telefonoRecibe'
                                               onChange={(e)=>onChange(e)}
                                        />

                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Direccion Completa

                                        </span>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                               value={recolecion.direccionEntrega} 
                                               name='direccionEntrega'
                                               onChange={(e)=>onChange(e)}
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Municipio</span>
                                        <select className="form-select" aria-label="Default select example" name='municipioRecibe'
                                          onChange={(e) => onSelect(e)}
                                        >
                                            <option value='0'>Seleccione un Municipio</option>
                                            {municipios.map((x, i) => (
                                                <option value={x.id}>{x.nombre}</option>
                                            ))}


                                        </select>

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Forma de Pago</span>
                                        <select className="form-select" aria-label="Default select example" name='formaPago'
                                        onChange={(e) => onSelect(e)}
                                        >

                                            <option value={TIPOPAGO.EFECTIVO}>Efectivo</option>
                                            <option value={TIPOPAGO.TARJETA}>Transferencia</option>
                                            <option value={TIPOPAGO.TRANSFERENCIA}>Tarjeta Credito/Debito</option>
                                            <option value={TIPOPAGO.YAPAGADO}>Ya Pagado</option>
                                        </select>

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">$ Monto a Cobrar</span>
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                                                value={recolecion.montoCobrar} 
                                                name='montoCobrar'
                                                onChange={(e)=>onChange(e)}
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">$ Costo Envio</span>
                                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                value={recolecion.costoEnvio} 
                                                name='costoEnvio'
                                                onChange={(e)=>onChange(e)}
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">$ Total a pagar</span>
                                        <input type="number" className="form-control" readOnly aria-describedby="emailHelp" />

                                    </div>

                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Grabar</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </>


    )
}

export default Recoleccion
