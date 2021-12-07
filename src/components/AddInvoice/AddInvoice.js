import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import { getUser, removeUserSession } from '../../Utils/Common';


function AddInvoice(props) {
  const user = getUser();

  let navigate = useNavigate()

  const handleLogout = () => {
    removeUserSession();
    navigate('./login', {replace:true})
  }


  return (
    <div>
      {/*Welcome {user.name}!<br /><br />*/}
      <h2>Aggiungi una fattura</h2>

      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  )
}

export default AddInvoice;