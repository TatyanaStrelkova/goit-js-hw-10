const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) { 

      return fetch(`${BASE_URL}${name}?${fields}
`)
        .then(responce => {
            return responce.json()
        })
        .catch(error => { 
          console.log(error)
        })
}

