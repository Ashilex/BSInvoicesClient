import React, {useEffect, useState} from 'react';
import { Route, Navigate } from 'react-router-dom';
import {getToken, removeUserSession} from './Common';
import axios from "axios";

// handle the private routes

function PrivateRoute({ children, redirectTo}) {
  let token = getToken()
  // let auth = false
  // let dataReady = false
  const [dataReady,setDataReady] = useState(false)
  const [auth,setAuth] = useState(false)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_HOST}:3000/api/auth/verifyFakeToken?token=${token}`)
      .then( response => {
        // if(!response.ok) throw new Error(response.status)
        if(response.data.code==233) {
          console.log('u used fake token')
          // authorized = false
          // return <Navigate to={redirectTo}/>
          setAuth(false)
          setDataReady(true)
        }
        else{
          console.log('non hai usato un token fake')
          setAuth(true)
          setDataReady(true)
        }
        setDataReady(true)
      }).catch(error => {
        // removeUserSession();
        setDataReady(true);
      });

  }, [])

  let component;
  console.log('prova verifica', token)
  if (!token) {
    console.log('il token non esiste')
    return  <Navigate to={redirectTo} />
  }

  if (auth){
    console.log('sono stato autorizzato')
    return children
  } else {
    if (dataReady){
      console.log('non sono stato autorizzato')
      return  <Navigate to={redirectTo} />

    }
  }

  if (!dataReady) {
    return <div className="content">Checking Authentication...</div>
  }
}


export default PrivateRoute;
