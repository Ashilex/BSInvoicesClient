import logo from './logo.svg';
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
      <h1>Application</h1>
      <BrowserRouter>
        <div className="header">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink><small>(Access without token only)</small>
          <NavLink to="/addInvoice">Dashboard</NavLink><small>(Access with token only)</small>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<PublicRoute redirectTo='/addInvoice'><Login/></PublicRoute>}/>
          <Route path="/addInvoice" element={<PrivateRoute redirectTo="/login"><InvoiceApp/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
