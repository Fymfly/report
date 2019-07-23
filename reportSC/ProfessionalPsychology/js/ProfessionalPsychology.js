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
    type: 'POST',
    data: {
        // people_result_id: 11183,
        people_result_id: people_result_id,
        report_type_id: 'PPSY2019'
    },
    dataType: 'json',
    success: function (res) {
        let data = res;
        // console.log(res) 
        if (data.code == 0) {
            let result = data.detail.report_data.msg;
            console.log(result)
            AddDom(result)
        } else {
            alert('请求数据有误')
        }
    }
})


function AddDom(data) {
    $('#Name').text(data.Name)
    $('#Gender').text(data.Gender)
    $('#Age').text(data.Age)
    $('#TestTime').text(data.TestTime)
    $('#CompletionTime').text(data.CompletionTime)
    $('#Validity').text(data.Validity)


    // 典型特征
    if (data.ranks[1].length == 0) {
        let yellow = $('#yellow');
        let traitp1 = $('<p>暂无</p>')
        yellow.append(traitp1)
    } else {
        let yellow = $('#yellow');
        let divP = $('<div></div>')
        yellow.append(divP)
        $.each(data.ranks[1], function (key, val) {

            let traitb1 = $('<p>' + val + '</p>')
            divP.append(traitb1)
        })
    }

    if (data.ranks[2].length == 0) {
        let orger = $('#orger');
        let traitp2 = $('<p>暂无</p>')
        orger.append(traitp2)
    } else {
        let orger = $('#orger');
        let divP = $('<div class="dataD"></div>')
        orger.append(divP)
        $.each(data.ranks[2], function (key, val) {

            let traitb2 = $('<b>' + val + '</b>')
            divP.append(traitb2)
        })
    }

    if (data.ranks[3].length == 0) {
        let red = $('#red');
        let traitp3 = $('<p>暂无</p>')
        red.append(traitp3)
    } else {
        let red = $('#red');
        let divP = $('<div class="dataD"></div>')
        red.append(divP)
        $.each(data.ranks[3], function (key, val) {

            let traitb3 = $('<b>' + val + '</b>')
            divP.append(traitb3)
        })
    }



    // 详细解释
    // console.log(data.scores['躯体反应'].desc)
    $('#qtfy').html(data.scores['躯体反应'].desc)
    $('#hbxw').html(data.scores['回避行为'].desc)
    $('#hxxw').html(data.scores['幻想行为'].desc)
    $('#zzxw').html(data.scores['自责行为'].desc)
    $('#qpxw').html(data.scores['强迫行为'].desc)
    $('#pzxl').html(data.scores['偏执心理'].desc)
    $('#jdxl').html(data.scores['嫉妒心理'].desc)
    $('#rjsy').html(data.scores['人际适应'].desc)
    $('#gdgs').html(data.scores['孤独感受'].desc)
    $('#ylxl').html(data.scores['依赖心理'].desc)
    $('#cyxl').html(data.scores['猜疑心理'].desc)
    $('#jlxl').html(data.scores['焦虑情绪'].desc)
    $('#cdkz').html(data.scores['冲动控制'].desc)
    $('#yyqx').html(data.scores['抑郁倾向'].desc)
    $('#hjsy').html(data.scores['环境适应'].desc)
    $('#kjxl').html(data.scores['恐惧心理'].desc)
    $('#sxty').html(data.scores['身心同一'].desc)


    let option = {
        dataName: [],
        dataPt: []
    }
    let dataO = data.scores
    // console.log(dataO)
    // dataO.remove('社会称许性')
    //删除属性
    delete dataO['社会称许性'];
    // dataO.splice(11,1)
    // console.log(dataO)
    $.each(data.scores, function (key, val) {
        // console.log(val.pt)

        option.dataName.push(key)
        option.dataPt.push(val.pt)
        // delete.数组[数组下标];

    })


    AddEchart(option)

}


function AddEchart(data) {

    console.log(data)
    let arr = data.dataPt;
    // console.log(arr)
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('graph'));
    // 指定图表的配置项和数据
    option = {
        color: ['#3398DB'],
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
                max: 30,
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
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: 'black',
                                fontSize: 16
                            }
                        },
                        color: function (params) {
                            var index_num = params.value;
                            for (var i = 0; i < arr.length; i++) {

                                //判断数据

                                if (index_num <= 30 && index_num >= 26) {
                                    return '#ec5656'
                                } else if (index_num <= 25 && index_num >= 21) {
                                    return '#fcbb4d'
                                } else if (index_num <= 20 && index_num >= 16) {
                                    return '#fae046'
                                } else if (index_num <= 15 && index_num >= 11) {
                                    return '#3f88ff'
                                } else if (index_num <= 10 && index_num >= 0) {
                                    return '#45cd7d'
                                }


                            }
                        }

                    }
                },

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