



export class Chart  {
    
    
    ctx
    label_x
    label_y
    data_x
    data_y
    canvas
    
    innerRectOffset_percentage = .2
    x_corrdinate_0
    y_corrdinate_0

    y_roof_1_height
    y_roof_1_val
    y_roof_2_height
    y_roof_2_val
    y_roof_3_height
    y_roof_3_val


    x_wall_1_width
    x_wall_1_val
    x_wall_2_width
    x_wall_2_val
    x_wall_3_width
    x_wall_3_val
    x_wall_4_width
    x_wall_4_val



    
    constructor(ctx, label_x, data_x, label_y, data_y, dataSet_x_y) {

        if(!ctx.canvas) throw Error("2d context for canvas is not present..")

        if(label_x && ((typeof label_x !== 'string') && (typeof label_x !== 'number'))) throw Error("Label_x value must be a string or number.")

        if(!data_x ) throw Error("data_x values are missing.")

        if(label_y && ((typeof label_y !== 'string') && (typeof label_y !== 'number'))) throw Error("Label_y value must be a string or number.")
        
        if(!data_y ) throw Error("data_y values are missing.")


        if(dataSet_x_y && (typeof dataSet_x_y !== 'object' && !Array.isArray(dataSet_x_y) )) throw Error("dataSet must be a object of type json or array of json object.")

        if(!this.isValidJson(dataSet_x_y)) throw Error("Each json object requries two values for the chart to be drawn.")

        //if(!this.isValidJsonArray(dataSet_x_y)) throw Error("In array Each json object requries two values for the chart to be drawn.")

        //if(Object.keys(dataSet_x_y).length < 2 || Object.keys(dataSet_x_y).length > 2) throw Error("two values are required in a json Object")


        this.ctx = ctx
        this.label_x = label_x
        this.label_y = label_y
        this.data_x = data_x
        this.data_y = data_y
        this.canvas = ctx.canvas
        

        
        
        this.setWidthHeight()
        this.drawInnerRect()
        this.drawLabels()
        this.drawDataY()


        //this.ctx.stroke()

    }

    isValidJson(dataSet_x_y) {
        if(!Array.isArray(dataSet_x_y) && Object.keys(dataSet_x_y).length < 2 || Object.keys(dataSet_x_y).length > 2) {
            return false
        }
        return true
    }

    isValidJsonArray(dataSet_x_y) {
        console.log(dataSet_x_y)
        if(Array.isArray(dataSet_x_y) && dataSet_x_y.length > 0) {
            console.log("if block")
            var isValid = dataSet_x_y.forEach(obj => {
                if(!this.isValidJson(obj)) {
                    console.log("false object")
                    return false
                }
                
            })
            
            console.log(isValid)
            if(!isValid) return false
            return true
        }

        return false
    }


    
    setWidthHeight() {
        console.log("setwidthHeight Method")
        console.log(this.canvas)
        this.canvas.width = window.innerWidth - 20
        this.canvas.height = (this.canvas.width / 2) 
    }

    drawInnerRect() {
        var y_percentage = (this.innerRectOffset_percentage * this.canvas.height) //.1 is 10 percent of height

        this.ctx.beginPath()
        this.ctx.rect(y_percentage, - y_percentage, this.canvas.width, this.canvas.height)

        this.ctx.fillText(0, y_percentage-5, (this.canvas.height - y_percentage + 10))
        this.ctx.stroke()

        this.x_corrdinate_0 = y_percentage
        this.y_corrdinate_0 = (this.canvas.height - y_percentage)
    }
    
    drawLabels() {

        this.ctx.beginPath()
        
        this.ctx.fillText(this.label_y, 0, this.canvas.height / 2)
        
        this.ctx.fillText(this.label_x, this.canvas.width / 2, this.canvas.height)

        this.ctx.stroke()
    }

    drawDataY() {
        var calculatedarr = this.getCalculatedDataY()
        console.log(calculatedarr)
        this.setDataYCoordinates(calculatedarr.length)

        if(this.y_roof_1_height) {
            this.ctx.fillText(calculatedarr[0], (.5 * this.x_corrdinate_0), this.y_roof_1_height)
            this.y_roof_1_val = calculatedarr[0]
        }

        if(this.y_roof_2_height) {
            console.log("roof 2///////")
            this.ctx.fillText(calculatedarr[1], (.5 * this.x_corrdinate_0), this.y_roof_2_height)
            this.y_roof_2_val = calculatedarr[1]
        }

        if(this.y_roof_3_height) {
            console.log("roof 3/////////")
            this.ctx.fillText(calculatedarr[2], (.5 * this.x_corrdinate_0), this.y_roof_3_height)
            this.y_roof_3_val = calculatedarr[2]
        }

    }

    getCalculatedDataY() {
        console.log(this.data_y)
        console.log(this.x_corrdinate_0, this.y_corrdinate_0)

        if(this.data_y.length <= 3) return this.data_y

        if(this.data_y.length > 3) {
            console.log("manipulated data because it is bigger than 3")
            var indexes = this.data_y.length
            console.log(indexes)
            console.log( Math.floor( (indexes / 2) ) )
            var middleIndex = Math.floor( (indexes / 2) )
            return [this.data_y[0], this.data_y[middleIndex], this.data_y[this.data_y.length-1]]
        }

        return [this.data_y]
    }

    
    setDataYCoordinates(num) {
        console.log(num)
        if(num === 1) {
            this.y_roof_1_height = this.y_corrdinate_0 / 2
        }

        if(num === 2) {
            this.y_roof_1_height = (this.y_corrdinate_0 / 2) + ((this.y_corrdinate_0 / 2) / 2)
            this.y_roof_2_height = (this.y_corrdinate_0 / 2) - ((this.y_corrdinate_0 / 2) / 2)

        }

        if(num === 3) {
            this.y_roof_1_height = (this.y_corrdinate_0 / 2) + ((this.y_corrdinate_0 / 2) / 2)
            this.y_roof_2_height = (this.y_corrdinate_0 / 2)
            this.y_roof_3_height = (this.y_corrdinate_0 / 2) - ((this.y_corrdinate_0 / 2) / 2)
        }
    }

    

}