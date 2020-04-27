
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
    dataSet_x_y.sort((a, b) => a.day - b.day)

    var prevValue = 0
    dataSet_x_y.forEach((obj, index) => {
        if(!(obj.day > prevValue)) {
            dataSet_x_y.splice(index, 1)
        }
        else{
            prevValue = obj.day
        }
    })

    var maxValuesToDraw = 10
    var index_diff = Math.floor(dataSet_x_y.length / maxValuesToDraw)  //dividing array into 10 values for performance improvemetns
    console.log(index_diff)
    

    var computedArray = [dataSet_x_y[0]]
    for(var i=0; i<maxValuesToDraw; i++) {
        computedArray.push(dataSet_x_y[(index_diff * (i+1))])
    }
    computedArray.push(dataSet_x_y[dataSet_x_y.length-1])
    console.log(computedArray)


    return computedArray
}













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