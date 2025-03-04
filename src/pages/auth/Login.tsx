import { useContext, useState } from "react"
import LoginContext from "../../context/LoginContext";
import { useLogin } from "../hooks/useLogin";
import Alert from "../shared/Alert";
import { ToggleButton } from "react-bootstrap";


const Login = () => {
const {handleLogin,userLogin}=useLogin()
const  [usuario,setUsuario]=useState("")
const [passwd,setPasswd]=useState("");

const [show,setShow]=useState(false);
const [message,setMessage]=useState("0")
const [clase,setClase]=useState("warning")
const toggle=()=>{
  setShow(!show);
}
  const  handleSubmit=(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    if(usuario=="" || passwd==""){
 
      setShow(true);
      
      setMessage("Debe ingresar usuario y contraseña");
      return
    }
    handleLogin(usuario,passwd)
    if(!userLogin.logged){
      setShow(true);
      
      setMessage("Usuario o contraseña incorrectos");
      return
    }
  }

  function han(n:string): boolean {
    throw new Error("Function not implemented.");
  }

  return (
<section className="bg-light p-3 p-md-4 p-xl-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
        <div className="card border border-light-subtle rounded-4">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="row">
              <div className="col-12">
              <Alert show={show} mensaje={message} toogle={toggle} clase={clase}></Alert>
                <div className="mb-5">
                  <div className="text-center mb-4">
                    <a href="#!">
                      <img src="../logoEyG.png" alt="BootstrapBrain Logo"  />
                    </a>
                  </div>
              
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="usuario" id="user" required 
                    value={usuario}
                    onChange={(e)=>{setUsuario(e.target.value)}}
                    />  
                    <label htmlFor="user" className="form-label">Usuario</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" name="password" id="password"  placeholder="Password" required 
                    value={passwd}
                    onChange={(e)=>setPasswd(e.target.value)}
                    />
                    <label htmlFor="password" className="form-label">Contraseña</label>
                  </div>
                </div>
               
                <div className="col-12">
                  <div className="d-grid">
                    <button className="btn bsb-btn-xl btn-primary" type="submit"
                    
                    >Ingresar</button>
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

