 // 基于准备好的dom，初始化echarts实例
 var myChart = echarts.init(document.getElementById('chart'));
 // 指定图表的配置项和数据
 let arr = [90,80,70,10,25,43]
 let name = ['高压风格','权威风格','亲和风格','民主风格','模范风格','教练风格']

 option = {
    xAxis: {
        type: 'category',
        data: name,
        axisLine:{
            lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
        },
        axisLabel:{color:'#000000'},   // x轴字体颜色,
        axisTick: {
            show: false
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '7%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        axisLine:{
            lineStyle:{color:'#C4C6CF'}    // x轴坐标轴颜色
        },
        axisLabel:{color:'#000000'},   // x轴字体颜色,
        max: 100,
        min: 0,
        splitNumber: 10,
    },
    series: [{
        data: arr,
        type: 'bar',
        color: '#825693',
        itemStyle:{
            normal: {
                label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                        color: 'black',
                        fontSize: 14,
                    }
                }
            }
        }
    }]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
