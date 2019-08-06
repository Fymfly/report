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
    // url: 'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
    url:'http://new.iwedoing.com/api/client/v1/front/report/data/',
    // url:'/user',
    type: 'POST',
    data: {
        // people_result_id: 29360,
        people_result_id: people_result_id,
        report_type_id: 'WV2019'
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

    $('.names').text(data.Name)


    var arr2 = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    var new_arr = [];
    for (var i = 0; i < arr2.length; i++) {
        var items = arr2[i];
        //判断元素是否存在于new_arr中，如果不存在则插入到new_ar中
        if ($.inArray(items, new_arr) == -1) {
            new_arr.push(items);
        }
    }
    // console.log(new_arr)

    let fath1 = $('#factorsQ')
    $.each(data.ranks[1], function (key, value) {
        let factorsQP = $('<p class="res">' + value + '</p>')
        fath1.append(factorsQP)
    })

    let fath2 = $('#factorsY')
    $.each(data.ranks[2], function (key, value) {
        let factorsYP = $('<p class="res">' + value + '</p>')
        fath2.append(factorsYP)
    })

    let fath3 = $('#factorsF')
    $.each(data.ranks[4], function (key, value) {
        let factorsFP = $('<p class="res">' + value + '</p>')
        fath3.append(factorsFP)
    })

    let fath4 = $('#factorsQJ')
    $.each(data.ranks[5], function (key, value) {
        let factorsQJP = $('<p class="res">' + value + '</p>')
        fath4.append(factorsQJP)
    })



    let detaildata = data.detail;

    delete detaildata[3]
    console.log(detaildata)


    let len = [];
    $.each(detaildata, (index, item) => {
        $.each(item, (index2, item2) => {
            $.each(item2, (index3, item3) => {
                if (index == 1) {
                    item3.yinsu = '强激励因素';
                } else if (index == 2) {
                    item3.yinsu = '一般激励性因素';
                    //console.log(item)
                } else if (index == 4) {
                    item3.yinsu = '一般负激励因素';
                } else if (index == 5) {
                    item3.yinsu = '强负激励因素';
                }
                item3.title = index2
                len.push({ ...item3 })
            })
        })
    })
    let setcionwarpper = [];

    let results = $('.results')

    let resultdetaildata = []
    for (var i = 0; i < len.length; i += 2) {
        resultdetaildata.push(len.slice(i, i + 2));
        let setcionitem = $(`<section class='detailed sheet'><img src="./img/picture023.png" alt="" style="margin-top: -1px;width: 101%;margin-left: -1px;"><div class="border">
        <div class="content"></div></div><div class="page"></div></section>`)
        // A4.append(setcionitem);
        $('.results').after(setcionitem)
        setcionwarpper.push(setcionitem)

    }


    // 页码数 
    $.each($('.detailed'), (key, index) => {
        $('.detailed').eq(key).children('.page').text('第' + (key + 3) + '页')
    })
    resultdetaildata = resultdetaildata.reverse();


    // console.log(resultdetaildata)
    $.each(resultdetaildata, (index, item) => {
        // console.log(item)
        let box = setcionwarpper[index].children('.border').children('.content');
        $.each(item, (index2, item2) => {
            // console.log(item2)
            if (item2.yinsu == '强激励因素') {
                let char = $('<div class="char1">' + item2.yinsu + '</div>')
                box.append(char)
                let jiao = $('<div class="jiao1"></div><br><br><br><br>')
                box.append(jiao)
                let det_wd = $('<pre class="det_wd qjlys2 qjlys22">' + item2.title + '</pre>')
                box.append(det_wd)
            } else if (item2.yinsu == '一般激励性因素') {
                let char = $('<div class="char2">' + item2.yinsu + '</div>')
                box.append(char)
                let jiao = $('<div class="jiao2"></div><br><br><br><br>')
                box.append(jiao)
                let det_wd = $('<pre class="det_wd ybjlxys2 ybjlxys22">' + item2.title + '</pre>')
                box.append(det_wd)

            } else if (item2.yinsu == '一般负激励因素') {
                let char = $('<div class="char3">' + item2.yinsu + '</div>')
                box.append(char)
                let jiao = $('<div class="jiao3"></div><br><br><br><br>')
                box.append(jiao)
                let det_wd = $('<pre class="det_wd ybfjlys2 ybfjlys22">' + item2.title + '</pre>')
                box.append(det_wd)

            } else if (item2.yinsu == '强负激励因素') {
                let char = $('<div class="char4">' + item2.yinsu + '</div>')
                box.append(char)
                let jiao = $('<div class="jiao4"></div><br><br><br><br>')
                box.append(jiao)
                let det_wd = $('<pre class="det_wd qfjlys2 qfjlys22">' + item2.title + '</pre>')
                box.append(det_wd)
            }
            $('.char1').slice(1, $('.char1').length).remove()
            $('.jiao1').slice(1, $('.jiao1').length).remove()

            $('.char2').slice(1, $('.char2').length).remove()
            $('.jiao2').slice(1, $('.jiao2').length).remove()

            $('.char3').slice(1, $('.char3').length).remove()
            $('.jiao3').slice(1, $('.jiao3').length).remove()

            $('.char4').slice(1, $('.char4').length).remove()
            $('.jiao4').slice(1, $('.jiao4').length).remove()

            let det_con = $('<div class="det_con"></div>')

            if (item2.yinsu == '强激励因素') {
                let det_zb = $('<p class="det_zb"><i class="qjlys2 miaoshu">' + item2.quota + ':</i> ' + item2.desc + '</p>')
                det_con.append(det_zb)
            } else if (item2.yinsu == '一般激励性因素') {
                let det_zb = $('<p class="det_zb"><i class="ybjlxys2 miaoshu">' + item2.quota + ':</i> ' + item2.desc + '</p>')
                det_con.append(det_zb)
            } else if (item2.yinsu == '一般负激励因素') {
                let det_zb = $('<p class="det_zb"><i class="ybfjlys2 miaoshu">' + item2.quota + ':</i> ' + item2.desc + '</p>')
                det_con.append(det_zb)
            } else if (item2.yinsu == '强负激励因素') {
                let det_zb = $('<p class="det_zb"><i class="qfjlys2 miaoshu">' + item2.quota + ':</i> ' + item2.desc + '</p>')
                det_con.append(det_zb)
            }


            let det_tit = $('<p class="det_tit">因素：</p>')
            det_con.append(det_tit)
            if(item2.factor == null) {
                let det_ys = $('<p class="det_ys">' + '暂无' + '</p>')
                det_con.append(det_ys)
            } else {
                let det_ys = $('<p class="det_ys">' + item2.factor + '</p>')
                det_con.append(det_ys)
            }
            
            let det_tit2 = $('<p class="det_tit">建议：</p>')
            det_con.append(det_tit2)
            let adv = $('<div class="adv"></div>')

            $.each(item2.suggestion, function (k, v) {
 
                let advP = $('<p class="det_num">' + (k + 1) + '、' + '</p>')
                adv.append(advP)
                let advW = $('<p class="det_wenzi">' + v + '</p>')
                adv.append(advW)
            })

            det_con.append(adv)
            box.append(det_con)

        })
    })


    // let nary1 = $('.ybfjlys22')
    // for (let i = 0; i < nary1.length; i++) {
    //     for (let j = i + 1; j < nary1.length; j++) {
    //         if (nary1[i].innerHTML === nary1[j].innerHTML) {
    //             nary1[j].remove()
    //             nary1.splice(j, 1);
    //             j--;

    //         }
    //     }
    // }

    let nary1 = $('.qjlys22')
    console.log(nary1)
    for(let i = 0;i<nary1.length;i++) {
        for(let j=i+1;j<nary1.length;j++) {
            if(nary1[i].innerHTML === nary1[j].innerHTML) {
                nary1[j].remove()
            }
        }
    }

    let nary2 = $('.ybjlxys22')
    console.log(nary2)
    for(let i = 0;i<nary2.length;i++) {
        for(let j=i+1;j<nary2.length;j++) {
            if(nary2[i].innerHTML === nary2[j].innerHTML) {
                nary2[j].remove()
            }
        }
    }

    let nary3 = $('.ybfjlys22')
    console.log(nary3)
    for(let i = 0;i<nary3.length;i++) {
        for(let j=i+1;j<nary3.length;j++) {
            if(nary3[i].innerHTML === nary3[j].innerHTML) {
                nary3[j].remove()
            }
        }
    }

    let nary4 = $('.qfjlys2')
    console.log(nary4)
    for(let i = 0;i<nary4.length;i++) {
        for(let j=i+1;j<nary4.length;j++) {
            if(nary4[i].innerHTML === nary4[j].innerHTML) {
                nary4[j].remove()
            }
        }
    }

    let score = data.scores.score
    score.reverse()
    let option = {
        quota: data.scores.quota,
        score: data.scores.score
    }

    AddEchart(option)
}



function AddEchart(data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart'));
    // 指定图表的配置项和数据
    let arr = data.score

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
            max: 10,
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
            data: data.quota.reverse(),
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
}