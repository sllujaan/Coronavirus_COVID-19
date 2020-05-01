import { getPrevDate } from './calculations/data-calculation.js'


export var covid_19_data = [
    {"day":1, infected_people: 100},
    {"day":2, infected_people: 500},
    {"day":3, infected_people: 1000},
    {"day":4, infected_people: 2000},
    {"day":5, infected_people: 4000},
    {"day":6, infected_people: 8000},
    {"day":7, infected_people: 10000}
]

console.log(covid_19_data)
console.log(Object.keys(covid_19_data[0]))





var data = [{day:1, inf:5}, {day:2, inf:4}, {day:3, inf:3}, {day:4, inf:2}, {day:1, inf:1}]
console.log(data)


data.sort((a, b) => a.day - b.day)

var prevValue = 0
data.forEach((obj, index) => {
    if(!(obj.day > prevValue)) {
        data.splice(index, 1)
    }
    else{
        prevValue = obj.day
    }
})


export var sampleData = [
    {day:1, inf:1},
    {day:2, inf:1},
    {day:3, inf:2},
    {day:4, inf:4}
]





export var sampleData1 = []
for(var i=1; i<100; i++) {
    sampleData1.push({day:i, inf:(i * 2)})
}




/*
var generateSampleData = () => {
    return promise = new Promise((resolve, reject) => {
        var arr = []
        setTimeout(() => {
            arr.push(1)
            resolve(arr)
        }, 3000);
    })
}

console.log(generateSampleData())

*/


export var genData = new Promise((resolve, reject) => {

    var sampleData = []
    for(var i=1; i<1000; i++) {
        sampleData.push({day:i, inf:(i * 2)})
    }
    resolve(sampleData)
})






export function getprevDays() {

    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()

    var prevDay1 =getPrevDate(Date.now(), 2)
    var prevDay15 =getPrevDate(Date.now(), 15)
    var prevDay30 =getPrevDate(Date.now(), 30)
    var prevDay45 =getPrevDate(Date.now(), 45)

    console.table([
        prevDay1,
        prevDay15,
        prevDay30,
        prevDay45
    ])

    var datePrevDay1 = new Date(prevDay1)
    var datePrevDay15 = new Date(prevDay15)
    var datePrevDay30 = new Date(prevDay30)
    var datePrevDay45 = new Date(prevDay45)

    var UTC1 = Date.UTC(datePrevDay1.getFullYear(), datePrevDay1.getMonth()+1, datePrevDay1.getDate() )
    var UTC15 = Date.UTC(datePrevDay15.getFullYear(), datePrevDay15.getMonth()+1, datePrevDay15.getDate() )
    var UTC30 = Date.UTC(datePrevDay30.getFullYear(), datePrevDay30.getMonth()+1, datePrevDay30.getDate() )
    var UTC45 = Date.UTC(datePrevDay45.getFullYear(), datePrevDay45.getMonth()+1, datePrevDay45.getDate() )
    
    /*
    console.table([
        (prevDay1+" = "+Date.UTC(datePrevDay1.getFullYear(), datePrevDay1.getMonth()+1, datePrevDay1.getDate() ) ) ,
        (prevDay15+" = "+Date.UTC(datePrevDay15.getFullYear(), datePrevDay15.getMonth()+1, datePrevDay15.getDate() )  ),
        (prevDay30+" = "+Date.UTC(datePrevDay30.getFullYear(), datePrevDay30.getMonth()+1, datePrevDay30.getDate() )  ),
        (prevDay45+" = "+Date.UTC(datePrevDay45.getFullYear(), datePrevDay45.getMonth()+1, datePrevDay45.getDate() )  )
    ])
    */

    return [UTC1, UTC15, UTC30, UTC45]
}




/*
var prevDays = getprevDays()

var day1 = new Date(prevDays[0])
console.log(day1.getDate(), day1.getMonth(), day1.getFullYear())
*/

