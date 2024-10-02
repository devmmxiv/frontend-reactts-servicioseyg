import { IRecoleccionResumenCierre } from '../../interfaces/IRecoleccionEntrega'
interface props {
    resumen: IRecoleccionResumenCierre[]
}
const ResumenRecolecciones = ({ resumen }: props) => {
   
    const sumar = () => {
        let t = 0;
        resumen.map((x) => {
            t += Number(x.cantidad)
        })
        return t
    }
    const dateFormatter = () => {
        const date = new Date();
        const formattedDateTime = date.toLocaleString('es-GT', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });


        return formattedDateTime;

    }

    return (
        <>
            <div className="card m-1" style={{ width: '25rem' }}>
                <div className="card-body p-0">
                    <div className="pane py-2 px-3 border-bottom">
                        <div>
                            <h2 className="card-title mb-3 mt-0 lead">Resumen de Recolecciones</h2>
                            <p className="text-muted">
                                Informacion de recolecciones
                            </p>
                        </div>
                    </div>
                    <div className="pane py-2 px-3 border-bottom">

                        {resumen.length > 0 ? (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th > Estado</th>
                                            <th>Cantidad</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resumen.map((x, i) => {
                                            return (
                                                <tr key={i + 1}>
                                                    <td>{i + 1}</td>
                                                    <td>{x.estado}</td>
                                                    <td >{x.cantidad}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td>-</td>
                                            <td>Total Recolecciones Activas</td>
                                            <td>{sumar()}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : 'NO HAY RECOLECCIONES PARA CIERRE'}



                    </div>
                    <div className="pane py-2 px-3">
                        <div>

                            <p className="text-muted">{dateFormatter()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResumenRecolecciones
