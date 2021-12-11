import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {retrieveCompanies, postBillData} from "../../../Utils/dbCall";
import './formAddInvoice.style.css'

function InvoiceForm(props) {
  const [dataReady, setDataReady] = useState(false)
  const [companies, setCompanies] = useState(null)
  const { register, watch, formState: { errors }, handleSubmit } = useForm({mode:"onBlur", criteriaMode:"all", defaultValues: {iva_amount: "0.00"}});
  const watchIVA = watch("iva", false)
  const onSubmit = (data) => {
    console.log('dati provenienti dal form', data)
    console.log('dati provenienti dal form', JSON.stringify(data))
    postBillData(data)
    alert(JSON.stringify(data));

  }

  useEffect( () => {
    retrieveCompanies().then(data =>{
      setCompanies(data)
      setDataReady(true)}
    )


  },[])


  return ( dataReady ?
      <div className="form-container">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-fields">
            <div className="jfy-right">Numero fattura</div>
                <div className="jfy-left">
                  <input className="input-text" {...register("id_bs", { required: 'Questo campo è obbligatorio' })} placeholder="Numero fattura" />
                  <ErrorMessage
                    errors={errors}
                    name="id_bs"
                    render={({ message }) => {
                      console.log('fanculo')
                      return (<span style={{"margin-left":'5px', 'color':'red'}}>{message}</span>)
                    }}
                  />
                </div>
                <div className="jfy-right">Azienda: </div>
                <select className="jfy-left input-text" {...register("id_company")}>
                  {companies.map( e => <option key={`c-${e.id_company}`} value={e.id_company}>{e.name}</option>)}
                </select>
                <div className="jfy-right">Data di fatturazione</div>
                <input className="jfy-left input-text calendar"
                  type="date"
                  {...register("bill_date", {
                    valueAsDate: true,
                  })}
                />
                <div className="jfy-right">Data di invio fattura</div>
                <input className="jfy-left input-text calendar"
                  type="date"
                  {...register("date_notification", {
                    valueAsDate: true
                  })}
                />
                <div className="jfy-right">Data di invio incasso</div>
                <input className="jfy-left input-text calendar"
                  type="date"
                  {...register("date_transaction", {
                    valueAsDate: true
                  })}
                />
                <div className="jfy-right">Data di valuta</div>
                <input className="jfy-left input-text calendar"
                  type="date"
                  {...register("date_currency", {
                    valueAsDate: true
                  })}
                />
                <div className="jfy-right">Totale fattura</div>
                <div className="jfy-left">
                  <input className="input-text" type="string"
                     {...register("total", {
                       required: 'campo obbligatorio',
                       pattern: {
                         value:/[1-9][0-9]{0,4}\.[0-9]{2}/,
                         message: 'usa due cifre decimali e NON usare la virgola "," ma il punto "."'
                       }
                        })
                     }
                  />
                  <ErrorMessage
                    errors={errors}
                    name="total"
                    render={({ message }) => {
                      return (<span style={{"margin-left":'5px', 'color':'red'}}>{message}</span>)
                    }}
                  />
                </div>
                <div className="jfy-right">con IVA ?</div>
                <div className="jfy-left" >
                  <input {...register("iva")} type="checkbox" value="B" />
                  <ErrorMessage
                    errors={errors}
                    name="totale"
                    render={({ message }) => {
                    return (<span>{message}</span>)
                    }}
                  />
                  { watchIVA &&
                    <div>
                      <span>Totale iva</span>
                      <input className="input-text" {...register("iva_total", { required: 'Questo campo è obbligatorio' })}  className="calendar" placeholder="Numero fattura" />
                    </div>
                  }
                </div>
                <div className="jfy-right">Giorni per il pagamento</div>
                <div className="jfy-left">
                  <input className="input-text" type="number" {...register("payment_to_GG_days", { required: 'Questo campo è obbligatorio' })} placeholder="Numero giorni" />
                  <ErrorMessage
                    errors={errors}
                    name="payment_to_GG_days"
                    render={({ message }) => {
                      return (<span style={{"margin-left":'5px', 'color':'red'}}>{message}</span>)
                    }}
                  />
                </div>
                <div className="jfy-right">Data di pagamento stimata</div>
                <input className="jfy-left input-text calendar"
                  type="date"
                  {...register("months_payment_expected", {
                    valueAsDate: true
                  })}
                />
                <div className="jfy-right">Eventuali note </div>
                <input className="jfy-left input-text" {...register("note")} placeholder="..." />
                {/*<input type="hidden" {...register('id_bs_personal_data_business')} type="number" value="2" />*/}

              </div>
            {/*<svg xmlns="http://www.w3.org/2000/svg" >*/}
            {/*  <defs>*/}
            {/*    /!*<style>.cls-1{fill:red;}</style>*!/*/}
            {/*  </defs>*/}
            {/*  <title>Risorsa 1</title>*/}
            {/*  <g id="Livello_2" data-name="Livello 2">*/}
            {/*    <g id="Livello_1-2" data-name="Livello 1">*/}
            {/*      <rect fill="blue" width="156" height="136"/>*/}
            {/*      <path fill="red"*/}
            {/*            d="M128.69,304,434,310,276,321H0V0L30.14,218.12A99.49,99.49,0,0,0,128.69,304Z"/>*/}
            {/*    </g>*/}
            {/*  </g>*/}
            {/*</svg>*/}
              <div>{props.listaSelezionata}</div>
            <input className="input-button" type="submit" />
        </form>
      </div>
      : <div> in attesa dei dati</div>
  )
}

export default InvoiceForm
