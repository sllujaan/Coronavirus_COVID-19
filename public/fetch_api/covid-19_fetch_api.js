

import {showNetworkError, confirmed, recovered, deaths, removeNetworkError, chart_new, ctx_new, drawChart} from '../covid-19.js'


var covid_19_url = 'https://covid19.mathdro.id/api'


export var covid_data = async (country, date) => {

    var url  = covid_19_url

    //if(!country) url = covid_19_url
    if(country) url = covid_19_url+"/confirmed"
    if(date) url = covid_19_url+"/daily/"+date


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
    
    removeNetworkError()
    setLoading()
    
    if(country) {
        console.log("country ====:: ", country)
        covid_data(country)
        .then(data => {
            console.log(getCountyHistory(data, country))
            //drawing Cart----------------
            
            

            var countryData = getCountyHistory(data, country)
            //drawChart(ctx_new, "", "", countryData)
            //-----------------------

            console.log(data)
            setAll(data, country)
            //console.log(getConfirmed(data, 'France'))
        })
        .catch(err => {
            console.error(err)
            showNetworkError()
            cancelLoading()
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
            cancelLoading()
        })

    }

}











export var setLoading = () => {
    confirmed.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
    recovered.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
    deaths.innerHTML = `<i class="fas fa-circle-notch fa-spin fa-1x"></i>`
}



function cancelLoading () {
    confirmed.innerHTML = `---`
    recovered.innerHTML = `---`
    deaths.innerHTML = `---`
}




function getCountyHistory(data, country) {
    
    var promise = new Promise((resolve, reject) => {
        var countryArray = []
        data.forEach(obj => {
            if(obj.countryRegion === country) {
                
                countryArray.push({lastUpdate:obj.lastUpdate, confirmed:obj.confirmed})
            }
        })
        resolve(countryArray)
    })
    return promise
}



function getDailyArray(country) {
    var today = new Date()
    var dd = today.getDate()
    dd = 1
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    var todayStr = mm+'-'+dd+'-'+yyyy

    var prevMonth1 = ((mm > 1) ? (mm-1) : (mm=12))
    var prevMonth2 = ((mm > 2) ? (mm-2) : (mm=12))
    var prevMonth3 = ((mm > 3) ? (mm-3) : (mm=12))


    var prevMonth1Str = ((mm > 2) ? (mm-1) : (mm=12))+'-'+dd+'-'+yyyy
    var prevMonth1Str = ((mm > 2) ? (mm-1) : (mm=12))+'-'+dd+'-'+yyyy
    var prevMonth1Str = ((mm > 2) ? (mm-1) : (mm=12))+'-'+dd+'-'+yyyy
    var prevMonth1Str = ((mm > 2) ? (mm-1) : (mm=12))+'-'+dd+'-'+yyyy

    /*
    getDaily(country, todayStr)
    console.log(getDaily(country, "2-15-2020"))
    console.log(getDaily(country, "3-1-2020"))
    console.log(getDaily(country, "4-1-2020"))
    */
}



function getDaily(country, date) {
    var promise = new Promise((resolve, reject) => {
         
        covid_data("", date)
        .then(data => {
            data.forEach(obj => {
                if(obj.countryRegion === country) {
                    resolve(obj)
                }
            })
            reject("No Data Found for "+country)
        })
        .catch(err => {
            console.error(err)
            reject(err)
        })
        
    })

    return promise
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