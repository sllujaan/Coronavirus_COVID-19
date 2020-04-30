
import {data_x, data_y} from '../validation/data_validation.js'


export var data_x_verified
export var data_y_verified

export function calculatedData_X () {
    console.log(data_x)
    var uniqueSet = [...new Set(data_x)]
    uniqueSet.sort((a, b) => a - b)
    data_x_verified = uniqueSet

    var nagativeNum = []
    var positiveNum = []
    uniqueSet.forEach(num => {
        (num < 1) ? (nagativeNum.push(num)) : (positiveNum.push(num))
    })

    var diff_positive_nagative = data_x_verified.length - nagativeNum.length
  
    if(data_x_verified.length < 4 || diff_positive_nagative < 4) throw Error("At least 4 unique positive values must be presented for x axis data")

    console.log(positiveNum)
    data_x_verified = positiveNum

}

export function calculatedData_Y () {
    console.log(data_y)

    var uniqueSet = [...new Set(data_y)]
    uniqueSet.sort((a, b) => a - b)
    data_y_verified = uniqueSet

    //console.log(data_y_verified)
    var nagativeNum = []
    var positiveNum = []
    uniqueSet.forEach(num => {
        (num < 1) ? (nagativeNum.push(num)) : (positiveNum.push(num))
    })
    
    var diff_positive_nagative = data_y_verified.length - nagativeNum.length

    //console.warn(diff_positive_nagative)

    if(diff_positive_nagative <= 0) throw Error("At least 1 unique positive value must be presented for y axis data")

    //console.log(positiveNum)
    data_y_verified = positiveNum
}

export function getCalculatedDataSet_x_y (dataSet_x_y) {

    console.log(dataSet_x_y)

    

    var name_x = Object.keys(dataSet_x_y[0])[0]
    var name_y = Object.keys(dataSet_x_y[0])[1]

    console.warn(name_x, name_y)

    dataSet_x_y.sort((a, b) => a[name_x]- b[name_x])

    console.log(dataSet_x_y)

    var prevValue = 0
    
    dataSet_x_y.forEach((obj, index) => {
        console.log("foreach called.....................")
        console.log(obj[name_x], prevValue)
        if(!(obj[name_x] > prevValue)) {
            console.log("data spliced.........>>>>>>>>>>>>>><<<<<<<")
            dataSet_x_y.splice(index, 1)
        }
        else{
            console.log("data not spliced...........)))))))))((((((((((")
            prevValue = obj[name_x]
        }
    })

    

    //return dataSet_x_y

    dataSet_x_y.forEach(obj => {
        console.log(obj)
    })

    console.log(dataSet_x_y)
    console.error("chekout data here")

    var computedArray = dataSet_x_y

    if(dataSet_x_y.length > 10) {

        var maxValuesToDraw = 10
        var index_diff = Math.floor(dataSet_x_y.length / maxValuesToDraw)  //dividing array into 10 values for performance improvemetns
        console.log(index_diff)
        

        computedArray = [dataSet_x_y[0]]
        for(var i=0; i<maxValuesToDraw; i++) {
            computedArray.push(dataSet_x_y[(index_diff * (i+1))])
        }
        computedArray.push(dataSet_x_y[dataSet_x_y.length-1])
        console.log(computedArray)

    }


    return computedArray
}



export function getCalculatedDate() {
    var date = Date.now()
    var today = new Date(date)
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()

}

export function getPrevDate(date, prevDayNum) {
    var today = new Date(date)
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()

    var prev_dd = dd
    var prev_mm = mm
    var prev_yyyy = yyyy

    
    for(var i=0; i<prevDayNum; i++) {
        var tempMonth = prev_mm
        if(prev_dd === 1 && prev_mm === 1) prev_yyyy = getPrevYear(prev_yyyy)
        if(prev_dd === 1) prev_mm = getPrevMonth(prev_mm)
        prev_dd = getPrevDay(prev_dd, prev_mm)
    }

    console.warn(prev_dd, prev_mm, prev_yyyy)
    console.log(new Date(prev_mm+'-'+prev_dd+'-'+prev_yyyy))

    return (prev_mm+'-'+prev_dd+'-'+prev_yyyy)


}

function getPrevDay(day, month) {
    if(day > 1) {
        return (day-1)
    }
    else{
        if(month === 1) return 31
        if(month === 2) return 31
        if(month === 3) return 28
        if(month === 4) return 31
        if(month === 5) return 30
        if(month === 6) return 31
        if(month === 7) return 30
        if(month === 8) return 31
        if(month === 9) return 30
        if(month === 10) return 31
        if(month === 11) return 30
        if(month === 12) return 31
        
    }
}

function getPrevMonth(month) {
    
    if(month > 1) {
        return (month-1)
    }
    else{
        return 12
    }
    
}

function getPrevYear(year) {
    if(year > 1) {
        return (year-1)
    }
    else{
        return 12
    }
}

/*
for(var i=1; i<200; i++) {
    getPrevDate("1-1-2020", i)
}*/













/*var computedArr = [
        dataSet_x_y[0],
        dataSet_x_y[index_diff],
        dataSet_x_y[(index_diff * 2)],
        dataSet_x_y[(index_diff * 3)],
        dataSet_x_y[(index_diff * 4)],
        dataSet_x_y[(index_diff * 5)],

        dataSet_x_y[((dataSet_x_y.length-1) - (index_diff * 5))],
        dataSet_x_y[((dataSet_x_y.length-1) - (index_diff * 4))],
        dataSet_x_y[((dataSet_x_y.length-1) - (index_diff * 3))],
        dataSet_x_y[((dataSet_x_y.length-1) - (index_diff * 2))],
        dataSet_x_y[(dataSet_x_y.length-1) - (index_diff)],
        dataSet_x_y[dataSet_x_y.length-1]
    ]*/