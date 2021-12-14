import logo from './logo.jpeg'
import './App.css';
import InvoiceApp from "./components/InvoiceApp/InvoiceApp";
import DeleteInvoice from "./components/DeleteInvoice/DeleteInvoice";
import Login from "./components/Login/Login";
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import useToken from "./components/costumHooks/useToken";
import React,{useState, useEffect} from "react";
import PublicRoute from "./Utils/PublicRoute";
import PrivateRoute from "./Utils/PrivateRoute";
import Home from "./components/Home/Home";
import axios from 'axios'
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const {token, setToken} = useToken()

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:3000/api/auth/verifyToken?token=${token}`)
      .then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="wrapper App">
      <BrowserRouter>
        <div className="menu">
          <img alt='logo del sito' src={logo}></img>
          <div className="title-nav-section">
            <h1>Black Skip / Fatturazione</h1>
            <div className="header riga-link">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/addInvoice">Aggiungi fattura</NavLink>
              <NavLink to="/deleteInvoice">Elimina fattura</NavLink>
            </div>
          </div>
        </div>

        <Routes className="route">
          <Route className="" path="/" element={<Home/>} />
          <Route className="" path="/login" element={<PublicRoute redirectTo='/addInvoice'><Login/></PublicRoute>}/>
          <Route className="" path="/addInvoice" element={<PrivateRoute redirectTo="/login"><InvoiceApp/></PrivateRoute>}/>
          <Route className="" path="/deleteInvoice" element={<PrivateRoute redirectTo="/login"><DeleteInvoice/></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
