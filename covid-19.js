

import {covid_data} from './fetch_api/covid-19_fetch_api.js'


var body = document.getElementsByTagName("body")[0]



var country = document.getElementById("countries-covid-19")
console.log(country.value)

country.addEventListener('change', (e) => {
    console.log(e.target.value)
})























export var showNetworkError = () => {
    var network_error = document.createElement('h2')
    network_error.innerHTML = `Check your connection.`
    body.insertBefore(network_error, body.children[1])
}

