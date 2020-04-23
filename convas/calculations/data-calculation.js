
import {data_x, data_y} from '../validation/data_validation.js'


export var data_x_verified
export var data_y_verified

export function calculatedData_X () {
    console.log(data_x)
    //data_x.filter((item, index) => data_x.indexOf(item) === index)
    var uniqueSet = [...new Set(data_x)]
    data_x.sort()
    
    data_x_verified = uniqueSet

    if(data_x_verified.length < 4) throw Error("At least 4 unique values must be presented for x axis data")
}

export function calculatedData_Y () {
    console.log(data_y)

    var uniqueSet = [...new Set(data_y)]
    data_y.sort()
    data_y_verified = uniqueSet
}

