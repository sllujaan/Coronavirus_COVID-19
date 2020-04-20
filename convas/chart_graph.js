



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

    current_roof_height
    current_roof_val


    x_wall_1_width
    x_wall_1_val
    x_wall_2_width
    x_wall_2_val
    x_wall_3_width
    x_wall_3_val
    x_wall_4_width
    x_wall_4_val

    current_wall_width
    current_wall_val



    
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

        //console.log(x_arr)
        this.data_x = x_arr
        this.data_y = y_arr
        this.canvas = ctx.canvas
        

        
        
        this.setWidthHeight()
        this.drawInnerRect()
        this.drawLabels()
        this.drawDataY()
        this.drawDataX()
        this.drawLine()

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
        this.ctx.font = 'bold 14px Arial'
        this.ctx.translate(10, this.canvas.height / 2)
        this.ctx.rotate(Math.PI*1.5)
        this.ctx.fillText(this.label_y ,0, 0)
        
        this.ctx.restore()
        //this.ctx.fillText(this.label_y, 0, this.canvas.height / 2)
        
        
        //this.ctx.moveTo(0, this.canvas.height / 2)

        //this.ctx.translate(0, this.canvas.height / 2)
        
        this.ctx.save()
        this.ctx.font = 'bold 14px Arial'
        this.ctx.fillText(this.label_x, this.canvas.width / 2, this.canvas.height - 10)
        this.ctx.restore()

        this.ctx.stroke()
    }

    drawDataY() {
        var calculatedarr = this.getCalculatedDataY()
        console.log(calculatedarr)
        this.setDataYCoordinates(calculatedarr.length)

        this.ctx.save()
        this.ctx.textAlign="right"
        this.ctx.textBaseline="middle"

        if(this.y_roof_1_height) {
            this.ctx.fillText(calculatedarr[0], (this.x_corrdinate_0 - 4), this.y_roof_1_height)
            this.y_roof_1_val = calculatedarr[0]
        }

        if(this.y_roof_2_height) {
            console.log("roof 2///////")
            this.ctx.fillText(calculatedarr[1], (this.x_corrdinate_0 - 4), this.y_roof_2_height)
            this.y_roof_2_val = calculatedarr[1]
        }

        if(this.y_roof_3_height) {
            console.log("roof 3/////////")
            this.ctx.fillText(calculatedarr[2], (this.x_corrdinate_0 - 4), this.y_roof_3_height)
            this.y_roof_3_val = calculatedarr[2]
        }


        this.ctx.restore()
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
        this.ctx.fillText(calculatedarr[0], (this.x_wall_1_width), this.y_corrdinate_0 + 10)
        this.x_wall_1_val = calculatedarr[0]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[1], (this.x_wall_2_width), this.y_corrdinate_0 + 10)
        this.x_wall_2_val = calculatedarr[1]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[2], (this.x_wall_3_width), this.y_corrdinate_0 + 10)
        this.x_wall_3_val = calculatedarr[2]
        //-------------------------------

        //For Wall 2--------------------------------------
        this.ctx.fillText(calculatedarr[3], (this.x_wall_4_width), this.y_corrdinate_0 + 10)
        this.x_wall_4_val = calculatedarr[3]
        //-------------------------------

        this.ctx.restore()

    }
    getCalculatedDataX() {

        if(this.data_y.length <= 4) return this.data_y

        if(this.data_y.length > 4) {
            console.log("more")
            var index_diff = this.data_y.length / 4
            console.log(index_diff)
            
            if(index_diff < 1.75) {
                return [this.data_x[0], this.data_x[1], this.data_x[this.data_x.length-2], this.data_x[this.data_x.length-1]]
            }

            if(index_diff < 2) {
                return [this.data_x[0], this.data_x[2], this.data_x[this.data_x.length-3], this.data_x[this.data_x.length-1]]
            }

            return [this.data_x[0], this.data_x[index_diff], this.data_x[(this.data_x.length-1) - (index_diff)], this.data_x[this.data_x.length-1]]

        }
    }

    setDataXCoordinates(num) {
        console.log(num)

        console.log(this.canvas.width)
        console.log(this.x_corrdinate_0)

        var walls_diff = (this.canvas.width - this.x_corrdinate_0) / 4
        console.log(walls_diff)
        if(num === 4) {
            this.x_wall_1_width = this.x_corrdinate_0 + walls_diff - 20
            console.log(this.x_wall_1_width)
            this.x_wall_2_width = this.x_corrdinate_0 + (walls_diff * 2) - 20
            this.x_wall_3_width = this.x_corrdinate_0 + (walls_diff * 3) - 20
            this.x_wall_4_width = this.x_corrdinate_0 + (walls_diff * 4) - 20
        }
    }
    //------------------------------------------


    //Drawing chart line-----------------------------------------
    drawLine() {
        console.log(this.data_x)
        console.log(this.data_y)

        this.ctx.beginPath()

        /*if(this.data_x[0] === this.x_wall_1_val && this.data_y[0] === this.y_roof_1_val) {
            console.log("dara")
            this.ctx.moveTo(this.x_corrdinate_0, this.y_corrdinate_0)
            this.ctx.lineTo(this.x_wall_1_width  , this.y_roof_1_height )
            this.ctx.stroke()
        }*/

        console.log("drawing.....................///")


        //var current_wall_val = this.x_wall_2_val

        this.setCurrentWallToNext()
        this.setCurrentRoofToNext()
        console.log(this.current_wall_val)

        this.data_x.forEach((x_val, index) => {
            console.log(x_val, index)

            if(x_val <= this.current_wall_val) {
                var computed_width = this.getComputedWidth(x_val)
                //var computed_height = this.getComputedHeight(y_val)


            }




            if(x_val > this.current_wall_val) {
                this.setCurrentWallToNext()
            }
        

            
        })

    }
    //---------------------------------------------------

    //calculating height and widht for x hidden values----------------------
    getComputedWidth (x_val) {
        console.log(this.x_corrdinate_0, this.current_wall_width)
        var origin_x_width = this.current_wall_width - this.x_corrdinate_0
        console.log(origin_x_width)
        console.log( (x_val / this.current_wall_val) )
    }

    getComputedHeight (y_val) {

    }
    //----------------------------------------------------------------




    //setting  Next Wall---------------------
    setCurrentWallToNext() {
        if(this.current_wall_width === this.x_wall_1_width) {
            this.current_wall_width = this.x_wall_2_width
            this.current_wall_val = this.x_wall_2_val
        }

        if(this.current_wall_width === this.x_wall_2_width) {
            this.current_wall_width = this.x_wall_3_width
            this.current_wall_val = this.x_wall_3_val
        }

        if(this.current_wall_width === this.x_wall_3_width) {
            this.current_wall_width = this.x_wall_4_width
            this.current_wall_val = this.x_wall_4_val
        }

        if(!this.current_wall_width) {
            this.current_wall_width = this.x_wall_1_width
            this.current_wall_val = this.x_wall_1_val
        }

    }
    //-------------------------------------

    //setting Next roof or prev-------------------------------------
    setCurrentRoofToNext() {
        if(this.current_roof_height === this.y_roof_1_height) {
            this.current_roof_height = this.y_roof_2_height
            this.current_roof_val = this.y_roof_2_val
        }

        if(this.current_roof_height === this.y_roof_2_height) {
            this.current_roof_height = this.y_roof_3_height
            this.current_roof_val = this.y_roof_3_val
        }

        if(!this.current_roof_height) {
            this.current_roof_height = this.y_roof_1_height
            this.current_roof_val = this.y_roof_1_val
        }
    }

    setCurrentRoofToPrev() {
        if(this.current_roof_height === this.y_roof_3_height) {
            this.current_roof_height = this.y_roof_2_height
            this.current_roof_val = this.y_roof_2_val
        }

        if(this.current_roof_height === this.y_roof_2_height) {
            this.current_roof_height = this.y_roof_1_height
            this.current_roof_val = this.y_roof_1_val
        }

        if(!this.current_roof_height) {
            this.current_roof_height = this.y_roof_3_height
            this.current_roof_val = this.y_roof_3_val
        }
    }

    //-----------------------------------------


    
    

}