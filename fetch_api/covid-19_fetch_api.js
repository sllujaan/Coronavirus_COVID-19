

import {showNetworkError, confirmed, recovered, deaths} from '../covid-19.js'


var url = 'https://covid19.mathdro.id/api'


export var covid_data = async (country, typeOfData) => {

    var res = await fetch(url)

    if(!res.ok) throw Error(res.status + " " + res.statusText)

    var data = await res.json()

    return data;

    
}



covid_data()
.then(data => {
    console.log(data)
    setAll(data)
    console.log(getConfirmed(data, 'France'))
})
.catch(err => {
    console.error(err)
    showNetworkError()
})




//getter functions---------------------------------------
var getConfirmed = (data, country) => {

    if(country) {
        var countryRegion = data.find(index => {
            return index.countryRegion === country
        })

        if(countryRegion) return countryRegion.confirmed
        
        return
    }

    return data.confirmed.value
}

var getRecovered = (data, country) => {
    return data.recovered.value
}
var getDeaths = (data, country) => {
    return data.deaths.value
}
//--------------------------------------------------


//setter functions---------------------------------------
var setConfirmed = (value) => {
    confirmed.innerText = value
}
var setRecovered = (value) => {
    recovered.innerText = value
}
var setDeaths = (value) => {
    deaths.innerText = value
}
//--------------------------------------------------

var setAll = (data) => {
    setConfirmed(getConfirmed(data))
    setRecovered(getRecovered(data))
    setDeaths(getDeaths(data))
}
