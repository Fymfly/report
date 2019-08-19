function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

let people_result_id = this.GetQueryString('people_result_id');


$.ajax({
    url: 'http://new.iwedoing.com/api/client/v1/front/report/data/',
    // url:'/user',
    type: 'POST',
    data: {
        // people_result_id: 1800421,
        people_result_id: people_result_id,
        report_type_id: 'PC2019'
    },
    dataType: 'json',
    success: function (res) {

        let data = res;
        // console.log(res)
        if (data.code == 0) {
            let result = data.detail.report_data.msg;
            AddDom(result);
        } else {
            alert('请求数据有误')
        }
    }
})


function AddDom(data) {
    console.log(data)
    $('#Name').text(data.Name)
    $('#Gender').text(data.Gender)
    $('#Age').text(data.Age)
    $('#TestTime').text(data.TestTime)
    $('#CompletionTime').text(data.CompletionTime)
    $('#Validity').text(data.Validity)


    // 优势特征
    let fathA = $('#adv')
    let AdvP = $('<p class="sm_title2">优势特征:</p>')
    fathA.append(AdvP)
    $.each(data.ranks[1], function (key, value) {
        // console.log(value)
        let Adv = $('<span>' + value + '</span>')
        fathA.append(Adv)
    })

    // 弱势特征
    let fathW = $('#weak')
    let AdvP2 = $('<p class="sm_title2">弱势特征:</p>')
    fathW.append(AdvP2)
    $.each(data.ranks[3], function (key, value) {
        // console.log(value)
        let Adv2 = $('<span>' + value + '</span>')
        fathW.append(Adv2)
    })


    // 动机取向
    $('#jqx').text(data.detail['动机取向'].quotas[2] + ':')
    $('#jqxn').text(data.detail['动机取向'].suggest[2])

    $('#zpx').text(data.detail['动机取向'].quotas[0] + ':')
    $('#zpxn').text(data.detail['动机取向'].suggest[0])

    $('#xhx').text(data.detail['动机取向'].quotas[1] + ':')
    $('#xhxn').text(data.detail['动机取向'].suggest[1])


    // 认知取向
    $('#kfx').text(data.detail['认知取向'].quotas[2] + ':')
    $('#kfxn').text(data.detail['认知取向'].suggest[2])

    $('#lgx').text(data.detail['认知取向'].quotas[3] + ':')
    $('#lgxn').text(data.detail['认知取向'].suggest[3])

    $('#btx').text(data.detail['认知取向'].quotas[0] + ':')
    $('#btxn').text(data.detail['认知取向'].suggest[0])

    $('#nsx').text(data.detail['认知取向'].quotas[1] + ':')
    $('#nsxn').text(data.detail['认知取向'].suggest[1])


    // 意志取向
    $('#dlx').text(data.detail['意志取向'].quotas[0] + ':')
    $('#dlxn').text(data.detail['意志取向'].suggest[0])

    $('#jrx').text(data.detail['意志取向'].quotas[2] + ':')
    $('#jrxn').text(data.detail['意志取向'].suggest[2])

    $('#zlx').text(data.detail['意志取向'].quotas[1] + ':')
    $('#zlxn').text(data.detail['意志取向'].suggest[1])


    // 情绪取向
    $('#ynx').text(data.detail['情绪取向'].quotas[0] + ':')
    $('#ynxn').text(data.detail['情绪取向'].suggest[0])

    $('#wdx').text(data.detail['情绪取向'].quotas[1] + ':')
    $('#wdxn').text(data.detail['情绪取向'].suggest[1])

    $('#zxx').text(data.detail['情绪取向'].quotas[2] + ':')
    $('#zxxn').text(data.detail['情绪取向'].suggest[2])


    // 任务取向
    $('#zxx').text(data.detail['任务取向'].quotas[0] + ':')
    $('#zxxn').text(data.detail['任务取向'].suggest[0])


    // 人际取向
    $('#wdx').text(data.detail['人际取向'].quotas[0] + ':')
    $('#wdxn').text(data.detail['人际取向'].suggest[0])

    $('#zxx').text(data.detail['人际取向'].quotas[1] + ':')
    $('#zxxn').text(data.detail['人际取向'].suggest[1])

    let option = {
        dataName: data.scores.quota,
        data: data.scores.score
    }
    AddEchart(option)

    // 动机取向
    let option2 = {
        dataName: data.detail['动机取向'].quotas,
        data: data.detail['动机取向'].scores
    }
    AddEchart2(option2)

    // 认知取向
    let option3 = {
        dataName: data.detail['认知取向'].quotas,
        data: data.detail['认知取向'].scores
    }
    AddEchart3(option3)

    // 意志取向
    let option4 = {
        dataName: data.detail['意志取向'].quotas,
        data: data.detail['意志取向'].scores
    }
    AddEchart4(option4)

    // 情绪取向
    let option5 = {
        dataName: data.detail['情绪取向'].quotas,
        data: data.detail['情绪取向'].scores
    }
    AddEchart5(option5)

    // 任务取向
    let option6 = {
        dataName: data.detail['任务取向'].quotas,
        data: data.detail['任务取向'].scores
    }
    AddEchart6(option6)

    // 人际取向
    let option7 = {
        dataName: data.detail['人际取向'].quotas,
        data: data.detail['人际取向'].scores
    }
    AddEchart7(option7)

}

function AddEchart(data) {
    var myChart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    let arr = data.data

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
                data: data.dataName,
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

}


function AddEchart2(data2) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart2'));
    // 指定图表的配置项和数据
    let arr2 = [data2.data[1], data2.data[0], data2.data[2]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data2.dataName[1], data2.dataName[0], data2.dataName[2]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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

}


function AddEchart3(data3) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart3'));
    // 指定图表的配置项和数据
    let arr3 = [data3.data[1], data3.data[0], data3.data[3], data3.data[2]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data3.dataName[1], data3.dataName[0], data3.dataName[3], data3.dataName[2]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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
}


function AddEchart4(data4) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart4'));
    // 指定图表的配置项和数据
    let arr4 = [data4.data[1], data4.data[2], data4.data[0]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data4.dataName[1], data4.dataName[2], data4.dataName[0]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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
}


function AddEchart5(data5) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart5'));
    // 指定图表的配置项和数据
    let arr5 = [data5.data[2], data5.data[1], data5.data[0]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data5.dataName[2], data5.dataName[1], data5.dataName[0]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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
}

function AddEchart6(data6) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart6'));
    // 指定图表的配置项和数据
    let arr6 = [data6.data[0]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data6.dataName[0]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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
}

function AddEchart7(data7) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart7'));
    // 指定图表的配置项和数据
    let arr7 = [data7.data[1],data7.data[0]]

    option = {
        tooltip: {
            axisPointer: {
                type: ''
            },
            // 取消鼠标方法效果
            trigger: 'item',
            show: false,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色
        },
        yAxis: {
            type: 'category',
            data: [data7.dataName[1],data7.dataName[0]],
            // 隐藏刻度线
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色

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
}