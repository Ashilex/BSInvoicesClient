import React, {useEffect, useRef, useState} from "react";

import OrderList from "./OrderList/OrderList";
import InvoiceForm from "./InvoiceForm/InvoiceForm";
import {useNavigate} from "react-router-dom";
import { getUser, removeUserSession } from '../../Utils/Common';
import './invoice.style.css'


function InvoiceApp(props) {
  const user = getUser();

  let navigate = useNavigate()

  const handleLogout = () => {
    removeUserSession();
    navigate('./login', {replace:true})
  }


  return (
    <div>
      Welcome {user.name}!<br /><br />
      <h2>Aggiungi una fattura</h2>
      <OrderList/>
      <InvoiceForm/>
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  )
}

export default InvoiceApp;
