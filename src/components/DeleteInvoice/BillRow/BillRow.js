import React, {useEffect, useState} from "react";
import axios from "axios";
import './BillRow.style.css'

function BillRow({key, bill}) {

  const [exist, setExist] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [iAmDeliting, setIAmDeleting] = useState(false)

  const handleClick = () => {
    setDeleteConfirm(true)
  }

  const closeConfirmationMenu = () => {
    setDeleteConfirm(false)
  }

  const deleteRow = () => {
    axios.delete(`${process.env.REACT_APP_HOST}:3000/api/business/bill/`, {data:{bill:bill.id_internal_bill}})
      .then(response => {
        setIAmDeleting(true)
        setInterval(setExist(false), 1500)
      })
      .catch(error => {
        console.log(error)
      });

  }

  return ( exist &&
    <div key={key} className={`deletableRow ${iAmDeliting ? 'cancellando' : ''}`}>
      <div className="fissi">
        <span>{bill.bill_date}</span><span>{bill.id_bs}</span><span>{bill.total}</span>
        <button onClick={handleClick}>Elimina</button>
      </div>
      <div className={ `confirmationDiv ${deleteConfirm ? 'compaio' : 'scompaio'}`}>
        Eliminare ?
        <button className="input-button-choose" onClick={deleteRow}>Sì</button><button className="input-button-choose" onClick={closeConfirmationMenu}>No</button>
      </div>

    </div>
  )

}

export default BillRow;
