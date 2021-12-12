import React, {useEffect, useRef, useState} from "react";

import './style.css'

function SelectedOrdersList({lista}) {

  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    if (lista!==null){
     setSelectedOrders(lista)
    }
    else{
      setSelectedOrders([])
    }
  }, [lista])

  return (
    <div>
      <h3>La fattura compilata verrà aggiunta a questi ordini: </h3>
      <div className="gabbia-selected-orders">
          {
            selectedOrders.filter((e,index)=> e!==null)
              .map((e, index)=>{
                return (<div className="selected-order" key={`uSO${index}`}>{e.number_external_order}</div>)
              })
          }
      </div>
    </div>
  )

}

export default SelectedOrdersList;
