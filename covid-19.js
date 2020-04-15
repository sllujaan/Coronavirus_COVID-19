

import {} from './fetch_api/covid-19_fetch_api.js'



var country = document.getElementById("countries-covid-19")
console.log(country.value)

country.addEventListener('change', (e) => {
    console.log(e.target.value)
})

