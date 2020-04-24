
import {covid_19_data} from './chart_data_api.js'
import {Chart} from './chart_graph.js'





var chart = document.getElementById("chart")
var chart_new = document.getElementById("chart-new")

var ctx = chart.getContext('2d')
var ctx_new = chart_new.getContext('2d')



chart.width = window.innerWidth-20
chart.height = window.innerHeight / 2

var chart_width = chart.width
var chart_height = chart.height


console.log(chart_width)
console.log(chart_height)


try {
    
var data_x = [100, 200, 300]
var data_y = [1000, 4000, 10000, 12000]

var myChart = new Chart(ctx_new, "", "", [{day:4, inf:2}, {day:3, inf:2}, {day:2, inf:2}, {day:1, inf:2}])

var windowInnerWidth = window.innerWidth

window.addEventListener('resize', e => {
    console.log(e)
    console.log(windowInnerWidth)

    var current_innerWidth = e.target.innerWidth
    var diff = current_innerWidth - windowInnerWidth

    console.log(diff)

    if(diff > 10 || diff < -10) {
        console.log("updated Chart...")
        myChart = myChart.update()
        
        windowInnerWidth = e.target.innerWidth
    }
})

}
catch (err) {
    console.error(err)
}


var innerBorder = 40
ctx.beginPath()


ctx.save()

//ctx.translate(10, 10)
//ctx.translate(100, 20)
//ctx.rotate(1.5)

ctx.textAlign="center";
ctx.textBaseline="middle";
//ctx.translate(150,150);
//ctx.translate(10, chart_height / 2)
//ctx.rotate(Math.PI/2);
ctx.translate(10, chart_height / 2)
ctx.rotate(Math.PI*1.5)
ctx.fillText("Hello World!",0, 0)

ctx.restore()

//ctx.fillText("label", (chart_width / 2), chart_height / 2)
//ctx.rect(innerBorder, innerBorder , chart_width - (innerBorder * 2), chart_height - (innerBorder * 2))



ctx.stroke()

/*
ctx.moveTo(0, chart_height)
ctx.lineTo(chart_width, 0)
ctx.stroke()


var chart_width_inner = chart_width - (innerBorder * 2)
var chart_height_inner = chart_height - (innerBorder * 2)

console.log(chart_width_inner, chart_height_inner)




var lable_x_width = (chart_width - chart_width_inner) / 2
var lable_y_height = (chart_height - chart_height_inner) / 2



console.log(lable_x_width, lable_y_height)


ctx.moveTo(lable_x_width, (chart_height - lable_y_height) - (chart_height_inner / 5) )
ctx.lineTo(0, (chart_height - lable_y_height) - (chart_height_inner / 5) )


var prev_y_coordinates = (chart_height - lable_y_height) - (chart_height_inner / 5)


ctx.moveTo(lable_x_width, prev_y_coordinates - (chart_height_inner / 4 ))
ctx.lineTo(0, prev_y_coordinates - (chart_height_inner / 4 ) )

var prev_y_coordinates = prev_y_coordinates - (chart_height_inner / 4 )


ctx.moveTo(lable_x_width, prev_y_coordinates - (chart_height_inner / 3 ))
ctx.lineTo(0, prev_y_coordinates - (chart_height_inner / 3 ) )



ctx.stroke()



/*
for(var y=1; y<=9; y++) {
    
    ctx.moveTo(0, y*20)
    ctx.lineTo(20, y*20)
    ctx.stroke()
}


for(var x=0; x<5; x++) {
    ctx.beginPath()
    ctx.moveTo(x*20, 0)
    ctx.lineTo(x*20, 20)
    ctx.stroke()
}*/

/*
ctx.beginPath()

ctx.stroke()





*/





/*

/*
ctx.beginPath()
ctx.moveTo(0, 20)
ctx.lineTo(20, 20)
ctx.stroke()
*/
/*
ctx.beginPath()
/*
ctx.moveTo(0, 180)
ctx.lineTo(20, 180)

ctx.moveTo(0, 160)
ctx.lineTo(20, 160)


var increment = 20

for(var y=1; y<=10; y++) {
    ctx.moveTo(0, 200 - increment)
    ctx.lineTo(200, 200 - increment)
    ctx.fillText(y*2, 2, 200 - increment-2)


    ctx.moveTo(increment, 200)
    ctx.lineTo(increment, 0)
    ctx.fillText(y, increment+2, 198)

    increment += 20

}




ctx.moveTo(20, 180)
ctx.lineTo(40, 160)


ctx.moveTo(40, 160)
ctx.lineTo(60, 120)

ctx.moveTo(60, 120)
ctx.lineTo(80, 140)


ctx.moveTo(80, 140)
ctx.lineTo(100, 40)


ctx.moveTo(100, 40)
ctx.lineTo(120, 40)

ctx.moveTo(120, 40)
ctx.lineTo(140, 180)

ctx.moveTo(140, 180)
ctx.lineTo(160, 160)


ctx.moveTo(160, 160)
ctx.lineTo(180, 140)

/*
ctx.moveTo(20, 200)
ctx.lineTo(20, 0)

ctx.moveTo(40, 200)
ctx.lineTo(40, 0)


ctx.stroke()

*/