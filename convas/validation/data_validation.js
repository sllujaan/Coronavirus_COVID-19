




export function validateData(ctx, label_x, label_y, dataSet_x_y) {
    console.log("validating.............")
    validateContext(ctx)
    validateLabels(label_x, label_y)
    validateDataSet(dataSet_x_y)
}


export var data_x = []
export var data_y = []



export function validateContext(ctx) {
    if(!ctx.canvas) throw Error("2d context for canvas is not present..")
}

export function validateLabels(label_x, label_y) {
    if(label_x && ((typeof label_x !== 'string') && (typeof label_x !== 'number'))) throw Error("label_x value must be a string or number.")
    if(label_y && ((typeof label_y !== 'string') && (typeof label_y !== 'number'))) throw Error("label_y value must be a string or number.")
}

export function validateDataSet(dataSet_x_y) {
    if(!dataSet_x_y) throw Error("Data is required to draw the chart.")

    if( typeof dataSet_x_y !== 'object' ) throw Error("dataSet must be arry of json objects or two subArrays for x and y axis values.")

    if( Array.isArray(dataSet_x_y) ) validateArray(dataSet_x_y)


}

export function validateArray(dataSet_x_y) {
    console.log(dataSet_x_y.length)

    if(dataSet_x_y.length === 0) throw Error("Array must have json objects, or two subArrays which should have x and y axis values")

    //validating that user has giving json data-----------------------
    if(dataSet_x_y[0].constructor === ({}).constructor) {
        if(dataSet_x_y.length < 4) throw Error("Array must have at least 4 json object.")
        validateArrayOfJsons(dataSet_x_y)
    }
    //---------------------------------------------

    //validating that user has giving arrays data-----------------------
    if(dataSet_x_y[0].constructor === [].constructor) {
        if(dataSet_x_y.length !== 2) throw Error("Array must have two subArrays which should have x and y axis values")

        if(!Array.isArray(dataSet_x_y[0])) throw Error("subArray data is not present for x axis value.")
        validateArray_X(dataSet_x_y[0])

        if(!Array.isArray(dataSet_x_y[1])) throw Error("subArray data is not present for y axis value.")
        validateArray_Y(dataSet_x_y[1])
    }
    //------------------------------------------------

    
}

export var property1Name
export var property2Name

export function validateArrayOfJsons(dataSet_x_y) {

    console.log(Object.keys(dataSet_x_y[0])[0])

    dataSet_x_y.forEach(obj => {
        console.log(Object.keys(obj).length)
        if(Object.keys(obj).length !== 2) throw Error("Each json oject must have only two properties.")

        if(!property1Name && !property2Name) {
            property1Name = Object.keys(dataSet_x_y[0])[0]
            property2Name = Object.keys(dataSet_x_y[0])[1]
        }

        if(Object.keys(obj)[0] !== property1Name || Object.keys(obj)[1] !== property2Name) throw Error("All Jsons prropertes names must match with first json object properties.")

        if(typeof obj[property1Name] !== 'number' || typeof obj[property2Name]  !== 'number') throw Error("json ojects properties must have numeric values.")

        data_x.push(obj[property1Name])
        data_y.push(obj[property2Name])
    })
}




export function validateArray_X(dataSet_x) {
    if(dataSet_x.length < 4) throw Error("x axis subArray must have at least 4 numeric value.")

    dataSet_x.forEach(x_val => {
        if((typeof x_val !== 'number')) throw Error("x axis subArray must have at least 4 numeric value. Repeat")
    })

}


export function validateArray_Y(dataSet_y) {
    if(dataSet_y.length < 3) throw Error("y axis subArray must have at least 3 numeric value.")

    dataSet_y.forEach(y_val => {
        if((typeof y_val !== 'number')) throw Error("y axis subArray must have at least 3 numeric value. Repeat")
    })

}

