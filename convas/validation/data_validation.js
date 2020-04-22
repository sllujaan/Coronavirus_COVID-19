



export function validateData(ctx, label_x, label_y, dataSet_x_y) {
    console.log("validating.............")
    validateContext(ctx)
    validateLabels(label_x, label_y)
    validateDataSet(dataSet_x_y)
}




export function validateContext(ctx) {
    if(!ctx.canvas) throw Error("2d context for canvas is not present..")
}

export function validateLabels(label_x, label_y) {
    if(label_x && ((typeof label_x !== 'string') && (typeof label_x !== 'number'))) throw Error("label_x value must be a string or number.")
    if(label_y && ((typeof label_y !== 'string') && (typeof label_y !== 'number'))) throw Error("label_y value must be a string or number.")
}

export function validateDataSet(dataSet_x_y) {
    if(!dataSet_x_y) throw Error("Data is required to draw the chart.")

    if( typeof dataSet_x_y !== 'object' && !Array.isArray(dataSet_x_y) ) throw Error("dataSet must be a object of type json or array of json object.")


}