

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


