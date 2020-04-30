
import { validateData, property1Name, property2Name} from './validation/data_validation.js'
import { getCalculatedDataSet_x_y, calculatedData_X, calculatedData_Y, data_x_verified, data_y_verified, getPrevDate } from "./calculations/data-calculation.js";

export class Chart  {   
    ctx
    label_x
    label_y
    data_x
    data_y
    canvas
    dataSet_x_y
    originalDataSet_x_y
    
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

    x_drawLineCoordinates_prev
    y_drawLineCoordinates_prev

    windowInnerWidth

    isDateData_x



    
    constructor(ctx, label_x, label_y, dataSet_x_y, isDateData_x) {
        console.log(dataSet_x_y)
        console.log("length = ", dataSet_x_y.length)
        console.log(dataSet_x_y[dataSet_x_y.length-1])

        validateData(ctx, label_x, label_y, dataSet_x_y)
        calculatedData_X()
        calculatedData_Y()

        var x_name = Object.keys(dataSet_x_y[0])[0]
        var y_name = Object.keys(dataSet_x_y[0])[1]

        this.ctx = ctx
        this.label_x = (label_x) ? (label_x) : (x_name)
        this.label_y = (label_y) ? (label_y) : (y_name)

        console.log(data_x_verified)
        console.log(data_y_verified)
        
        this.data_x = data_x_verified
        this.data_y = data_y_verified
        this.canvas = ctx.canvas

        console.log(dataSet_x_y)
        this.dataSet_x_y = getCalculatedDataSet_x_y(dataSet_x_y)
        console.log(this.dataSet_x_y)
        
        this.setWidthHeight()
        this.drawInnerRect()
        this.drawLabels()
        this.drawDataY()
        this.drawDataX()
        this.drawLine()

        if(isDateData_x) this.isDateData_x = true

        //this.ctx.stroke()
    }

    

    

    setWidthHeight() {
        this.canvas.width = this.canvas.offsetWidth
        this.canvas.height = (this.canvas.width / 2)
        this.windowInnerWidth = window.innerWidth
    }

    drawInnerRect() {
        var y_percentage = (50)
        //console.log(this.canvas.width)
        this.ctx.beginPath()
        this.ctx.rect(y_percentage, - y_percentage, this.canvas.width, this.canvas.height)
        this.ctx.fillText(0, y_percentage-5, (this.canvas.height - y_percentage + 10))
        this.ctx.stroke()

        this.x_corrdinate_0 = y_percentage
        this.y_corrdinate_0 = (this.canvas.height - y_percentage)
    }
    
    drawLabels() {
        this.ctx.beginPath()
        
        this.ctx.save()
        this.ctx.textAlign="center"
        this.ctx.textBaseline="middle"
        this.ctx.font = 'bold 14px Arial'
        this.ctx.translate(10, this.canvas.height / 2)
        this.ctx.rotate(Math.PI*1.5)
        this.ctx.fillText(this.label_y ,0, 0)
        this.ctx.restore()

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
            this.ctx.fillText(Math.floor(calculatedarr[0]), (this.x_corrdinate_0 - 4), this.y_roof_1_height)
            this.y_roof_1_val = calculatedarr[0]
        }

        if(this.y_roof_2_height) {
            this.ctx.fillText(Math.floor(calculatedarr[1]), (this.x_corrdinate_0 - 4), this.y_roof_2_height)
            this.y_roof_2_val = calculatedarr[1]
        }

        if(this.y_roof_3_height) {
            this.ctx.fillText(Math.floor(calculatedarr[2]), (this.x_corrdinate_0 - 4), this.y_roof_3_height)
            this.y_roof_3_val = calculatedarr[2]
        }
        
        this.ctx.restore()
    }

    getCalculatedDataY() {
        console.log(this.data_y)
        if(this.data_y.length <= 3) return this.data_y

        if(this.data_y.length > 3) {
            var indexes = this.data_y.length
            var middleIndex = Math.floor( (indexes / 2) )
            return [this.data_y[0], this.data_y[middleIndex], this.data_y[this.data_y.length-1]]
        }
        return [this.data_y]
    }

    
    setDataYCoordinates(num) {
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
        if(this.data_x.length <= 4) return this.data_x

        if(this.data_x.length > 4) {
            var index_diff = this.data_x.length / 4
            console.log(index_diff)

            if(index_diff < 1.75) {
                return [this.data_x[0], this.data_x[1], this.data_x[this.data_x.length-2], this.data_x[this.data_x.length-1]]
            }

            if(index_diff < 2) {
                return [this.data_x[0], this.data_x[2], this.data_x[this.data_x.length-3], this.data_x[this.data_x.length-1]]
            }

            index_diff = Math.floor(index_diff)
            return [this.data_x[0], this.data_x[index_diff], this.data_x[(this.data_x.length-1) - (index_diff)], this.data_x[this.data_x.length-1]]
        }
    }

    setDataXCoordinates(num) {
        var walls_diff = (this.canvas.width - this.x_corrdinate_0) / 4
        if(num === 4) {
            this.x_wall_1_width = this.x_corrdinate_0 + walls_diff - 20
            this.x_wall_2_width = this.x_corrdinate_0 + (walls_diff * 2) - 20
            this.x_wall_3_width = this.x_corrdinate_0 + (walls_diff * 3) - 20
            this.x_wall_4_width = this.x_corrdinate_0 + (walls_diff * 4) - 20
        }
    }
    //------------------------------------------


    //Drawing chart line-----------------------------------------
    drawLine() {
        this.ctx.beginPath()
        this.setCurrentWallToNext()
        this.setCurrentRoofToNext()
        //console.warn(this.current_wall_width, this.current_wall_val)
        //console.warn(this.current_roof_height, this.current_roof_val)
        this.x_drawLineCoordinates_prev = this.x_corrdinate_0
        this.y_drawLineCoordinates_prev = this.y_corrdinate_0

        console.log(this.dataSet_x_y)

        this.dataSet_x_y.forEach((obj, index) => {
            //compute line--------------------------------------
            var x_val = obj[property1Name]
            var y_val = obj[property2Name]
            var computed_width = this.getComputedWidth(x_val)
            var computed_height = this.getComputedHeight(y_val)

            this.drawLineToCoordinates(computed_width, computed_height)
            //------------------------------------------------------
            //console.warn("line drawn succefully.", index+1)
            console.table([
                "line drawn succefully. = "+(index+1),
                "this.x_drawLineCoordinates_prev = "+this.x_drawLineCoordinates_prev,
                "+this.y_drawLineCoordinates_prev = "+this.y_drawLineCoordinates_prev,
                "computed_width = "+computed_width,
                "computed_height = "+computed_height,
                "this.x_corrdinate_0 = "+this.x_corrdinate_0,
                "this.y_corrdinate_0 = "+this.y_corrdinate_0

            ])
        })

    }
    //---------------------------------------------------

    //drwing lines from previous coordinates to current coordinates-----
    drawLineToCoordinates(computed_width, computed_height) {
        this.ctx.moveTo(this.x_drawLineCoordinates_prev, this.y_drawLineCoordinates_prev)
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "#4287f5"
        this.ctx.lineCap = 'round'
        this.ctx.lineTo(computed_width, computed_height)
        this.ctx.stroke()
        
        if(this.dataSet_x_y.length <= 15) { 
        
            var radius = 5
            this.ctx.save()
            this.ctx.moveTo(computed_width + radius, computed_height)
            this.ctx.arc(computed_width, computed_height, radius, 0, 2*Math.PI)
            this.ctx.strokeStyle = "#4287f5"
            this.ctx.fillStyle = "skyblue"
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.restore()
        }

        this.x_drawLineCoordinates_prev = computed_width
        this.y_drawLineCoordinates_prev = computed_height
    }
    //---------------------------------------------

    //calculating height and width for x hidden values----------------------
    getComputedWidth (x_val) {
        console.log("---------------------------generating width------------------------------------------")
        console.log(x_val, this.current_wall_val)
        if(x_val === this.current_wall_val) return this.current_wall_width

        var maxIntervals = 8
        var currIntervals = 1
        var working_origin = null

        while(!working_origin) {

            if(x_val <= this.current_wall_val) {
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
        console.warn(y_val)
        if(y_val === this.current_roof_val) return this.current_roof_height

        var maxIntervals = 5
        var currIntervals = 1
        var working_origin = null

        while(!working_origin) {
            
            if(y_val >= this.getLowerRoofValue() && y_val <= this.current_roof_val) {
                working_origin = true
                console.log("working origin.")
                return this.calculateHeight(y_val)                
            }
            else{
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
        /*
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
        */


        return computed_height
    }
    //----------------------------------------------------------------

    //updating function----------------------------------------------
    update() {
        console.log(this.dataSet_x_y)
        return new Chart(this.ctx, "", "", this.dataSet_x_y)
    }
    //---------------------------------------------------



    //setting  Next Wall---------------------
    setCurrentWallToNext() {
        if(!this.current_wall_width) {
            this.current_wall_width = this.x_wall_1_width
            this.current_wall_val = this.x_wall_1_val
        }

        else if(this.current_wall_width === this.x_wall_1_width) {
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

    }
    //-------------------------------------

    //setting Next roof or prev-------------------------------------
    setCurrentRoofToNext() {
        console.warn(this.current_roof_height)

        if(!this.current_roof_height) {
            this.current_roof_height = this.y_roof_1_height
            this.current_roof_val = this.y_roof_1_val
        }

        else if(this.current_roof_height === this.y_roof_1_height) {
            this.current_roof_height = this.y_roof_2_height
            this.current_roof_val = this.y_roof_2_val
        }

        else if(this.current_roof_height === this.y_roof_2_height) {
            this.current_roof_height = this.y_roof_3_height
            this.current_roof_val = this.y_roof_3_val
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
    */

















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
        
        
        
        
        
        
        
        
        setWidthHeight() {
        console.log("setwidthHeight Method")
        console.log(this.canvas)
        console.log(this.canvas.parentElement)

        this.canvas.width = ((window.innerWidth) > 300) ?  (window.innerWidth - 20) : (300) 
        this.canvas.height = (this.canvas.width / 2) 
    }
        
        
        
        
        
        
        
        
        
        
        
        */