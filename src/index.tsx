import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons//font/bootstrap-icons.min.css'
import { LoginProvider } from './context/LoginContext';
import MunicipioContext, { MunicipioProvider } from './context/MunicipiosContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<React.StrictMode>
    <BrowserRouter>   
    <LoginProvider>
      <MunicipioProvider> 
        <App />
        </MunicipioProvider>
    
     </LoginProvider>
    </BrowserRouter>
    </React.StrictMode>

);


