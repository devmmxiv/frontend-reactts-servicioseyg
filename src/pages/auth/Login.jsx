import React from 'react'
import Profile from './Profile'

const Login = () => {
  return (
<section className="bg-light p-3 p-md-4 p-xl-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border border-light-subtle rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
                <div className="mb-5">
                  <div className="text-center mb-4">
                    <a href="#!">
                      <img src="../logo192.png" alt="BootstrapBrain Logo" width={175} height={57} />
                    </a>
                  </div>
                  <h4 className="text-center">Bienvenido al sistema de paqueteria Servicios EyG</h4>
                </div>
              </div>
            </div>
            <form action="#!">
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required />
                    <label htmlFor="email" className="form-label">Usuario</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="password" id="password" defaultValue placeholder="Password" required />
                    <label htmlFor="password" className="form-label">Contraseña</label>
                  </div>
                </div>
               
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn bsb-btn-xl btn-primary" type="submit">Ingresar</button>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-12">
                <hr className="mt-5 mb-4 border-secondary-subtle" />
                <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                  <a href="#!" className="link-secondary text-decoration-none">Crear  Cuenta</a>
             
                </div>
              </div>
            </div>
   
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default Login
