
import {data_x, data_y} from '../validation/data_validation.js'


export var data_x_verified
export var data_y_verified

export function getCalculatedData_X () {
    console.log(data_x)
    //data_x.filter((item, index) => data_x.indexOf(item) === index)
    var uniqueSet = [...new Set(data_x)]
    data_x.sort()
    
    data_x_verified = uniqueSet
}

export function getCalculatedData_Y () {
    console.log([data_y])
}


