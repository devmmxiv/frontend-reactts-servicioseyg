import React, { useEffect, useState } from 'react'
import PersonaEnvia from './PersonaEnvia'
import SelectSearch from '../shared/select/SelectSearch'
import { ICliente } from '../interfaces/ICliente'
import { api_getClientes } from '../api/api_cliente/apiclientes'
import { ETipoDireccion } from '../interfaces/IDireccion'
import { useAuth } from '../hooks/useAuth'
import { ESTATUSRECOLECCION, IRecoleccionEntrega, TIPOPAGO } from '../interfaces/IRecoleccionEntrega'

import {api_recoleccion} from '../api/api_recoleccion/api_recoleccionentrega'

import * as v from './jsValidaciones'
import Alert from '../shared/Alert'

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
    montoCobrar: '',
    direccionEntrega: '',
    estado: ESTATUSRECOLECCION.CREADA,
    clienteEnvia: 0,
    direccionClienteEnvia: 0,
    municipioRecibe: 0,
    costoEnvio: '',
    total: 0.00,
    tipoPago: TIPOPAGO.EFECTIVO
}
const Recoleccion = () => {
    const [show,setShow]=useState(false)
    const [message,setMessage]=useState('')
    const [clase,setClase]=useState('')
    const { municipios } = useAuth()
    const [clientes, setCliente] = useState<ICliente[]>([])
    const [envia, setEnvia] = useState<ICliente>(init)
    const [recolecion, setRecoleccion] = useState<IRecoleccionEntrega>(recoleccionEntrega)

    const handleSelect = (label?: string, value?: number) => {
        const c = clientes.filter(x => x.id == value)
        const d= clientes[0].direcciones.filter(d=>d.tipoDireccion===ETipoDireccion.PRINCIPAL)
        if (c.length === 0) {

            setEnvia(init)
        } else {

            setRecoleccion({
                ...recolecion,
                'clienteEnvia': c[0].id,
                'direccionClienteEnvia': d[0].id
            });
            
            setEnvia(c[0]);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setRecoleccion({
                ...recolecion,
                [e.target.name]: e.target.value,
             
            });
  
    }
    
    const onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {

        let t=0;
        if(e.target.name==='costoEnvio'){
         
            t= Number(e.target.value) + Number(recolecion.montoCobrar);
           
            setRecoleccion({
                ...recolecion,
                costoEnvio:e.target.value,
                total:t
            });



        }else{
            t= Number(e.target.value) +  Number(recolecion.costoEnvio)
            setRecoleccion({
                ...recolecion,
                montoCobrar:e.target.value,
                total:t
            });
        }
     


        
     
    }

     

    
    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setRecoleccion({
            ...recolecion,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()
        const montoCobrar:number=Number(recolecion.montoCobrar)
        const costoEnvio:number=Number(recoleccionEntrega.montoCobrar)
        const total:number=Number(recolecion.total)
        if(montoCobrar === Number.NaN || costoEnvio === Number.NaN || total === Number.NaN || montoCobrar< 0 || total<0 || costoEnvio<0)  {
            MostrarMensaje('No se permiten valores negativos\n verificar montos','warning')
            return;
        }
        if(recolecion.tipoPago===TIPOPAGO.YAPAGADO){
  
            if(montoCobrar === Number.NaN  || montoCobrar> 0 )  {
                MostrarMensaje('Monto a cobrar tiene que estar en  0 porque ya esta pagado. Verificar montos','warning')
                return;
            }
        }
        console.log('recoleccion a grabar', recolecion)
        if(recolecion.clienteEnvia===0){
            console.log(recolecion.clienteEnvia)
            MostrarMensaje('Debe de Seleccionar el Cliente que envia. Verificar','warning')
            return;
        }
        grabarRecoleccion(recolecion)
      // console.log('recoleccion a grabar', recolecion)

    }
 
    const grabarRecoleccion=async (recoleccion:IRecoleccionEntrega)=>{

        const resultado=await api_recoleccion(recolecion);

        if(resultado?.status ===201){

            const d= envia.direcciones.filter(d=>d.tipoDireccion===ETipoDireccion.PRINCIPAL)
 
            setRecoleccion({...recoleccionEntrega,clienteEnvia:envia.id,direccionClienteEnvia:d[0].id})
            MostrarMensaje("Recoleccion creada con Exito","success")
    
        }else{

        
            MostrarMensaje("No se pudo crear la recoleccion revise datos"+resultado,"danger")
        }
      
    }
    const toggle=()=>{
        setShow(false)
    }
    const MostrarMensaje=(message:string,clase:string)=>{
        setMessage(message)
        setShow(true)
        setClase(clase)
        
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
                        <Alert show={show} mensaje={message} toogle={toggle} clase={clase}></Alert>
                        <div className="card">
                            <div className="card-header">
                                <p className="text-center h1 mt-2">Recoleccion y Entrega de paquetes</p>
                                <h3>Datos persona que envia</h3>

                                <SelectSearch clientes={clientes} handleSelect={handleSelect}></SelectSearch>
                                <PersonaEnvia cliente={envia} ></PersonaEnvia>

                            </div>
                            <div className="card-body">
                                <h5 className="card-subtitle mb-2 text-body-secondary">Ingrese los Datos de la Persona que Recibe</h5>
                                <form className='mt-3 needs-validation' onSubmit={(e)=>handleSubmit(e)}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombre</span>
                                        <input type="text" className="form-control"
                                            value={recolecion.nombreRecibe}
                                            name='nombreRecibe'

                                            onChange={(e) => onChange(e)}
                                            placeholder="Ingrese Nombre quien Recibe" aria-label="nombre" 
                                            required/>
                                        <span className="input-group-text">Apellido</span>
                                        <input type="text" className="form-control" placeholder="Ingrese Apellido quien recibe" aria-label="apellido"
                                            value={recolecion.apellidoRecibe}
                                            name='apellidoRecibe'
                                            onChange={(e) => onChange(e)}
                                            required
                                        />

                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Telefonos</span>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            value={recolecion.telefonoRecibe}
                                            name='telefonoRecibe'
                                            onChange={(e) => onChange(e)}
                                            required
                                        />

                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Direccion Completa

                                        </span>
                                        <input type="text" className="form-control"  aria-describedby="emailHelp"
                                            value={recolecion.direccionEntrega}
                                            name='direccionEntrega'
                                            onChange={(e) => onChange(e)}
                                            required
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Municipio</span>
                                        <select className="form-select" name='municipioRecibe'
                                            onChange={(e) => onSelect(e)}
                                            required
                                            value={recolecion.municipioRecibe}
                                        >
                                            <option value='0' selected disabled>Seleccione un Municipio</option>
                                            {municipios.map((x, i) => (
                                                <option value={x.id} key={x.id}>{x.nombre}</option>
                                            ))}


                                        </select>

                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Forma de Pago</span>
                                        <select className="form-select" aria-label="Default select example" name='tipoPago'
                                            onChange={(e) => onSelect(e)}
                                      >

                                            <option value={TIPOPAGO.EFECTIVO}>Efectivo</option>
                                            <option value={TIPOPAGO.TRANSFERENCIA}>Transferencia</option>
                                            <option value={TIPOPAGO.TARJETA}>Tarjeta Credito/Debito</option>
                                            <option value={TIPOPAGO.YAPAGADO}>Ya Pagado</option>
                                        </select>

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Monto a Cobrar Q.</span>
                                        <input type="number" className="form-control" aria-describedby="emailHelp"
                                            value={recolecion.montoCobrar}
                                            name='montoCobrar'
                                            required
                                            onChange={(e) => onChangeTotal(e)}
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Costo Envio Q.</span>
                                        <input type="number" className="form-control"  aria-describedby="emailHelp"
                                            value={recolecion.costoEnvio}
                                            name='costoEnvio'
                                             id='costoEnvio'
                                            onChange={(e) => onChangeTotal(e)}
                                            required
                                        />

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text"> Total a pagar</span>
                                        <span className="input-group-text">Q.  {Number(recolecion.costoEnvio) + Number(recolecion.montoCobrar)}</span>
                                      
                                  
                                    </div>

                                    <button type="submit"  className="btn btn-primary">Grabar</button>
                              
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
