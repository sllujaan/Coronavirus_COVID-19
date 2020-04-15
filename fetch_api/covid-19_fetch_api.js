

import {showNetworkError, confirmed, recovered, deaths} from '../covid-19.js'


var covid_19_url = 'https://covid19.mathdro.id/api'


export var covid_data = async (country) => {

    var url

    if(!country) url = covid_19_url
    if(country) url = covid_19_url+"/confirmed"


    console.log("feching url...:: ", url)

    var res = await fetch(url)

    if(!res.ok) throw Error(res.status + " " + res.statusText)

    var data = await res.json()

    return data;

    
}







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

    if(country) {
        var countryRegion = data.find(index => {
            return index.countryRegion === country
        })

        if(countryRegion) return countryRegion.recovered
        
        return
    }

    return data.recovered.value
}

var getDeaths = (data, country) => {

    if(country) {
        var countryRegion = data.find(index => {
            return index.countryRegion === country
        })

        if(countryRegion) return countryRegion.deaths
        
        return
    }

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

var setAll = (data, country) => {
    if(country) {
        setConfirmed(getConfirmed(data, country))
        setRecovered(getRecovered(data, country))
        setDeaths(getDeaths(data, country))
    }
    else{
        setConfirmed(getConfirmed(data))
        setRecovered(getRecovered(data))
        setDeaths(getDeaths(data))
    }
    
}



export var showData = (country) => {

    setLoading()
    
    if(country) {
        console.log("country ====:: ", country)
        covid_data(country)
        .then(data => {
            console.log(data)
            setAll(data, country)
            //console.log(getConfirmed(data, 'France'))
        })
        .catch(err => {
            console.error(err)
            showNetworkError()
        })
    }
    else{
        
        
        covid_data()
        .then(data => {
            console.log(data)
            setAll(data)
            //console.log(getConfirmed(data, 'France'))
        })
        .catch(err => {
            console.error(err)
            showNetworkError()
        })

    }

}











export var setLoading = () => {
    confirmed.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
    recovered.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
    deaths.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
}



/*

covid_data()
.then(data => {
    console.log(data)
    setAll(data)
    //console.log(getConfirmed(data, 'France'))
})
.catch(err => {
    console.error(err)
    showNetworkError()
})

*/