

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
    for(var i=1; i<100; i++) {
        sampleData.push({day:i, inf:(i * 2)})
    }
    resolve(sampleData)
})


