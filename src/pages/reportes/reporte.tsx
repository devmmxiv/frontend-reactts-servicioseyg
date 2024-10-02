import { useEffect, useState } from 'react'
import { get_reporte } from '../api/api_reportes/apiReporte'
import {get_cierres} from '../api/api_cierre/api_cierre'
import SelectSearchCierres from '../shared/select/SelectCierres';
import { ICierre } from '../interfaces/ICierre';
import ModalReporte from './componente/ModalReporte';
const Reporte = () => {

  const [cierres, setCierres] = useState<ICierre[]>([])
  const [idCierre, setIdCierre] = useState<number>(0)
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState('http:localhost:3000')
  const [disable,setDisable]=useState(true)
  const data = async (idCierre: number) => {
    const resp = await get_reporte(idCierre);
    if (resp?.status === 200) {
      console.log('respuesta', resp)
      const data = await resp.arrayBuffer()
      const blob = new Blob([data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      setUrl(url)
      setShow(true)
    } else {
      setShow(false)
    }
  }
  const onClick = () => {

    if(idCierre >0){
      console.log('se busca el cierre id',idCierre)
    data(idCierre)
    }
  }

  const handleSelect = (label?: string, value?: number) => {
    if(value === undefined){
      setIdCierre(0)
    }else{
      setDisable(false)
      setIdCierre(value)
    }
    

  }
  const listCierres=async()=>{
    const data:ICierre[]=await get_cierres();

    const newCierres = data.filter((x)=> 
      x.cantidad!>0
    )
    setCierres(newCierres)
  }
  useEffect(() => {
    listCierres();
    setShow(false)
  }, [])
  return (
    <div>
      <h1>REPORTES</h1>
      <button
        className="btn btn-flat btn-sm btn-outline-danger ms-auto m-1"
        data-bs-toggle="modal" 
        data-bs-target="#modalReporte"
        onClick={onClick}
        disabled={disable}
      >Ver Reporte</button>

      <SelectSearchCierres cierres={cierres} handleSelect={handleSelect}></SelectSearchCierres>

      <ModalReporte show={show} url={url}></ModalReporte>
    </div>
  )
}

export default Reporte
