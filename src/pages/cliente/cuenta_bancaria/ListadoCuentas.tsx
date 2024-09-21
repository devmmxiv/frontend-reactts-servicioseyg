import { ICuentaBancaria } from "../../interfaces/ICuentaBancaria"
import { IDireccion } from "../../interfaces/IDireccion";

interface props{
  cuentas:ICuentaBancaria[]
  onUpdateCuenta:(direccion:ICuentaBancaria)=>void;
  ManejadorCuenta:(cuenta:ICuentaBancaria,accion:number)=>void;
}

const ListadoCuentas = ({cuentas,onUpdateCuenta,ManejadorCuenta}:props) => {
 
  const onClickUpdate=(cuenta:ICuentaBancaria)=>{
    onUpdateCuenta(cuenta);
  }
  const onClickEliminarCuenta=(cuenta:ICuentaBancaria)=>{
    ManejadorCuenta(cuenta,2)
  }
  return (
    <>
            
  
         
    <table className="table mt-3">
      <thead>
        <tr >
          <th scope="col">#</th>
          <th scope="col">Tipo Cuenta</th>
          <th scope="col">Numero de Cuenta</th>
          <th scope="col">Banco</th>
          <th scope="col">Operaciones</th>

        </tr>
      </thead>
      <tbody>
        {(cuentas !== null && cuentas.length > 0) ? ( 
          <>
            {cuentas.map((m,i) => { return(
              <tr  key = {m.id}>
                <th scope="row">{i+1}</th>
                <td>{m.tipoCuenta}</td>
                <td>{m.numeroCuenta}</td>
                <td>{m.banco.nombre}</td>
              
           
                <td>
                <button
                className="btn btn-warning"
                style={{marginRight:5}}
                onClick={()=>onUpdateCuenta(m)}
         
              >
              <i className="bi bi-pencil-square"></i>
              </button>
    
              <button className="btn btn-danger" 
              onClick={()=>onClickEliminarCuenta(m)}
              >
              <i className="bi bi-trash3"></i>
              </button>
                </td>
              </tr>)
            })}

          </>
        ) : ''



        }

     
      </tbody>
    </table>


</>
  )
}

export default ListadoCuentas