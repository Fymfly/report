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
    url: 'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
    // url:'/user',
    type: 'POST',
    data: {
        // people_result_id: 633508,
        people_result_id: people_result_id,
        report_type_id: 'LS2019'
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
    $('#Name').text(data.Name);
    $('#Sex').text(data.Sex);
    $('#Age').text(data.Age);
    $('#TestTime').text(data.TestTime);


    let fath = $('#beh');
    $.each(data.behaviour, function (key, value) {
        console.log(value)
        let Bp = $('<p>'+ value +'</p>')
        fath.append(Bp)
    })


    // 主要
    let fathMain = $('#main');  
    $.each(data.ranks[1],function(key,value) {
        let FMSpan = $('<span>'+value+'</span>')
        fathMain.append(FMSpan)
    })

    // 次要
    let fathMinor = $('#minor');  
    $.each(data.ranks[2],function(key,value) {
        let FMiSpan = $('<span>'+value+'</span>')
        fathMinor.append(FMiSpan)
    })

    // 较少
    let fathLess = $('#less');  
    $.each(data.ranks[3],function(key,value) {
        let FLSpan = $('<span>'+value+'</span>')
        fathLess.append(FLSpan)
    })


    let option =  {
        dataName: [],
        dataZs: []
    }
    $.each(data.scores, function (key, value) {
        option.dataName.push(key)
        option.dataZs.push(value.zscore)
        
    })


    AddEchart(option)
}


function AddEchart(data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    let arr = data.dataZs
    let name = data.dataName

    option = {
        xAxis: {
            type: 'category',
            data: name,
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色,
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
            axisLine: {
                lineStyle: { color: '#C4C6CF' }    // x轴坐标轴颜色
            },
            axisLabel: { color: '#000000' },   // x轴字体颜色,
            max: 100,
            min: 0,
            splitNumber: 10,
        },
        series: [{
            data: arr,
            type: 'bar',
            color: '#825693',
            itemStyle: {
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
}