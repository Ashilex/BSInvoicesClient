import React, {useEffect, useState} from "react";
import './deleteInvoice.style.css'
import axios from "axios";
import BillRow from "./BillRow/BillRow";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function DeleteInvoice(props) {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const { register, formState: { errors }, handleSubmit } = useForm({mode:"onBlur", criteriaMode:"all"});
  const [data, setData] = useState([])
  const [billsDataReady,setBillsDataReady] = useState(false)

  let prova = ['ale', 'franco', 'giada']

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/api/business/bill/range?start=2012-01-01&end=2013-01-01`)
  //     .then(response => {
  //       console.log('dati delle fatture', response.body.rangedBills)
  //
  //     }).catch(error => {
  //       console.log(error)
  //     });
  // })

  const onSubmit = (data) => {
    let dataInizio = JSON.stringify(data.startFrom).substring(1, 11)
    let dataFine = JSON.stringify(data.upTo).substring(1, 11)

    axios.get(`http://localhost:3000/api/business/bill/range?start=${dataInizio}&end=${dataFine}`)
      .then(response => {
        console.log('dati delle fatture', response.data.rangedBills)
        // alert(JSON.stringify(dataFine));
        setData(response.data.rangedBills)
        setBillsDataReady(true)
        console.log('dati delle date inseriti dal form', JSON.stringify(data.startFrom))
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div className="delContainer">
      <h1>Elimina una fattura</h1>
      <p>Per eliminare una fattura seleziona una delle ultime esaurite oppure cercane una più vecchia selezionando un'intervallo di tempo.</p>

      <div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>

            <div className="">A partire da</div>
            <input className=""
                   type="date"
                   {...register("startFrom", {
                     valueAsDate: true,
                   })}
            />
            <ErrorMessage
              errors={errors}
              name="startFrom"
              render={({ message }) => {
                return (<span>{message}</span>)
              }}
            />
            <div className="">Fino a</div>
            <input className=""
                   type="date"
                   {...register("upTo", {
                     valueAsDate: true
                   })}
            />
          <ErrorMessage
            errors={errors}
            name="upTo"
            render={({ message }) => {
              return (<span>{message}</span>)
            }}
          />


          <input className="input-button" type="submit" />
        </form>
      </div>

      { billsDataReady &&
      <div>
        <span>prova</span>
        {
          data.map((bill, index) => <BillRow key={'bill'+ index} bill={bill}></BillRow>
          )
        }
      </div>

      }
    </div>
  )

}

export default DeleteInvoice;
