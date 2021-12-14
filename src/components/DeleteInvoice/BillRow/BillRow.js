import React, {useEffect, useState} from "react";
import axios from "axios";

function BillRow({key, bill}) {

  const [exist, setExist] = useState(true)

  const handleClick = () => {
    setExist(false)
  }
  return ( exist &&
    <div key={key}className="">

      <div><span>{bill.bill_date}</span><span>{bill.id_bs}</span><span>{bill.total}</span></div>
      <button onClick={handleClick}>Elimina</button>

    </div>
  )

}

export default BillRow;
