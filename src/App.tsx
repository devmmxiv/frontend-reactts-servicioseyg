
import './App.css';

import Asid from './components/Asid';
import NavBar from './components/NavBar';
import Content from './components/Content';
import Footer from './components/Footer';
import { useAuth } from './pages/hooks/useAuth';
import Login from './pages/auth/Login';

function App() {
  const { logged } = useAuth()
  return (
    <>
      {!logged ?
        <Login></Login>

        : (<><NavBar></NavBar>
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
