

import {covid_data, showData, generateApiData} from './fetch_api/covid-19_fetch_api.js'
import { covid_19_data } from "./convas/chart_data_api.js";
import { Chart } from "./convas/chart_graph.js";


var countries = ['Spain', 'Italy', 'Germany', 'France', 'US', 'United Kingdom', 'Iran', 'Turkey', 'China', 'Belgium', 'Brazil', 'Netherlands', 'Pakistan', 'India', 'Canada', 'Thailand']
countries.sort()
console.log(countries)

var body = document.getElementsByTagName("body")[0]
export var confirmed = document.getElementsByClassName("conformed")[0].getElementsByClassName("value")[0]
export var recovered = document.getElementsByClassName("recovered")[0].getElementsByClassName("value")[0]
export var deaths = document.getElementsByClassName("deaths")[0].getElementsByClassName("value")[0]
export var chart_new = document.getElementById("chart-new")
export var ctx_new = chart_new.getContext('2d')


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





var chart_new = document.getElementById("chart-new")
var ctx_new = chart_new.getContext('2d')






try {

    var myChart

    /*
    generateApiData("US")
    .then(data => {
        console.log(data)
        myChart = new Chart(ctx_new, "", "", data, true)
    })*/

    var covid_19_data_1 = [
        {"day":1, infected_people: 100},
        {"day":2, infected_people: 500},
        {"day":3, infected_people: 1000},
        {"day":4, infected_people: 2000},
        {"day":5, infected_people: 4000},
        {"day":6, infected_people: 8000},
        {"day":7, infected_people: 10000}
    ]

    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    console.log(covid_19_data_1)
    
    console.log(covid_19_data_1)
    myChart = new Chart(ctx_new, "", "", covid_19_data_1, true)

    var windowInnerWidth = window.innerWidth
    window.addEventListener('resize', e => {
        var current_innerWidth = e.target.innerWidth
        var diff = current_innerWidth - windowInnerWidth
        if(diff > 10 || diff < -10) {
            console.log("updated Chart...")
            myChart = myChart.update()
            
            windowInnerWidth = e.target.innerWidth
        }
    })

}
catch (err) {
    console.error(err)
}








/*
export function drawChart(ctx_new, label_x, label_y, covid_19_data) {
    try {
    
        var myChart = new Chart(ctx_new, label_x, label_y, covid_19_data)
        
        var windowInnerWidth = window.innerWidth
        
        window.addEventListener('resize', e => {
            console.log(e)
            console.log(windowInnerWidth)
        
            var current_innerWidth = e.target.innerWidth
            var diff = current_innerWidth - windowInnerWidth
        
            console.log(diff)
        
            if(diff > 10 || diff < -10) {
                console.log("updated Chart...")
                myChart = myChart.update()
                
                windowInnerWidth = e.target.innerWidth
            }
        })
        
        }
        catch (err) {
            console.error(err)
        }
}


*/



//chart content---------------------
/*
var chart_new = document.getElementById("chart-new")
var ctx_new = chart_new.getContext('2d')

try {
    

    
    var myChart = new Chart(ctx_new, "", "", covid_19_data)
    
    var windowInnerWidth = window.innerWidth
    
    window.addEventListener('resize', e => {
        console.log(e)
        console.log(windowInnerWidth)
    
        var current_innerWidth = e.target.innerWidth
        var diff = current_innerWidth - windowInnerWidth
    
        console.log(diff)
    
        if(diff > 10 || diff < -10) {
            console.log("updated Chart...")
            myChart = myChart.update()
            
            windowInnerWidth = e.target.innerWidth
        }
    })
    
    }
    catch (err) {
        console.error(err)
    }


*/
//-------------------------







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