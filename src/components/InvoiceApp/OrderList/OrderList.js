import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import './style.css'

function OrderList(props) {

  const [checkedState, setCheckedState] = useState();
  const ale = ['ale', 'marco', 'franco', 'giorgio']
  const [orders,setOrders] = useState(null)
  const [selectedOrders,setSelectedOrders] = useState(null)

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/business/nullOrdersWC`)
      .then(response => {
        let data = response.data.ordiniWCompany;
        // console.log('dati scaricati', data.length)
        // console.log(' lunghezza di dei dati', data.length)
        setSelectedOrders(new Array(data.length).fill(null))
        setCheckedState(new Array(data.length).fill(false))
        // console.log(' lunghezza di orders', orders)
        // console.log('lunghezza di checkedState ', checkedState.length)
        setOrders(data)
      }).catch(error => {
      console.log(error)
    });
  },[props.aggiornami])



  const handleOnChange = (position, id_order, daNonAnnullare) => {
    const updateOrderSelection = selectedOrders.map((item, index) =>
      index === position ? (daNonAnnullare ? id_order : null) : item);
    setSelectedOrders(updateOrderSelection)
    props.liftState(updateOrderSelection)
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item)
    setCheckedState(updatedCheckedState);
  }

  return ( orders ?
    <div className="no-bill-orders-list">
      <h3>Ordini senza fattura</h3>
      <div className="to-choose-list">
        {orders.map((e, index) => {
          console.log('index', index)
          return (

              <div className="order-item" key={index}>
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    // name={name}
                    value={e.id_external_order}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index, e, !checkedState[index])}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>
                    <div className="cont-scroll ltl">
                      <span className="first-link" href="">
                      {e.number_external_order}
                      </span>
                    </div>
                    <span className="span-cPrice">{"€"} {e.total_order}</span>
                    {/*<div className="span-name">*/}
                    {/*  <span> {e.Company.name}</span>*/}
                    {/*</div>*/}
                    <div className="cont-scroll">
                      <span className="first-link" href="">
                      {e.Company.name}
                      </span>
                    </div>
                    {/*{`${e.id_external_order} ${e.Company.name}`}*/}
                  </label>
                </div>

              </div>

          );
        })}

      </div>
            {/*<h2>Lista selezionata</h2>*/}
            {/*<div>*/}
            {/*  <ul>*/}
            {/*    {*/}
            {/*      selectedOrders.filter((e,index)=> e!==null)*/}
            {/*        .map((e, index)=>{*/}
            {/*          return (<li key={`u${index}`}>{e.id_external_order}</li>)*/}
            {/*        })*/}
            {/*    }*/}
            {/*  </ul>*/}
            {/*</div>*/}
    </div>
       : <div>caricamento</div>
  )

}

export default OrderList;
