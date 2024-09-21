
import { Link } from 'react-router-dom'
import Departamento from '../shared/Departamento'


import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import { IMunicipio } from '../interfaces/iMunicipio'


const Profile = () => {
    const { user } = useAuth()
    const [usuario, setUsuario] = useState(user)
    const [show, setShow] = useState(false)

    const onselect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id: number = Number(e.target.value)
        const m: IMunicipio = { id: id, nombre: e.target[e.target.selectedIndex].textContent?.toString() }

        setUsuario({ ...usuario, municipio: m })

    }
    const toogle=()=>{
        setShow(!show)
    }
    useEffect(() => {
        setUsuario(user)
    }, [show])
    return (
        <>
            <div>
                {/* Button trigger modal */}
                <Link to='#' onClick ={()=>toogle()}className='link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover'
                    data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa fa-user-circle-o m-2" aria-hidden="true"></i><strong>{usuario.usuario}</strong>

                </Link>
                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Datos del Usuario</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form className='mt-3'>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombre y Apellido</span>
                                        <input type="text" value={usuario.nombre} aria-label="First name" className="form-control" />
                                        <input type="text" value={usuario.apellido} aria-label="Last name" className="form-control" />
                                    </div>

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Telefonos</span>
                                        <input type="text"
                                            value={user.telefono}
                                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                    </div>


                                    <div className="mb-3">
                                        <div className="input-group " >
                                            <span className="input-group-text">Direccion</span>
                                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                        </div>
                                        <div className="form-text" id="basic-addon4">Esta direccion se usara para las recolecciones de sus entregas.</div>
                                    </div>
                                    <div className="input-group mb-3" >

                                        <span className="input-group-text">Colonia</span>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <Departamento id={usuario.municipio.id} onselect={onselect}></Departamento>

                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Grabar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Profile
