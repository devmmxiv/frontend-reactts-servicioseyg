import React from 'react'

const Home = () => {
  return (
    <>
    <div className="container mt-4">
        <div className="row">
            <div className="col-md-12">

                <div className="card">
                    <div className="card-header">
                        <p className="text-center h1 mt-2">Listado de paquetes</p>
                                
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-body-secondary">Muesta los datos  del usuario jngalicia</h6>
                        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre Persona Recibe</th>
      <th scope="col">Direccion Persona Recibe</th>
      <th scope="col">Municipio</th>
      <th scope="col">Monto a Cobrar</th>
      <th scope="col">Costo Envio</th>
      <th scope="col">Total  a Depositar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Ana Franco</td>
      <td>1 av. 1-20 zona 1</td>
      <td>Mixco</td>
      <td>Q 100.00</td>
      <td>Q 30.00</td>
      <td>Q 70.00</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Mario Contreras</td>
      <td>11 av. 5-21, Colonia La paz Zona 5</td>
      <td>Guatemala</td>
      <td>Q 100.00</td>
      <td>Q 30.00</td>
      <td>Q 70.00</td>
    </tr>
    <tr>
    <th scope="row">3</th>
      <td>Maria Asucena Pivaral</td>
      <td>4 av. 6-11, Colonia La Luces Zona 8</td>
      <td>Villa Nueva</td>
      <td>Q 80.00</td>
      <td>Q 30.00</td>
      <td>Q 50.00</td>
    </tr>
  </tbody>
</table>
                    </div>
                </div>

            </div>
        </div>
    </div>



</>
  )
}

export default Home