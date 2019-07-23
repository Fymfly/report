 // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    let arr = [1,1,2,3,4,5,6,6,7,8,8,9,9,9]

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
        max: 10,
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
        data: ['舒适/家庭','安全/稳定','经济/报酬','归属/团队','社交/人际','利他/慈善','权力/影响','地位/职位','认可/表现','艺术/文化','变化/探索','专业/技术','自主/独立','挑战/成就'],
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
            data: arr,
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
                    color: function (params) {
                        var index_num = params.value;
                        for (var i = 0; i < arr.length; i++) {

                            //判断数据

                            if (index_num <= 10 && index_num >= 9) {
                                return '#38B690'
                            } else if (index_num <= 8 && index_num >= 7) {
                                return '#3494F1'
                            } else if (index_num <= 6 && index_num >= 4) {
                                return '#9D9999'
                            } else if (index_num <= 3 && index_num >= 2) {
                                return '#FA8F57'
                            } else if (index_num <= 1 && index_num >= 0) {
                                return '#E75554'
                            }


                        }
                    }
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
