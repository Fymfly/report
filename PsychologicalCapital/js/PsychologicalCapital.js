
var myChart = echarts.init(document.getElementById('chart'));
// 指定图表的配置项和数据
let arr = [50, 72, 13, 10, 20, 35, 42, 81, 50, 77, 75, 12, 25, 10, 75, 14]

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['进取性', '支配性', '亲和性', '开放性', '乐观性', '变通性', '内省性', '独立性', '坚韧性', '自律性', '悦纳性', '稳定性', '自信心', '尽责性', '容人性', '利他性'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function (value) {
                    return value.split("").join("\n")
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            min: 0,
            max: 100,
            splitNumber: 10,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: arr,
            itemStyle: {
                normal: {
                    // 柱状图右边显示数字
                    // label: {
                    //     show: true, //开启显示
                    //     position: 'top', //在上方显示
                    //     textStyle: { //数值样式
                    //         color: 'black',
                    //         fontSize: 14,
                    //     }
                    // },
                    color: function (params) {
                        var index_num = params.value;
                        for (var i = 0; i < arr.length; i++) {

                            //判断数据

                            if (index_num <= 100 && index_num >= 76) {
                                return '#1CC958'
                            } else if (index_num <= 75 && index_num >= 31) {
                                return '#4E63E9'
                            } else if (index_num <= 30 && index_num >= 0) {
                                return '#D84040'
                            }


                        }
                    }
                }
            }

        }
    ],
    tooltip: {
        trigger: 'item',
        show: false,
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);









// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart2'));
// 指定图表的配置项和数据
let arr2 = [51,35,71]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['亲和性','支配性','进取性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr2,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);






// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart3'));
// 指定图表的配置项和数据
let arr3 = [68,76,36,75]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['内省性','变通性','乐观性','开放性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr3,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);





// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart4'));
// 指定图表的配置项和数据
let arr4 = [41,73,41]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['自律性','坚韧性','独立性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr4,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);





// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart5'));
// 指定图表的配置项和数据
let arr5 = [65,46,30]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['自信心','稳定性','悦纳性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr5,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);





// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart6'));
// 指定图表的配置项和数据
let arr6 = [62]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['尽责性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr6,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);






// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart7'));
// 指定图表的配置项和数据
let arr7 = [8, 44]

option = {
tooltip: {
    axisPointer: {
        type: ''
    },
    // 取消鼠标方法效果
    trigger: 'item',
    show:false,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '5%',
    containLabel: true
},
xAxis: {
    type: 'value',
    // boundaryGap: [0, 0.01]
    min: 0,
    max: 100,
    // 把x轴平均分为10个点
    splitNumber: 10,
    splitLine: {     //网格线
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
},
yAxis: {
    type: 'category',
    data: ['利他性', '容人性'],
    // 隐藏刻度线
    axisTick: {
        show: false
    },
    axisLine:{
        lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
    },
    axisLabel:{color:'#000000'},   // x轴字体颜色
    
},
series: [
    {
        name: '2011年',
        type: 'bar',
        data: arr7,
        itemStyle: {
            normal: {
                // 柱状图右边显示数字
                label: {
                    show: true, //开启显示
                    position: 'right', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                },
                color: '#8A6C5C'
            }
        }
    }
]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);