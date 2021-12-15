import axios from "axios";

export const retrieveCompanies = () => {
  return axios.get(`${process.env.REACT_APP_HOST}:3000/api/business/companies`)
    .then(response => {
      let data = response.data.companiesList;
      console.log('dati scaricati delle compagnie', data)
      return data
    }).catch(error => {
    console.log(error)
  });
}

export const postBillData = (formData, ordiniDaAggiornare) => {
  return axios.post(`${process.env.REACT_APP_HOST}:3000/api/business/bill`, {
    data: {
      form:formData,
      ordersToUpdate: ordiniDaAggiornare
    }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
