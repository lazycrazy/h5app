<template>
    <div id="line"></div>
</template>
<script>
import * as d3 from "d3";
//d3方式
export default {
    name: 'vue-line-chart', //名称
    data() { //数据
        return {
            data: [
                [{
                    x: 0,
                    y: 5
                }, {
                    x: 1,
                    y: 9
                }, {
                    x: 2,
                    y: 7
                }, {
                    x: 3,
                    y: 5
                }, {
                    x: 4,
                    y: 3
                }, {
                    x: 6,
                    y: 4
                }, {
                    x: 7,
                    y: 2
                }, {
                    x: 8,
                    y: 3
                }, {
                    x: 9,
                    y: 2
                }]
            ]
        };
    },
    mounted() {
        this.$nextTick(() => this.render(this.data)); //渲染图表
    },
    props: {
        width: 500,
        height: 500,
        margin: 50
    },
    methods: {



        render(data) { //渲染总函数
            let {
                x,
                y,
                width,
                height,
                margin
            } = getScales(); //导入参数
            let svg = createSvg(); //导入svg
            createPath(svg, x, y, data); //画线
            renderXAxis(svg); //渲染x坐标轴
            renderYAxis(svg); //渲染y坐标轴
            function getScales() { //定义x坐标轴和y坐标轴的尺度
                console.log(d3, d3.scale, 111)
                let width = 500,
                    height = 500,
                    margin = 50,
                    x = d3.scaleLinear() //定义x尺度
                    .domain([0, 10])
                    .range([margin, width - margin]),
                    y = d3.scaleLinear() //定义y尺度
                    .domain([0, 10])
                    .range([height - margin, margin]);
                return {
                    x,
                    y,
                    width,
                    height,
                    margin
                }
            }



            function createSvg() { //创建一个画布,并设置大小
                let svg = d3.select("#line").append("svg").attr("class", "axis")
                    .attr("height", 500)
                    .attr("width", 500);
                return svg
            }



            function createPath(svg, x, y, data) { //生成曲线
                let line = d3.line()
                    .x(function(d) {
                        return x(d.x);
                    })
                    .y(function(d) {
                        return y(d.y);
                    });


                svg.selectAll("path") //创建svg:path元素
                    .data(data)
                    .enter()
                    .append("path")
                    .attr("class", "line")
                    .attr("d", function(d) {
                        return line(d);
                    });
            }


            function renderXAxis(svg) { //渲染x坐标
                console.log(d3, d3.scale, 222)
                let scale = d3.scaleLinear() //x轴尺度
                    .domain([0, 10])
                    .range([0, quadrantWidth()]);

                let xAxis = d3.axisBottom() //创建x轴
                    .scale(scale) //设置x轴尺度  
                     ; //设置x轴位置

                svg.append("g") // 移动x轴的位置，保证从原点开始
                    .attr("class", "x-axis")
                    .attr("transform", function() {
                        return "translate(" + xStart() + "," + yStart() + ")";
                    })
                    .call(xAxis);

                d3.selectAll("g.x-axis g.tick") // 设置刻度线和网格线
                    .append("line") // <-C
                    .classed("grid-line", true)
                    .attr("x1", 0) // <-D
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", -(quadrantWidth())); // <-E
            }

            function renderYAxis(svg) { //渲染y坐标
                console.log(d3.scale, 333)
                let scale = d3.scaleLinear() //y轴尺度
                    .domain([10, 0])
                    .range([0, quadrantHeight()]);

                let yAxis = d3.axisLeft() //创建y轴
                    .scale(scale) //设置y轴尺度 
                     ; //设置y轴位置  

                svg.append("g") //移动y轴的位置，保证从原点开始
                    .attr("class", "y-axis")
                    .attr("transform", function() {
                        return "translate(" + xStart() + "," + yEnd() + ")";
                    })
                    .call(yAxis);
                d3.selectAll("g.y-axis g.tick") // 设置刻度线和网格线
                    .append("line")
                    .classed("grid-line", true)
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", quadrantHeight()) // <-F
                    .attr("y2", 0);
            }

            //工具类函数
            function xStart() {
                return margin;
            }

            function yStart() {
                return height - margin;
            }

            function xEnd() {
                return width - margin;
            }

            function yEnd() {
                return margin;
            }

            function quadrantWidth() {
                return width - 2 * margin;
            }

            function quadrantHeight() {
                return height - 2 * margin;
            }
        },
    }
}
</script>
<style>
</style>
