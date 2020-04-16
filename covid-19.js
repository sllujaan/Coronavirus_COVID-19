

import {covid_data, showData} from './fetch_api/covid-19_fetch_api.js'


var countries = ['Spain', 'Italy', 'Germany', 'France', 'US', 'United Kingdom', 'Iran', 'Turkey', 'China', 'Belgium', 'Brazil', 'Netherlands', 'Pakistan', 'India', 'Canada', 'Thailand']
countries.sort()
console.log(countries)

var body = document.getElementsByTagName("body")[0]
export var confirmed = document.getElementsByClassName("conformed")[0].getElementsByClassName("value")[0]
export var recovered = document.getElementsByClassName("recovered")[0].getElementsByClassName("value")[0]
export var deaths = document.getElementsByClassName("deaths")[0].getElementsByClassName("value")[0]


var country = document.getElementById("countries-covid-19")
console.log(country.value)

country.addEventListener('change', (e) => {
    console.log(e.target.value)
    showData(e.target.value)
    
})


showData()




export function removeNetworkError() {
    var network_error = document.getElementById("n-err")
    console.log(network_error)
    if(network_error) network_error.remove()
}



export var showNetworkError = () => {

    var network_error = document.createElement('h2')
    network_error.setAttribute("id", "n-err")
    network_error.innerHTML = `Check your connection.`
    body.insertBefore(network_error, body.children[1])
}




makeSelectOption(countries)


function makeSelectOption(arr) {
    if(Array.isArray(arr) && arr.length > 0) {
        arr.forEach(country_element => {
            var option = document.createElement('option')
            option.setAttribute("value", country_element)
            option.innerText = country_element
            console.log(option)
            country.append(option)
        })
    }
}












/*

var makeSelectOption = (arr) => {
    if(Array.isArray(arr) && arr.length > 0) {
        arr.forEach(country_element => {
            var option = document.createElement('option')
            option.setAttribute("value", country_element)
            console.log(option)
            //country.append()
        })
    }
    else{

    }
}

*/