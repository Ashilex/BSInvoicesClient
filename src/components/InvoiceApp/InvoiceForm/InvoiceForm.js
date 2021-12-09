import React, {useEffect, useRef, useState} from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {retrieveCompanies} from "../../../Utils/dbCall";

function InvoiceForm(props) {
  const [dataReady, setDataReady] = useState(false)
  const [companies, setCompanies] = useState(null)
  const { register, formState: { errors }, handleSubmit } = useForm({criteriaMode:"all"});
  const onSubmit = (data) => alert(JSON.stringify(data));

  useEffect( () => {
    retrieveCompanies().then(data =>{
      setCompanies(data)
      setDataReady(true)}
    )


  },[])


  return ( dataReady ?
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("id_bs", { required: 'Questo campo è obbligatorio' })} placeholder="Numero fattura" />
          <ErrorMessage
            errors={errors}
            name="id_bs"
            render={({ message }) => {
              console.log('fanculo')
              return (<p>{message}</p>)
            }}
          />
        <input {...register("lastName", { minLength: 2 })} placeholder="Last name" />

        <select {...register("category")}>
          {companies.map( e => <option key={`c-${e.id_company}`} value={e.id_company}>{e.name}</option>)}
        </select>

        <input {...register("checkbox")} type="checkbox" value="A" />
        <input {...register("checkbox")} type="checkbox" value="B" />
        <input {...register("checkbox")} type="checkbox" value="C" />

        <input {...register("radio")} type="radio" value="A" />
        <input {...register("radio")} type="radio" value="B" />
        <input {...register("radio")} type="radio" value="C" />

        <input type="submit" />
      </form>
      : <div> in attesa dei dati</div>
  )
}

export default InvoiceForm
