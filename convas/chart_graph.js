



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
        var y_percentage = (50) //.1 is 10 percent of height

        console.log(this.canvas.width)
        console.log(this.canvas.height)

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

        this.ctx.beginPath()

        /*if(this.data_x[0] === this.x_wall_1_val && this.data_y[0] === this.y_roof_1_val) {
            console.log("dara")
            this.ctx.moveTo(this.x_corrdinate_0, this.y_corrdinate_0)
            this.ctx.lineTo(this.x_wall_1_width  , this.y_roof_1_height )
            this.ctx.stroke()
        }*/

        console.log("drawing.....................///")


        this.setCurrentWallToNext()
        this.setCurrentRoofToNext()

        this.data_x.forEach((x_val, index) => {

            //compute line--------------------------------------
            var x_val = this.data_x[index]
            var y_val = this.data_y[index]

            console.log(x_val)

            var computed_width = this.getComputedWidth(x_val)
            var computed_height = this.getComputedHeight(y_val)
            
            console.log(computed_width, computed_height)
            
            this.ctx.fillText("O", computed_width, computed_height)
            this.ctx.moveTo(this.x_corrdinate_0, computed_height)
            this.ctx.lineTo(this.ctx.canvas.width, computed_height)
            this.ctx.stroke()
            //------------------------------------------------------

        })


        //this.setCurrentWallToNext()
        //console.log(this.current_wall_val)

 /*       var x_val = this.data_x[0]
        var y_val = this.data_y[0]

        console.log(x_val)

        var computed_width = this.getComputedWidth(x_val)
        var computed_height = this.getComputedHeight(y_val)
        
        console.log(computed_width, computed_height)
          
        this.ctx.fillText("O", computed_width, computed_height)






        var x_val = this.data_x[1]
        var y_val = this.data_y[1]

        console.log(x_val)

        var computed_width = this.getComputedWidth(x_val)
        var computed_height = this.getComputedHeight(y_val)
        
        console.log(computed_width, computed_height)
          
        this.ctx.fillText("o", computed_width, computed_height)






        //compute line--------------------------------------
/*        var x_val = this.data_x[2]
        var y_val = this.data_y[2]

        console.log(x_val)

        var computed_width = this.getComputedWidth(x_val)
        var computed_height = this.getComputedHeight(y_val)
        
        console.log(computed_width, computed_height)
          
        this.ctx.fillText("O", computed_width, computed_height)
        this.ctx.moveTo(this.x_corrdinate_0, computed_height)
        this.ctx.lineTo(this.ctx.canvas.width, computed_height)
        this.ctx.stroke()
        //------------------------------------------------------


        //compute line--------------------------------------
/*        var x_val = this.data_x[3]
        var y_val = this.data_y[3]

        console.log(x_val)

        var computed_width = this.getComputedWidth(x_val)
        var computed_height = this.getComputedHeight(y_val)
        
        console.log(computed_width, computed_height)
          
        this.ctx.fillText("O", computed_width, computed_height)
        this.ctx.moveTo(this.x_corrdinate_0, computed_height)
        this.ctx.lineTo(this.ctx.canvas.width, computed_height)
        this.ctx.stroke() */
        //------------------------------------------------------


        


        
        /*
        
        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"
        this.ctx.fillText("2", computed_width, this.y_corrdinate_0)
        this.ctx.restore()
        this.ctx.stroke()



        
        console.log(computed_height)



        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"

        this.ctx.fillText("500", computed_width, computed_height)

        this.ctx.restore()
        this.ctx.stroke()

        */



        /*this.data_x.forEach((x_val, index) => {
            console.log(x_val, index)

            if(x_val <= this.current_wall_val) {
                var computed_width = this.getComputedWidth(x_val)
                //var computed_height = this.getComputedHeight(y_val)


            }




            if(x_val > this.current_wall_val) {
                this.setCurrentWallToNext()
            }
        

            
        })*/

    }
    //---------------------------------------------------

    //calculating height and width for x hidden values----------------------
    getComputedWidth (x_val) {

        console.log("---------------------------generating width------------------------------------------")

        if(x_val === this.current_wall_val) return this.current_wall_width


        var maxIntervals = 8
        var currIntervals = 1
        var working_origin = null

        while(!working_origin) {

            if(x_val < this.current_wall_val) {
                console.log("working origin. x")
                working_origin = true
                return this.calculateWidth(x_val)
            }

            else {
                console.log("else block")
                this.setCurrentWallToNext()
            }



            if(currIntervals >= maxIntervals) break
            currIntervals++

        }



    }


    calculateWidth(x_val) {
        var diff_walls_value = this.current_wall_val - this.getPrevWallVal()
        var block_width = this.current_wall_width - this.getPrevWallWidth()
        var diff_x_val = x_val - this.getPrevWallVal()
        var x_percentage = diff_x_val / diff_walls_value
        var x_width = x_percentage * block_width
        var computed_width = this.getPrevWallWidth() + x_width
        console.log(computed_width)
        //console.warn("computed_width is", computed_width, "for value", x_val)

        /*
        console.table([
            "x_val = "+x_val,
            "diff_walls_value = "+diff_walls_value,
            "block_width = "+block_width,
            "diff_x_val = "+diff_x_val,
            "x_percentage = "+x_percentage,
            "x_width = "+x_width,
            "computed_width = "+computed_width,
            "this.getPrevWallWidth() = "+this.getPrevWallWidth(),
            "this.getPrevWallVal() = "+this.getPrevWallVal(),
            "this.current_wall_width = "+this.current_wall_width
        
        ])*/

        return computed_width
    }

    getComputedHeight (y_val) {
        console.log("<<<<<<<<<<<<<<<<<<<<<<generating height>>>>>>>>>>>>>>>>>")
        console.log(y_val)
        console.log(this.current_roof_height)

        if(y_val === this.current_roof_val) return this.current_roof_height


        var maxIntervals = 5
        var currIntervals = 1
        var working_origin = null

        while(!working_origin) {
            
            if(y_val > this.getLowerRoofValue() && y_val < this.current_roof_val) {
                working_origin = true
                console.log("working origin.")

                return this.calculateHeight(y_val)
  
                
          /*      var roof_diff = this.getLowerRoofHeight() - this.current_roof_height
                console.log(roof_diff)

                var val_diff = this.current_roof_val - this.getLowerRoofValue()

                console.log(val_diff)

                var y_percentage = y_val / val_diff

                console.log(y_percentage)

                var computed_height = this.getLowerRoofHeight() - (y_percentage * roof_diff) 
                console.log(computed_height)


                return computed_height */
                
                //console.log(this.y_corrdinate_0 - this.y_roof_1_height )

                //console.log( (.25 * roof_diff) )
                
                
                //var y_percentage = y_val / this.current_roof_val
                

                //var y_val_diff = y_percentage * roof_diff
                //console.log(y_val_diff)
                
                
            }
            else{
                console.log("non origin")

                if(y_val > this.current_roof_val) this.setCurrentRoofToNext()
                console.log(this.current_roof_val)
                
            }

            if(currIntervals >= maxIntervals) break
            currIntervals++

        }



    }

    calculateHeight(y_val) {
        var diff_roof_value = this.current_roof_val - this.getLowerRoofValue()
        var block_height = this.getLowerRoofHeight() - this.current_roof_height
        var diff_y_val = y_val - this.getLowerRoofValue()
        var y_percentage = diff_y_val / diff_roof_value
        var y_height = y_percentage * block_height
        var computed_height = this.getLowerRoofHeight() - y_height
        //console.log(computed_width)
        //console.warn("computed_width is", computed_width, "for value", x_val)

        console.table([
            "y_val = "+y_val,
            "diff_roof_value = "+diff_roof_value,
            "block_height = "+block_height,
            "diff_y_val = "+diff_y_val,
            "y_percentage = "+y_percentage,
            "y_height = "+y_height,
            "computed_height = "+computed_height,
            "this.getLowerRoofHeight() = "+this.getLowerRoofHeight(),
            "this.getLowerRoofValue() = "+this.getLowerRoofValue(),
            "this.current_roof_height = "+this.current_roof_height
        
        ])


        return computed_height
    }
    //----------------------------------------------------------------




    //setting  Next Wall---------------------
    setCurrentWallToNext() {
        if(this.current_wall_width === this.x_wall_1_width) {
            this.current_wall_width = this.x_wall_2_width
            this.current_wall_val = this.x_wall_2_val
        }
        
        else if(this.current_wall_width === this.x_wall_2_width) {
            this.current_wall_width = this.x_wall_3_width
            this.current_wall_val = this.x_wall_3_val
        }

        else if(this.current_wall_width === this.x_wall_3_width) {
            this.current_wall_width = this.x_wall_4_width
            this.current_wall_val = this.x_wall_4_val
        }

        else if(!this.current_wall_width) {
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

        else if(this.current_roof_height === this.y_roof_2_height) {
            this.current_roof_height = this.y_roof_3_height
            this.current_roof_val = this.y_roof_3_val
        }

        else if(!this.current_roof_height) {
            this.current_roof_height = this.y_roof_1_height
            this.current_roof_val = this.y_roof_1_val
        }
    }

    setCurrentRoofToPrev() {
        if(this.current_roof_height === this.y_roof_3_height) {
            this.current_roof_height = this.y_roof_2_height
            this.current_roof_val = this.y_roof_2_val
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            this.current_roof_height = this.y_roof_1_height
            this.current_roof_val = this.y_roof_1_val
        }

        else if(!this.current_roof_height) {
            this.current_roof_height = this.y_roof_3_height
            this.current_roof_val = this.y_roof_3_val
        }
    }



    getPrevWallWidth() {
        if(this.current_wall_width === this.x_wall_1_width) {
            return this.x_corrdinate_0
        }
        
        else if(this.current_wall_width === this.x_wall_2_width) {
            return this.x_wall_1_width
        }

        else if(this.current_wall_width === this.x_wall_3_width) {
            return this.x_wall_2_width
        }

        else if(this.current_wall_width === this.x_wall_4_width) {
            return this.x_wall_3_width
        }

        else if(!this.current_wall_width) {
            return this.x_corrdinate_0
        }
    }



    getLowerRoofHeight() {
        if(this.current_roof_height === this.y_roof_3_height) {
            return this.y_roof_2_height
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            return this.y_roof_1_height
        }

        else if(this.current_roof_height === this.y_roof_1_height) {
            return this.y_corrdinate_0
        }

    }

    getHigherRoofHeight() {
        if(this.current_roof_height === this.y_roof_3_height) {
            return this.y_roof_3_height
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            return this.y_roof_3_height
        }

        else if(this.current_roof_height === this.y_roof_1_height) {
            return this.y_roof_2_height
        }
    }

    getLowerRoofValue() {
        if(this.current_roof_height === this.y_roof_3_height) {
            return this.y_roof_2_val
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            return this.y_roof_1_val
        }

        else if(this.current_roof_height === this.y_roof_1_height) {
            return 0
        }

    }

    getHigherRoofValue() {

        if(this.current_roof_height === this.y_roof_3_height) {
            return this.y_roof_3_val
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            return this.y_roof_3_val
        }

        else if(this.current_roof_height === this.y_roof_1_height) {
            return this.y_roof_2_val
        }
    }


    getPrevWallVal() {
        if(this.current_wall_width === this.x_wall_1_width) {
            return 0
        }
        
        else if(this.current_wall_width === this.x_wall_2_width) {
            return this.x_wall_1_val
        }

        else if(this.current_wall_width === this.x_wall_3_width) {
            return this.x_wall_2_val
        }

        else if(this.current_wall_width === this.x_wall_4_width) {
            return this.x_wall_3_val
        }

    }

    //-----------------------------------------


    
    

}






















/*

getComputedWidth (x_val) {
        console.log(this.x_corrdinate_0, this.current_wall_width)
        var origin_x_width = this.current_wall_width - this.x_corrdinate_0
        console.log(origin_x_width)
        //console.log( (this.current_wall_val / x_val) )

        //var value_percentage_right_part = parseInt((this.current_wall_val / x_val).toString().split('.')[1])
        //.split('.')[1]
        
        var value_percentage_right_part = parseInt((this.current_wall_val / x_val).toString().split('.')[1])
        var x_val_percentage = parseFloat( "0." + value_percentage_right_part.toString() )

        //console.log(value_percentage_right_part)
        //console.log(x_val_percentage)
        
        var x_val_diff = x_val_percentage * origin_x_width
        
        console.log(x_val_diff)

        var computedWidth = this.current_wall_width - x_val_diff
        //console.log(this.current_wall_width, computedWidth)

        return computedWidth

    }




    drawLine() {

        this.ctx.beginPath()

        /*if(this.data_x[0] === this.x_wall_1_val && this.data_y[0] === this.y_roof_1_val) {
            console.log("dara")
            this.ctx.moveTo(this.x_corrdinate_0, this.y_corrdinate_0)
            this.ctx.lineTo(this.x_wall_1_width  , this.y_roof_1_height )
            this.ctx.stroke()
        }*/

     //   console.log("drawing.....................///")


        //var current_wall_val = this.x_wall_2_val
/*
        this.setCurrentWallToNext()
        this.setCurrentRoofToNext()


        this.setCurrentWallToNext()
        console.log(this.current_wall_val)

        var x_val = this.data_x[1]
        var y_val = this.data_y[1]

        console.log(x_val)

        var computed_width = this.getComputedWidth(x_val)
        
        
        console.log(computed_width)
        
        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"
        this.ctx.fillText("2", computed_width, this.y_corrdinate_0)
        this.ctx.restore()
        this.ctx.stroke()



        var computed_height = this.getComputedHeight(y_val)
        console.log(computed_height)



        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"

        this.ctx.fillText("500", computed_width, computed_height)

        this.ctx.restore()
        this.ctx.stroke()





        /*this.data_x.forEach((x_val, index) => {
            console.log(x_val, index)

            if(x_val <= this.current_wall_val) {
                var computed_width = this.getComputedWidth(x_val)
                //var computed_height = this.getComputedHeight(y_val)


            }




            if(x_val > this.current_wall_val) {
                this.setCurrentWallToNext()
            }
        

            
        })
        
        
        
        
        
        
        //calculating height and width for x hidden values----------------------
    getComputedWidth (x_val) {

        if(x_val === this.current_wall_val) return this.current_wall_width

        
        
        var walls_diff = this.current_wall_width - this.getPrevWallWidth()
        //console.log(walls_diff)

        var value_percentage_right_part = parseInt((this.current_wall_val / x_val).toString().split('.')[1])
        var x_val_percentage = parseFloat( "0." + value_percentage_right_part.toString() )

        //console.log(x_val_percentage)

        var x_val_diff = x_val_percentage * walls_diff

        //console.log(x_val_diff)

        //console.log(this.current_wall_width, this.current_wall_width - x_val_diff)

        return (this.current_wall_width - x_val_diff)



    }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        */