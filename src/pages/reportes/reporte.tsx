import { useEffect, useState } from 'react'


import { get_reporte } from '../api/api_reportes/apiReporte'
import { get_cierres } from '../api/api_cierre/api_cierre'
import SelectSearchCierres from '../shared/select/SelectCierres';
import { ICierre } from '../interfaces/ICierre';
import ModalReporte from './componente/ModalReporte';
import { ICliente } from '../interfaces/ICliente';
import { api_getClienteByCierre } from '../api/api_recoleccion/api_recoleccionentrega';
import SelectClientes from '../shared/select/SelectClientes';
import { api_getClientes } from '../api/api_cliente/apiclientes';
import FechaPicker from '../shared/datePicker/FechaPicker';
import { dateToString } from '../../utils/utilidades';



const Reporte = () => {

  const [cierres, setCierres] = useState<ICierre[]>([])
  const [clientes, setClientes] = useState<ICliente[]>([])
  const [clientes2, setClientes2] = useState<ICliente[]>([])
  const [idCierre, setIdCierre] = useState<number>(0)
  const [idCliente, setIdCliente] = useState<number>(0)
  const [idClienteMes, setIdClientMes] = useState<number>(0)
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState('http:localhost:3000')
  const [disable, setDisable] = useState(true)
  const [fechaInicio,setFechaInicio]=useState(new Date());
  const [fechaFin,setFechaFin]=useState(new Date());
  const data = async (idCierre: number, idCliente: number) => {
    const resp = await get_reporte(idCierre, idCliente);
    if (resp?.status === 200) {

      const data = await resp.arrayBuffer()
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      console.log(url)
      setUrl(url)
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const dataReporteClienteMensual = async (idCliente: number,fecha:string) => {
    const resp = await get_reporte(idCierre, idCliente);
    if (resp?.status === 200) {

      const data = await resp.arrayBuffer()
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      console.log(url)
      setUrl(url)
      setShow(true)
    } else {
      setShow(false)
    }
  }
  const onClick = () => {

    if (idCierre > 0) {

      data(idCierre, idCliente)
    }
  }
  const onClickReporteMensual = () => {
    const f=dateToString(fechaInicio);
    const fin=dateToString(fechaFin);
    console.log(`fecha inicio ${f} fecha fin ${fin}`);
//aqui es reporte mensual por cliente

  }

  const handleSelect = (label?: string, value?: number) => {

    setIdCliente(0)
    if (value === undefined) {
      setIdCierre(0)

    } else {
      setDisable(false)
      setIdCierre(value)
      listarCliente(value)
    }
  }
  const handleSelectCliente = (label?: string, value?: number) => {
    if (value === undefined) {
      setIdCliente(0)

    } else {
      setIdCliente(value)

    }
  }
  const handleSelectClienteMes = (label?: string, value?: number) => {
    if (value === undefined) {
      setIdClientMes(0)

    } else {
      setIdClientMes(value)

    }
  }
  const handledate=(mes?:number,anio?:number)=>{

    const y=anio ? anio:1;
  
    const m=mes ? mes:0;

    const newdate = new Date(y, m, 1);
    const fechaFin=new Date(y,m+1,0)
    setFechaInicio(newdate);
    setFechaFin(fechaFin);
  }
  const listCierres = async () => {
    const data: ICierre[] = await get_cierres();

    const newCierres = data.filter((x) =>
      x.cantidad! > 0
    )
    setCierres(newCierres)
  }
  const listarCliente = async (id: number) => {
    const data: ICliente[] = await api_getClienteByCierre(id);

    setClientes(data)

  }
  const listarTodoslosCliente = async () => {
    const data = await api_getClientes();
    setClientes2(data);
  }
  useEffect(() => {
    listarTodoslosCliente();
    listCierres();
    setShow(false)
  }, [])
  return (
    <div>


      <div className="card m-1" style={{ width: '50rem' }}>
        <div className="card-body p-0">
          <div className="pane py-2 px-3 border-bottom">
            <div>
              <h2 className="card-title mb-3 mt-0 lead">Reportes por Cierre</h2>
              <p className="text-muted">
                Seleccion el id del cierre. Puede generar el reporte con datos de un cliente
              </p>
            </div>
          </div>
          <div className="pane py-2 px-3 border-bottom">


            <SelectSearchCierres cierres={cierres} handleSelect={handleSelect}></SelectSearchCierres>
            <div className="input-group mb-3" >
              <span className="input-group-text">Cliente</span>
              <select className="form-select" aria-label="Default select example" name='empleadoRecolecta'
                onChange={(e) => handleSelectCliente('', Number(e.target.value))}
                value={idCliente}
              ><option value={0}>{'Todos '}</option>
                {clientes.map((e) => {
                  return (
                    <option value={e.id}>{e.nombre + ' ' + e.apellido}</option>
                  )
                })}


              </select>

            </div>

            <ModalReporte show={show} url={url}></ModalReporte>
          </div>
          <div className="pane py-2 px-3">
            <div>
              <button
                className="btn btn-flat btn-sm btn-outline-danger ms-auto m-1"
                data-bs-toggle="modal"
                data-bs-target="#modalReporte"
                onClick={onClick}
                disabled={disable}
              >Generar Reporte</button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="card m-1" style={{ width: '50rem' }}>
        <div className="card-body p-0">
          <div className="pane py-2 px-3 border-bottom">
            <div>
              <h2 className="card-title mb-3 mt-0 lead">Reportes por Cliente y Fecha</h2>
              <p className="text-muted">
                Seleccione el cliente y el mes del reporte
              </p>
            </div>
          </div>
          <div className="pane py-2 px-3 border-bottom">

            <SelectClientes clientes={clientes2} handleSelect={handleSelectClienteMes}></SelectClientes>
       
            <FechaPicker fechaMes={fechaInicio} handleDate={handledate}></FechaPicker>
            <ModalReporte show={show} url={url}></ModalReporte>
          </div>
          <div className="pane py-2 px-3">
            <div>
              <button
                className="btn btn-flat btn-sm btn-outline-danger ms-auto m-1"
              
                onClick={onClickReporteMensual}
              
              >Generar Reporte por Cliente</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Reporte
