

export var covid_19_data = [
    {"day":1, infected_people: 100},
    {"day":2, infected_people: 500},
    {"day":3, infected_people: 1000},
    {"day":4, infected_people: 2000},
    {"day":5, infected_people: 4000}
]

console.log(covid_19_data)
console.log(Object.keys(covid_19_data[0]))
console.log(typeof covid_19_data)

console.log(!true)



var isValid = covid_19_data.forEach(data => {
    console.log("forEach")
    //if(data.infected_people === 1000) return true
    if(data.infected_people === 1000) console.log("yes 1000 found")
    return true
})

setTimeout(() => {
    console.log(isValid)
}, 2000);
