

import {showNetworkError} from '../covid-19.js'


var url = 'https://covid19.mathdro.id/api'


export var covid_data = async () => {
    
    var res = await fetch(url)

    if(!res.ok) throw Error(res.status + " " + res.statusText)

    var data = await res.json()

    return data;
}



covid_data()
.then(data => {
    console.log(data.confirmed)
})
.catch(err => {
    console.error(err)
    showNetworkError()
})





var getConfirmed = (data, country) => {
    return data.confirmed.value
}



var setConfirmed = () => {
    
}

