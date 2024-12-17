import React, { useEffect, useState } from 'react'
import PersonaEnvia from './PersonaEnvia'
import SelectSearch from '../shared/select/SelectSearch'
import { ICliente } from '../interfaces/ICliente'
import { api_getClientes } from '../api/api_cliente/apiclientes'
import { ETipoDireccion, IDireccion } from '../interfaces/IDireccion'
import { useAuth } from '../hooks/useAuth'
import { ESTATUSRECOLECCION, IRecoleccionEntrega, TIPOPAGO } from '../interfaces/IRecoleccionEntrega'

import { api_recoleccion } from '../api/api_recoleccion/api_recoleccionentrega'

import Alert from '../shared/Alert'
import { api_getEmpleados } from '../api/api_empleado/apiempleado'
import SelectEmpleados from '../shared/select/selectEmpleado'
import { IEmpleado } from '../interfaces/IEmpleado'
import { IMunicipio } from '../interfaces/iMunicipio'
import Direccion from '../cliente/direccion/Direccion'

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
const initEmpleado: IEmpleado = {
    id: 0,
    codigoEmpleado: '',
    nombre: '',
    apellido: '',
    telefono: '',
    estado: false,
   
  
}
const initMunicipio:IMunicipio={
    id: 0
}
const initDireccionEnvia:IDireccion={
    id: 0,
    direccionCompleta: '',
    calle: 0,
    avenida: 0,
    zona: 0,
    tipoDireccion: ETipoDireccion.PRINCIPAL,
    municipio: initMunicipio
}

const recoleccionEntrega: IRecoleccionEntrega = {
    nombreRecibe: '',

    apellidoRecibe: '',
    telefonoRecibe: '',
   // precioProducto: '',
    direccionEntrega: '',
    estado: ESTATUSRECOLECCION.CREADA,
    clienteEnvia: 0,
    //direccionClienteEnvia: 0,
    direccionEnvia:initDireccionEnvia,
    municipioEnvia:initMunicipio,
    zonaEntrega:0,
    municipioRecibe: 0,
   // costoEnvio: '0',
    totalCobrar: '0.00',
    precioEnvio: '25.00',
    tipoPago: TIPOPAGO.EFECTIVO,

    empleadoAsignado:initEmpleado
}
const Recoleccion = () => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const [clase, setClase] = useState('')
    const { municipios } = useAuth()
    const [clientes, setCliente] = useState<ICliente[]>([])
    const [envia, setEnvia] = useState<ICliente>(init)
    const [recolecion, setRecoleccion] = useState<IRecoleccionEntrega>(recoleccionEntrega)
    const [disableInputoCostoPRoducto, setdisableCostoPRoducto] = useState(false);
    const [empleados,setEmpleados]=useState<IEmpleado[]>([initEmpleado]);
    
    const handleSelect = (label?: string, value?: number) => {
        const c = clientes.filter(x => x.id === value)
        const d = clientes[0].direcciones.filter(d => d.tipoDireccion === ETipoDireccion.PRINCIPAL)
        if (c.length === 0) {

            setEnvia(init)
        } else {
    
       
            setRecoleccion({
                ...recolecion,
                'clienteEnvia': c[0].id,
                'direccionEnvia':d[0],
                'municipioEnvia':d[0].municipio
               // 'direccionClienteEnvia': d[0].id
            });

            setEnvia(c[0]);
        }
    }
    const handleSelectEmpleadoRecolecta = ( value:string) => {

       const id= Number(value);
        const c = empleados.filter(x => x.id === id)
       
        if (c.length >0) {

       
          //  console.log( c[0].id)
            setRecoleccion({
                ...recolecion,
                'empleadoAsignado': c[0],
        
            });

          
        }
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRecoleccion({
            ...recolecion,
            [e.target.name]: e.target.value,

        });

    }
   /* const onChangePagaEnvio = (paga: boolean) => {

        let t = 0
        if (paga) {
            t = Number(recolecion.precioProducto) + Number(recolecion.costoEnvio)
        } else {
            t = Number(recolecion.precioProducto)
        }
        console.log(`paga ${paga} total ${t}`)
        setRecoleccion({
            ...recolecion,
            clienteRecibePagaEnvio: paga,
            totalCobrar: t


        });


    }*/
    const onChangeTotal = (name :string,value:string) =>{//(e: React.ChangeEvent<HTMLInputElement>) => {

        let t = 0;
      //  console.log(name)
        t = Number(value)
       /* if (name === 'costoEnvio') {

            t = Number(recolecion.precioProducto);

            /*  setRecoleccion({
                  ...recolecion,
                  costoEnvio: e.target.value,
                  total: t
              });*/



      //  } else {
   
          //  t = Number(value)

      //  }

        setRecoleccion({
            ...recolecion,
            [name]: value,
           // totalCobrar: t
        });



    }




    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let monto=recolecion.totalCobrar;
        if (e.target.name === "tipoPago") {
            if (e.target.value === TIPOPAGO.YAPAGADO) {
                setdisableCostoPRoducto(true);
                monto='0.00';
       
            } else{
                setdisableCostoPRoducto(false);
            }
        
        } 
   

       
            setRecoleccion({
                ...recolecion,
                [e.target.name]: e.target.value,
              
                totalCobrar:monto
         
            });
        
       
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        //const precioProducto: number = Number(recolecion.precioProducto)
       // const costoEnvio: number = Number(recoleccionEntrega.costoEnvio)
        const totalCobrar: number = Number(recolecion.totalCobrar)
     //   if (Number.isNaN(precioProducto) || Number.isNaN(costoEnvio)  || Number.isNaN(totalCobrar) || precioProducto < 0 || totalCobrar < 0 || costoEnvio < 0) {
      //      MostrarMensaje('No se permiten valores negativos\n verificar montos', 'warning')
      //      return;
       // }
            if (Number.isNaN(totalCobrar) ||  totalCobrar < 0 ) {
            MostrarMensaje('No se permiten valores negativos\n verificar montos', 'warning')
            return;
        }
        //if (recolecion.tipoPago === TIPOPAGO.YAPAGADO ) {

          //  if (Number.isNaN(precioProducto) || precioProducto > 0) {
            //    MostrarMensaje('Monto a cobrar tiene que estar en  0 porque ya esta pagado/transferido. Verificar montos', 'warning')
              //  return;
            //}
        //}

        if (recolecion.clienteEnvia === 0) {
            //console.log(recolecion.clienteEnvia)
            MostrarMensaje('Debe de Seleccionar el Cliente que envia. Verificar', 'warning')
            return;
        }
        if(recolecion.zonaEntrega<0){
            MostrarMensaje('Debe de Ingresar un numero de Zona. Verificar', 'warning')
            return; 
        }
        grabarRecoleccion(recolecion)
         console.log('recoleccion a grabar', recolecion)

    }

    const grabarRecoleccion = async (recoleccion: IRecoleccionEntrega) => {

        const resultado = await api_recoleccion(recolecion);

        if (resultado?.status === 201) {

            const d = envia.direcciones.filter(d => d.tipoDireccion === ETipoDireccion.PRINCIPAL)

            setRecoleccion({ ...recoleccionEntrega, clienteEnvia: envia.id, direccionEnvia: d[0] })
            MostrarMensaje("Recoleccion creada con Exito", "success")

        } else {


            MostrarMensaje("No se pudo crear la recoleccion revise datos" + resultado, "danger")
        }

    }
    const toggle = () => {
        setShow(false)
    }
    const MostrarMensaje = (message: string, clase: string) => {
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

        const listarEmpleados=async()=>{
            const data=await api_getEmpleados();
            setEmpleados(data);
        }
        listarEmpleados();
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
                                <form className='mt-3 needs-validation' onSubmit={(e) => handleSubmit(e)}>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombre</span>
                                        <input type="text" className="form-control"
                                            value={recolecion.nombreRecibe}
                                            name='nombreRecibe'

                                            onChange={(e) => onChange(e)}
                                            placeholder="Ingrese Nombre quien Recibe" aria-label="nombre"
                                            required />
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
                                        <input type="text" className="form-control" aria-describedby="emailHelp"
                                            value={recolecion.direccionEntrega}
                                            name='direccionEntrega'
                                            onChange={(e) => onChange(e)}
                                            required
                                        />

                                    </div>
                                    <div className="input-group mb-3">
                                <span className="input-group-text"><i className="bi bi-signpost p-1"></i>Zona</span>
                                <input type="number" aria-label="address"
                                    value={recolecion.zonaEntrega}
                                    name='zonaEntrega'
                                    className="form-control"
                                    onChange={(e) => onChange(e)}
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
                                            value={recolecion.tipoPago}
                                        >

                                            <option value={TIPOPAGO.EFECTIVO}>Efectivo</option>
                                            <option value={TIPOPAGO.TRANSFERENCIA}>Transferencia</option>
                                            <option value={TIPOPAGO.TARJETA}>Tarjeta Credito/Debito</option>
                                            <option value={TIPOPAGO.YAPAGADO}>Ya Pagado</option>
                                        </select>

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Empleado Recolecta</span>
                                        <select className="form-select" aria-label="Default select example" name='empleadoRecolecta'
                                            onChange={(e) => handleSelectEmpleadoRecolecta(e.target.value)}
                                            value={recolecion.empleadoAsignado.id}
                                        >
                                                {empleados.map((e)=>{return(
                                                    <option value={e.id}>{e.nombre + ' '+e.apellido}</option>
                                                )})}
                                            
                                    
                                        </select>

                                    </div>
                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Total a Cobrar Q.</span>
                                        <input type="number" className="form-control" aria-describedby="emailHelp"
                                            value={recolecion.totalCobrar}
                                            name='totalCobrar'
                                            required
                                            onChange={(e) => onChangeTotal(e.target.name,e.target.value)}
                                            disabled={disableInputoCostoPRoducto}
                                        />

                                    </div>
                          
                            
                          

                                    <button type="submit" className="btn btn-primary">Grabar</button>

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
