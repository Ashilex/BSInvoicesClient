import React, {useEffect, useRef, useState} from "react";

import OrderList from "./OrderList/OrderList";
import SelectedOrdersList from "./SelectedOrdersList/SelectedOrdersList";
import InvoiceForm from "./InvoiceForm/InvoiceForm";
import {useNavigate} from "react-router-dom";
import { getUser, removeUserSession } from '../../Utils/Common';
import './invoice.style.css'


function InvoiceApp(props) {
  const [selectedOrders, setSelectedOrders] = useState(null)
  const [update, setUpdate] = useState(false)
  const user = getUser();

  const updateOrdersListAfterBill = () => {
    setUpdate(!update)
    setSelectedOrders(null)
  }

  const getSelectedOrders = (ordiniSelezionati) => {
    setSelectedOrders(ordiniSelezionati)
  }

  let navigate = useNavigate()

  const handleLogout = () => {
    removeUserSession();
    navigate('./login', {replace:true})
  }


  return (
    <div className="invoice-app">
      <div className="welcome">
        Welcome {user.name}!
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>
      <h1>Aggiungi una fattura</h1>

      <OrderList liftState={getSelectedOrders} aggiornami={update}/>
      <InvoiceForm ordiniDaAggiornare={selectedOrders} aggiornaOrdini={updateOrdersListAfterBill} listaSelezionata={<SelectedOrdersList lista={selectedOrders} />}></InvoiceForm>
      {/*<SelectedOrdersList lista={selectedOrders}/>*/}
    </div>
  )
}

export default InvoiceApp;
