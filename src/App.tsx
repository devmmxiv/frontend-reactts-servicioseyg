
import './App.css';

import Asid from './components/Asid';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Footer from './components/Footer';
import { useAuth } from './pages/hooks/useAuth';
import Login from './pages/auth/Login';
import { useContext } from 'react';
import LoginContext from './context/LoginContext';
import { useLogin } from './pages/hooks/useLogin';
import { PerfilProvider } from './context/PerfilContext';

function App() {
 const {userLogin}=useLogin()

  //console.log(user.logged)
  //const { logged } = useAuth()
  return (
    <>
      {!userLogin.logged ?
        <Login></Login>

        : (<>
        <PerfilProvider><NavBar></NavBar></PerfilProvider>
          <div className='flex'>
            <Asid></Asid>
            <Content></Content>

          </div>

        </>)
      }
    </>
  );
}

export default App;
