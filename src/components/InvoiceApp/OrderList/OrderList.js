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
  },[])



  const handleOnChange = (position, id_order) => {
    const updateOrderSelection = selectedOrders.map((item, index) =>
      index === position ? id_order.id_external_order : item);
    setSelectedOrders(updateOrderSelection)
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item)
    setCheckedState(updatedCheckedState);
  }

  return ( orders ?
    <div className="no-bill-orders-list">
      <h2>Ordini senza fattura</h2>
      <ul className="to-choose-list">
        {orders.map((e, index) => {
          console.log('index', index)
          return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    // name={name}
                    value={e.id_external_order}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index, e.id_external_order)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{`${e.id_external_order} ${e.Company.id_company}`}</label>
                </div>

              </div>
            </li>
          );
        })}

      </ul>
            <h2>Lista selezionata</h2>
            <div>
              <ul>
                {
                  selectedOrders.filter((e,index)=> e!==null)
                    .map((e, index)=>{
                      return (<li key={`u${index}`}>{e}</li>)
                    })
                }
              </ul>
            </div>
    </div>
       : <div>caricamento</div>
  )

}

export default OrderList;
