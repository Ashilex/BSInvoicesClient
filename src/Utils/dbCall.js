import axios from "axios";

export const retrieveCompanies = () => {
  return axios.get(`http://localhost:3000/api/business/companies`)
    .then(response => {
      let data = response.data.companiesList;
      console.log('dati scaricati delle compagnie', data)
      return data
    }).catch(error => {
    console.log(error)
  });
}
