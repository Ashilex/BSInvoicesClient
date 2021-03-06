import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {retrieveCompanies, postBillData} from "../../../Utils/dbCall";
import './formAddInvoice.style.css'

function InvoiceForm(props) {
  const [dataReady, setDataReady] = useState(false)
  const [companies, setCompanies] = useState(null)
  const { register, watch, formState: { errors }, handleSubmit } = useForm({mode:"onBlur", criteriaMode:"all", defaultValues: {iva_amount: "0.00"}});
  const watchIVA = watch("with_iva", false)

  const onSubmit = (data) => {
    console.log('dati provenienti dal form', data)
    console.log('dati provenienti dal form', JSON.stringify(data))
    console.log('dati provenienti dalla selezione ordini', JSON.stringify(props.ordiniDaAggiornare))
    try{
      postBillData(data, props.ordiniDaAggiornare.filter(order=>order !== null).map(order=>order.id_external_order))
      alert(JSON.stringify(data));
    }
    catch (e) {
      alert('manca ordine a cui allegare la fattura')
    }
    props.aggiornaOrdini()

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
                         message: 'usa il formato 0.00'
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
                  <input {...register("with_iva")} type="checkbox" />
                  <ErrorMessage
                    errors={errors}
                    name="with_iva"
                    render={({ message }) => {
                    return (<span>{message}</span>)
                    }}
                  />
                  { watchIVA &&
                    <div>
                      <span>Totale iva</span>
                      <input className="input-text" {...register("iva_total", {
                        required: 'Questo campo è obbligatorio',
                        pattern: {
                          value:/[1-9][0-9]{0,4}\.[0-9]{2}/,
                          message: 'usa il formato 0.00'
                        }})
                      }  className="calendar"
                         placeholder="Totale iva" />
                      <ErrorMessage
                        errors={errors}
                        name="iva_total"
                        render={({ message }) => {
                          return (<span style={{"margin-left":'5px', 'color':'red'}}>{message}</span>)
                        }}
                      />
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
                      valueAsDate: true,
                      required: 'Questo campo è obbligatorio'
                    })}
                  />
                <div className="jfy-right">Eventuali note </div>
                <div className="jfy-left">
                  <input className="jfy-left input-text" {...register("note", { required: 'Questo campo è obbligatorio' })} placeholder="..." />
                  <ErrorMessage
                    errors={errors}
                    name="note"
                    render={({ message }) => {
                      return (<span style={{"margin-left":'5px', 'color':'red'}}>{message}</span>)
                    }}
                  />
                </div>
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
