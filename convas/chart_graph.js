



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

        //if(!this.isValidJson(dataSet_x_y)) throw Error("Each json object requries two values for the chart to be drawn.")

        //if(!this.isValidJsonArray(dataSet_x_y)) throw Error("In array Each json object requries two values for the chart to be drawn.")

        //if(Object.keys(dataSet_x_y).length < 2 || Object.keys(dataSet_x_y).length > 2) throw Error("two values are required in a json Object")

        console.log(dataSet_x_y)

        

        var x_name = Object.keys(dataSet_x_y[0])[0]
        var y_name = Object.keys(dataSet_x_y[0])[1]
        var x_arr = []
        var y_arr = []
    
        dataSet_x_y.forEach(data => {
            x_arr.push(data[x_name])
            y_arr.push(data[y_name])
        })


        this.ctx = ctx
        this.label_x = (label_x) ? (label_x) : (x_name)
        this.label_y = (label_y) ? (label_y) : (y_name)
        //this.data_x = data_x
        //this.data_y = data_y

        this.data_x = x_arr
        this.data_y = y_arr
        this.canvas = ctx.canvas
        

        
        
        this.setWidthHeight()
        this.drawInnerRect()
        this.drawLabels()
        this.drawDataY()
        this.drawDataX()


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

        this.canvas.width = ((window.innerWidth) > 300) ?  (window.innerWidth - 20) : (300) 
        this.canvas.height = (this.canvas.width / 2) 
    }

    drawInnerRect() {
        var y_percentage = ( 50) //.1 is 10 percent of height

        this.ctx.beginPath()
        this.ctx.rect(y_percentage, - y_percentage, this.canvas.width, this.canvas.height)

        this.ctx.fillText(0, y_percentage-5, (this.canvas.height - y_percentage + 10))
        this.ctx.stroke()

        this.x_corrdinate_0 = y_percentage
        this.y_corrdinate_0 = (this.canvas.height - y_percentage)
    }
    
    drawLabels() {
        
        
        this.ctx.beginPath()
        
        //
        
        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"
        this.ctx.translate(10, this.canvas.height / 2)
        this.ctx.rotate(Math.PI*1.5)
        this.ctx.fillText(this.label_y ,0, 0)
        
        this.ctx.restore()
        //this.ctx.fillText(this.label_y, 0, this.canvas.height / 2)
        
        
        //this.ctx.moveTo(0, this.canvas.height / 2)

        //this.ctx.translate(0, this.canvas.height / 2)
        
        this.ctx.fillText(this.label_x, this.canvas.width / 2, this.canvas.height - 10)

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




    //drawing x values------------------------
    drawDataX() {
        var calculatedarr = this.getCalculatedDataX()
        console.log(calculatedarr)
        this.setDataXCoordinates(calculatedarr.length)



        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"

        //For Wall 1--------------------------------------
        this.ctx.fillText(calculatedarr[0], (this.x_wall_1_width), this.y_corrdinate_0)
        this.x_wall_1_val = calculatedarr[0]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[1], (this.x_wall_2_width), this.y_corrdinate_0)
        this.x_wall_2_val = calculatedarr[1]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[2], (this.x_wall_3_width), this.y_corrdinate_0)
        this.x_wall_3_val = calculatedarr[2]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[3], (this.x_wall_4_width), this.y_corrdinate_0)
        this.x_wall_4_val = calculatedarr[3]
        //-------------------------------


    }
    getCalculatedDataX() {

        if(this.data_y.length <= 4) return this.data_y

        if(this.data_y.length > 4) {
            console.log("more")
            var index_diff = this.data_y.length / 4
            console.log(index_diff)
            
            if(index_diff < 1.75) {
                return [this.data_y[0], this.data_y[1], this.data_y[this.data_y.length-2], this.data_y[this.data_y.length-1]]
            }

            if(index_diff < 2) {
                return [this.data_y[0], this.data_y[2], this.data_y[this.data_y.length-3], this.data_y[this.data_y.length-1]]
            }

            return [this.data_y[0], this.data_y[index_diff], this.data_y[(this.data_y.length-1) - (index_diff)], this.data_y[this.data_y.length-1]]

        }
    }

    setDataXCoordinates(num) {
        console.log(num)

        console.log(this.canvas.width)
        console.log(this.x_corrdinate_0)

        var walls_diff = (this.canvas.width - this.x_corrdinate_0) / 4
        console.log(walls_diff)
        if(num === 4) {
            this.x_wall_1_width = this.x_corrdinate_0 + walls_diff
            console.log(this.x_wall_1_width)
            this.x_wall_2_width = this.x_corrdinate_0 + (walls_diff * 2)
            this.x_wall_3_width = this.x_corrdinate_0 + (walls_diff * 3)
            this.x_wall_4_width = this.x_corrdinate_0 + (walls_diff * 4)
        }
    }
    //------------------------------------------
    

}