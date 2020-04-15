

var url = 'https://covid19.mathdro.id/api555'







var covid_data = async () => {
    
    var res = await fetch(url)

    if(!res.ok) throw Error(res.status + " " + res.statusText)

    var data = await res.json()

    return data;
}




covid_data()
.then(data => {
    console.log(data)
})
.catch(err => {
    console.error(err)
})