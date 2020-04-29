

import {showNetworkError, confirmed, recovered, deaths, removeNetworkError, chart_new, ctx_new, drawChart} from '../covid-19.js'
import { getprevDays } from '../convas/chart_data_api.js'


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




function getCountryArray(country) {
    var prevDays = getprevDays()
    console.log(prevDays)
    
    var day1 = new Date(prevDays[0])
    var day15 = new Date(prevDays[1])
    var day30 = new Date(prevDays[2])
    var day45 = new Date(prevDays[3])
    
    var day1Str = day1.getMonth()+"-"+day1.getDate()+"-"+day1.getFullYear()
    var day15Str = day15.getMonth()+"-"+day15.getDate()+"-"+day15.getFullYear()
    var day30Str = day30.getMonth()+"-"+day30.getDate()+"-"+day30.getFullYear()
    var day45Str = day45.getMonth()+"-"+day45.getDate()+"-"+day45.getFullYear()
    
    console.log(day1Str, day15Str, day30Str, day45Str)
    
    var urls = [day1Str, day15Str, day30Str, day45Str]
    //-------------------------------------
    
    
    var promises = Promise.all(urls.map(url => {
        return covid_data("", url)
        .then(data => {
            return data
        })
        .catch(err => {
            console.error(err)
        }) 
    }))

    return promises    

}


getCountryArray("US")
.then(dataArr => {
    console.log(dataArr)
    getCountryArrayFromPromise(dataArr, "US")
    .then(data => {
        console.log(data)
    })
})

function getCountryArrayFromPromise(dataArr, country) {
    
    return new Promise((resolve, reject) => {
        var arr = []
        dataArr.forEach((objArr, index) => {
            objArr.forEach(obj => {
                if (obj.countryRegion === country) arr.push(obj)
            })
            console.warn(index, dataArr.length)
            if(index === (dataArr.length-1)) resolve(arr)
        })
        
        reject("ERRORR::::::::")

    })
    

}














/*

function getDailyArray(country) {
    var today = new Date()
    var dd = today.getDate()
    dd = 1
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear()
    
    
    var prevMonth1 = ((mm > 1) ? (mm-1) : (12))
    var prevMonth2 = ((mm > 2) ? (mm-2) : (prevMonth1-1))
    var prevMonth3 = ((mm > 3) ? (mm-3) : (prevMonth2-1))

    var todayStr = mm+'-'+dd+'-'+yyyy
    var prevMonth1Str = prevMonth1+'-'+dd+'-'+yyyy
    var prevMonth2Str = prevMonth2+'-'+dd+'-'+yyyy
    var prevMonth3Str = prevMonth3+'-'+dd+'-'+yyyy




    getDaily(country, prevMonth1Str)
    .then(data => {
        console.log(data)
        dailyArr.push({lastUpdate:data.lastUpdate, confirmed:data.confirmed})
    })
    .catch(err => {
        console.error(err)
    })
    
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

*/




/*

dataArr.forEach(objArr => {
            objArr.forEach(obj => {
                //return obj.find(country => obj.countryRegion === country)
                //console.log(obj)
                if (obj.countryRegion === country) return obj 
            })
        })
*/



//console.log(day1.getDate(), day1.getMonth(), day1.getFullYear())












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