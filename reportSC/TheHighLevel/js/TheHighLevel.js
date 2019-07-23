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
    url:'http://new.iwedoing.com/api/client/v1/front/report/data/',
    type: 'POST',
    data: {
        // people_result_id: 1798634,
        people_result_id: people_result_id,
        report_type_id: 'MC2019'
    },
    dataType: 'json',
    success: function (res) {

        let data = res;
        console.log(data)

        if (data.code == 0) {
            let result = data.detail.report_data.msg;
            console.log(result)
            let add = new AddDom(result)
            // console.log(add)
            //_this.AddDom(result);
        } else {
            alert('请求数据有误')
        }
    }
})

AddDom.prototype.progress = function (data, element) {
    this.data = data
    this.element = element
    let pt = parseInt(data)
    let liCol1 = $('<li></li>')
    let liCol2 = $('<li></li>')
    let liCol3 = $('<li></li>')
    let liCol4 = $('<li></li>')
    let liCol5 = $('<li></li>')
    let liColr1 = $('<li class="color_r"></li>')
    let liColr2 = $('<li class="color_r"></li>')
    let liColy1 = $('<li class="color_y"></li>')
    let liColy2 = $('<li class="color_y"></li>')
    let liColy3 = $('<li class="color_y"></li>')
    let liColg1 = $('<li class="color_g"></li>')
    let liColg2 = $('<li class="color_g"></li>')
    let liColg3 = $('<li class="color_g"></li>')
    let liColg4 = $('<li class="color_g"></li>')
    let liColg5 = $('<li class="color_g"></li>')
    if (pt === 2) {
        element.append(liColr1)
        element.append(liColr2)
        element.append(liCol1)
        element.append(liCol2)
        element.append(liCol3)
    } else if (pt === 1) {
        element.append(liColr1)
        element.append(liCol1)
        element.append(liCol2)
        element.append(liCol3)
        element.append(liCol4)
    } else if (pt === 3) {
        element.append(liColy1)
        element.append(liColy2)
        element.append(liColy3)
        element.append(liCol1)
        element.append(liCol2)
    } else if (pt === 4) {
        element.append(liColg1)
        element.append(liColg2)
        element.append(liColg3)
        element.append(liColg4)
        element.append(liCol1)
    } else if (pt === 5) {
        element.append(liColg1)
        element.append(liColg2)
        element.append(liColg3)
        element.append(liColg4)
        element.append(liColg5)
    } else if (pt === 0) {
        element.append(liCol1)
        element.append(liCol2)
        element.append(liCol3)
        element.append(liCol4)
        element.append(liCol5)
    }

}

AddDom.prototype.contentss = function (fathCon, memo) {
    this.fathCon = fathCon
    this.memo = memo

    let fathcont = fathCon;

    for (var i of memo) {
        let liList = $('<li></li>')
        if (i[0] == 'H') {
            let imgS = $('<div class="middle"><img src="./img/TheHighLevel_icon_02.png" alt=""></div>')
            liList.append(imgS)
            let P = $('<p class="font_size">' + i[1] + '</P>')
            liList.append(P)
            fathcont.append(liList)

        } else if (i[0] == 'M') {
            let imgS = $('<div class="middle"><img src="./img/TheHighLevel_icon_03.png" alt=""></div>')
            liList.append(imgS)
            let P = $('<p class="font_size">' + i[1] + '</P>')
            liList.append(P)
            fathcont.append(liList)

        } else if (i[0] == 'L') {
            let imgS = $('<div class="middle"><img src="./img/TheHighLevel_icon_04.png" alt=""></div>')
            liList.append(imgS)
            let P = $('<p class="font_size">' + i[1] + '</P>')
            liList.append(P)
            fathcont.append(liList)
        }
    }
}

function AddDom(data) {

    $('#Name').text(data.Name)
    $('#Age').text(data.Age)
    $('#Gender').text(data.Gender)
    $('#TestTime').text(data.TestTime)

    $('#self_adv').text(data.analysis['自我评价相对优势能力'])
    $('#self_ids').text(data.analysis['自我评价相对劣势能力'])
    $('#other_adv').text(data.analysis['他人评价相对优势能力'])
    $('#other_ids').text(data.analysis['他人评价相对劣势能力'])

    // 自评
    $('#pos_self').text(data.details_self['积极进取'].desc)
    var memo1 = data.details_self['积极进取'].memo
    var pt = data.details_self['积极进取'].pt
    // this.progress(pt,$('#apt'),$('#agg'),memo1)
    this.progress(pt, $('#apt'), $('#agg'), memo1)
    this.contentss($('#agg'), memo1)

    $('#cou_self').text(data.details_self['勇于承担'].desc)
    var memo1 = data.details_self['勇于承担'].memo
    var pt = data.details_self['勇于承担'].pt
    this.progress(pt, $('#cpr'))
    this.contentss($('#courage'), memo1)

    $('#fai_self').text(data.details_self['正直诚信'].desc)
    var memo1 = data.details_self['正直诚信'].memo
    var pt = data.details_self['正直诚信'].pt
    this.progress(pt, $('#fpr'))
    this.contentss($('#faith'), memo1)

    $('#thin_self').text(data.details_self['系统思维'].desc)
    var memo1 = data.details_self['系统思维'].memo
    var pt = data.details_self['系统思维'].pt
    this.progress(pt, $('#tpr'))
    this.contentss($('#thinking'), memo1)

    $('#cus_self').text(data.details_self['客户导向'].desc)
    var memo1 = data.details_self['客户导向'].memo
    var pt = data.details_self['客户导向'].pt
    this.progress(pt, $('#cpk'))
    this.contentss($('#customer'), memo1)

    $('#opt_self').text(data.details_self['创新优化'].desc)
    var memo1 = data.details_self['创新优化'].memo
    var pt = data.details_self['创新优化'].pt
    this.progress(pt, $('#opr'))
    this.contentss($('#optimize'), memo1)

    $('#man_self').text(data.details_self['变革推动'].desc)
    var memo1 = data.details_self['变革推动'].memo
    var pt = data.details_self['变革推动'].pt
    this.progress(pt, $('#mpr'))
    this.contentss($('#management'), memo1)

    $('#lead_self').text(data.details_self['团队领导'].desc)
    var memo1 = data.details_self['团队领导'].memo
    var pt = data.details_self['团队领导'].pt
    this.progress(pt, $('#lpr'))
    this.contentss($('#lead'), memo1)

    $('#cro_self').text(data.details_self['跨界协同'].desc)
    var memo1 = data.details_self['跨界协同'].memo
    var pt = data.details_self['跨界协同'].pt
    this.progress(pt, $('#prj'))
    this.contentss($('#crossover'), memo1)

    $('#int_self').text(data.details_self['资源整合'].desc)
    var memo1 = data.details_self['资源整合'].memo
    var pt = data.details_self['资源整合'].pt
    this.progress(pt, $('#ipr'))
    this.contentss($('#integration'), memo1)

    // Object.assgin()

    // 他评
    // 积极进取
    let fathpos = $('#positive');
    let positive = data.details_others['积极进取']
    let title = $('<td>积极进取</td>')
    fathpos.append(title)
    let first = $('<td id="first"></td>')
    let second = $('<td id="second"></td>')
    for (var i in positive) {
        let content = $('<pre>' + positive[i][0] + '</pre>')
        first.append(content)
        let score = $('<pre>' + positive[i][1] + '</pre>')
        second.append(score)
    }
    fathpos.append(first)
    fathpos.append(second)

    // 勇于担当
    let fathbear = $('#bear');
    let positive2 = data.details_others['勇于承担']
    let title2 = $('<td>勇于担当</td>')
    fathbear.append(title2)
    let first2 = $('<td id="first2"></td>')
    let second2 = $('<td id="second2"></td>')
    for (var i in positive2) {
        let content2 = $('<pre>' + positive2[i][0] + '</pre>')
        first2.append(content2)
        let score2 = $('<pre>' + positive2[i][1] + '</pre>')
        second2.append(score2)
    }
    fathbear.append(first2)
    fathbear.append(second2)

    // 正直诚信
    let fathint = $('#integrity');
    let positive3 = data.details_others['正直诚信']
    let title3 = $('<td>正直诚信</td>')
    fathint.append(title3)
    let first3 = $('<td id="first3"></td>')
    let second3 = $('<td id="second3"></td>')
    for (var i in positive3) {
        let content3 = $('<pre>' + positive3[i][0] + '</pre>')
        first3.append(content3)
        let score3 = $('<pre>' + positive3[i][1] + '</pre>')
        second3.append(score3)
    }
    fathint.append(first3)
    fathint.append(second3)

    // 系统思维
    let fathsys = $('#system');
    let positive4 = data.details_others['系统思维']
    let title4 = $('<td>系统思维</td>')
    fathsys.append(title4)
    let first4 = $('<td id="first4"></td>')
    let second4 = $('<td id="second4"></td>')
    for (var i in positive4) {
        let content4 = $('<pre>' + positive4[i][0] + '</pre>')
        first4.append(content4)
        let score4 = $('<pre>' + positive4[i][1] + '</pre>')
        second4.append(score4)
    }
    fathsys.append(first4)
    fathsys.append(second4)

    // 客户导向
    let fathgui = $('#guide');
    let positive5 = data.details_others['客户导向']
    let title5 = $('<td>客户导向</td>')
    fathgui.append(title5)
    let first5 = $('<td id="first5"></td>')
    let second5 = $('<td id="second5"></td>')
    for (var i in positive5) {
        let content5 = $('<pre>' + positive5[i][0] + '</pre>')
        first5.append(content5)
        let score5 = $('<pre>' + positive5[i][1] + '</pre>')
        second5.append(score5)
    }
    fathgui.append(first5)
    fathgui.append(second5)

    // 创新优化
    let fathinn = $('#innovate');
    let positive6 = data.details_others['创新优化']
    let title6 = $('<td>创新优化</td>')
    fathinn.append(title6)
    let first6 = $('<td id="first6"></td>')
    let second6 = $('<td id="second6"></td>')
    for (var i in positive6) {
        let content6 = $('<pre>' + positive6[i][0] + '</pre>')
        first6.append(content6)
        let score6 = $('<pre>' + positive6[i][1] + '</pre>')
        second6.append(score6)
    }
    fathinn.append(first6)
    fathinn.append(second6)

    // 变革管理
    let fathcha = $('#change');
    let positive7 = data.details_others['变革推动']
    let title7 = $('<td>变革推动</td>')
    fathcha.append(title7)
    let first7 = $('<td id="first7"></td>')
    let second7 = $('<td id="second7"></td>')
    for (var i in positive7) {
        let content7 = $('<pre>' + positive7[i][0] + '</pre>')
        first7.append(content7)
        let score7 = $('<pre>' + positive7[i][1] + '</pre>')
        second7.append(score7)
    }
    fathcha.append(first7)
    fathcha.append(second7)

    // 团队领导
    let fathteam = $('#team');
    let positive8 = data.details_others['团队领导']
    let title8 = $('<td>团队领导</td>')
    fathteam.append(title8)
    let first8 = $('<td id="first8"></td>')
    let second8 = $('<td id="second8"></td>')
    for (var i in positive8) {
        let content8 = $('<pre>' + positive8[i][0] + '</pre>')
        first8.append(content8)
        let score8 = $('<pre>' + positive8[i][1] + '</pre>')
        second8.append(score8)
    }
    fathteam.append(first8)
    fathteam.append(second8)

    // 跨界协同
    let fathsyn = $('#synergy');
    let positive9 = data.details_others['跨界协同']
    let title9 = $('<td>跨界协同</td>')
    fathsyn.append(title9)
    let first9 = $('<td id="first9"></td>')
    let second9 = $('<td id="second9"></td>')
    for (var i in positive9) {
        let content9 = $('<pre>' + positive9[i][0] + '</pre>')
        first9.append(content9)
        let score9 = $('<pre>' + positive9[i][1] + '</pre>')
        second9.append(score9)
    }
    fathsyn.append(first9)
    fathsyn.append(second9)

    // 资源整合
    let fathres = $('#resources');
    let positive10 = data.details_others['资源整合']
    let title10 = $('<td>资源整合</td>')
    fathres.append(title10)
    let first10 = $('<td id="first10"></td>')
    let second10 = $('<td id="second10"></td>')
    for (var i in positive10) {
        let content10 = $('<pre>' + positive10[i][0] + '</pre>')
        first10.append(content10)
        let score10 = $('<pre>' + positive10[i][1] + '</pre>')
        second10.append(score10)
    }
    fathres.append(first10)
    fathres.append(second10)


    let fathQN = $('#potential');
    var potential = data.portrait['潜能区']
    // potential.push('abc')
    if (potential.length == 0) {
        let ZW = $('<div><pre class="zw">暂无</pre></div>')
        fathQN.append(ZW)
    } else if (potential.length != 0) {
        let ullist = $('<ul class="cont"></ul>')
        for (var i in potential) {
            let QN = $('<li class="con">' + potential[i] + '</li>')
            ullist.append(QN)
        }
        fathQN.append(ullist)
    }

    let fathYS = $('#advantage');
    var potential = data.portrait['优势共识区']
    if (potential.length == 0) {
        let ZW = $('<div><pre class="zw">暂无</pre></div>')
        fathYS.append(ZW)
    } else if (potential.length != 0) {
        let ullist = $('<ul class="cont"></ul>')
        for (var i in potential) {
            let YS = $('<li class="con">' + potential[i] + '</li>')
            ullist.append(YS)
        }
        fathYS.append(ullist)
    }

    let fathDFZ = $('#develop');
    var potential = data.portrait['待发展共识区']
    if (potential.length == 0) {
        let ZW = $('<div><pre class="zw">暂无</pre></div>')
        fathDFZ.append(ZW)
    } else if (potential.length != 0) {
        let ullist = $('<ul class="cont"></ul>')
        for (var i in potential) {
            let DFZ = $('<li class="con">' + potential[i] + '</li>')
            ullist.append(DFZ)
        }
        fathDFZ.append(ullist)
    }

    let fathMD = $('#blindSpots');
    var potential = data.portrait['盲点']
    if (potential.length == 0) {
        let ZW = $('<div><pre class="zw">暂无</pre></div>')
        fathMD.append(ZW)
    } else if (potential.length != 0) {
        let ullist = $('<ul class="cont"></ul>')
        for (var i in potential) {
            let MD = $('<li class="con">' + potential[i] + '</li>')
            ullist.append(MD)
        }
        fathMD.append(ullist)
    }



    // 个人发展建议

    // 获取个数
    let keynum = ''
    $.each(data.advices, function (key, value) {
        keynum++
        return keynum;
    })

    var advices = []
    for (let i in data.advices) {
        let o = {};
        o[i] = data.advices[i];
        advices.push(o)
    }

    var advicess = []
    for (var i = 0; i < advices.length; i += 3) {
        advicess.push(advices.slice(i, i + 3))
    }

    if (keynum <= 3) {
        let newadv = $(`<section class="advic sheet">
            <img src="./img/TheHighLevel_picture024.png" alt="">
            <div class="border">
                <div class="content">
                    <p>根据能力对比分析，在管理者10条能力素质中您应该重点关注被列入“盲点”和“待发展共识区”的能力素质。以下建议供您参考，塑造更好的自己。</p>
                    <table id="table"></table>
                </div>
            </div>
            <div class="page">第13页</div>
        </section>`)

        $('.after').after(newadv)

        // 个人能力发展建议
        let fathAdv = $('#table')
        let firsttr = $('<tr style="height: 45px;"><th>提升能力</th><th>个人发展建议</th></tr>')

        fathAdv.append(firsttr)

        $.each(advicess[0], function (key, value) {

            $.each(value, function (v, k) {
                let qittr = $('<tr class="advicea"></tr>')
                let power = $('<td class="power">' + v + '</td>')
                qittr.append(power)
                let personal = $('<td class="personal"></td>')
                $.each(k, function (s, z) {

                    if (z.length === 1) {
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    } else {
                        let ss = s + 1
                        // console.log(as)
                        let num = $('<p class="num">' + ss + '、' + '</p>')
                        personal.append(num)
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    }
                })
                qittr.append(personal)
                fathAdv.append(qittr)
            })
        })
    } else if (keynum > 3 || keynum <= 6) {
        
        let newadv2 = $(`<section class="advic sheet after3">
                <img src="./img/TheHighLevel_picture024.png" alt="">
                <div class="border">
                    <div class="content">
                        <table id="table"></table>
                    </div>
                </div>
                <div class="page">第14页</div>
            </section>`)

        $('.after2').after(newad2)

        let fathAdv = $('#table')
        let firsttr = $('<tr style="height: 45px;"><th>提升能力</th><th>个人发展建议</th></tr>')

        fathAdv.append(firsttr)

        $.each(advicess[1], function (key, value) {

            $.each(value, function (v, k) {

                let qittr = $('<tr class="advicea"></tr>')
                let power = $('<td class="power">' + v + '</td>')
                qittr.append(power)
                let personal = $('<td class="personal"></td>')
                $.each(k, function (s, z) {

                    if (z.length === 1) {
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    } else {
                        let ss = s + 1
                        let num = $('<p class="num">' + ss + '、' + '</p>')
                        personal.append(num)
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    }
                })
                qittr.append(personal)
                fathAdv.append(qittr)
            })
        })
    } else if (keynum >= 6 || keynum <= 9) {

        let newadv3 = $(`<section class="advic sheet after4">
                <img src="./img/TheHighLevel_picture024.png" alt="">
                <div class="border">
                    <div class="content">
                        <table id="table"></table>
                    </div>
                </div>
                <div class="page">第14页</div>
            </section>`)

        $('.after3').after(newadv3)

        let fathAdv = $('#table')
        let firsttr = $('<tr style="height: 45px;"><th>提升能力</th><th>个人发展建议</th></tr>')

        fathAdv.append(firsttr)

        $.each(advicess[2], function (key, value) {
            console.log(value)

            $.each(value, function (v, k) {
                let qittr = $('<tr class="advicea"></tr>')
                let power = $('<td class="power">' + v + '</td>')
                qittr.append(power)
                let personal = $('<td class="personal"></td>')
                $.each(k, function (s, z) {
                    if (z.length === 1) {
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    } else {
                        let ss = s + 1
                        // console.log(as)
                        let num = $('<p class="num">' + ss + '、' + '</p>')
                        personal.append(num)
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    }
                })
                qittr.append(personal)
                fathAdv.append(qittr)
            })
        })
    } else if (keynum <= 10) {

        let newadv4 = $(`<section class="advic sheet">
                <img src="./img/TheHighLevel_picture024.png" alt="">
                <div class="border">
                    <div class="content">
                        <table id="table"></table>
                    </div>
                </div>
                <div class="page">第15页</div>
            </section>`)

        $('.after4').after(newadv4)

        let fathAdv = $('#table')
        let firsttr = $('<tr style="height: 45px;"><th>提升能力</th><th>个人发展建议</th></tr>')

        fathAdv.append(firsttr)

        $.each(advicess[3], function (key, value) {
            console.log(value)

            $.each(value, function (v, k) {
                let qittr = $('<tr class="advicea"></tr>')
                let power = $('<td class="power">' + v + '</td>')
                qittr.append(power)
                let personal = $('<td class="personal"></td>')
                $.each(k, function (s, z) {
                    if (z.length === 1) {
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    } else {
                        let ss = s + 1
                        let num = $('<p class="num">' + ss + '、' + '</p>')
                        personal.append(num)
                        let wenzi = $('<p class="wenzi">' + z + '</p>')
                        personal.append(wenzi)
                    }
                })
                qittr.append(personal)
                fathAdv.append(qittr)
            })
        })
    }


    
    // 雷达图
    var option = {
        dataName: [],
        dataSelf: [],
        dataOther: []
    }
    $.each(data.scores, function (key, value) {
        $.each(value, function (k, v) {
            option.dataName.push(k)

        })
    })
    $.each(data.scores.self, function (key, value) {
        option.dataSelf.push(value)
    })

    $.each(data.scores.others, function (key, value) {
        option.dataOther.push(value)
    })

    AddEchart(option);
}

function AddEchart(data) {
    var myChart = echarts.init(document.getElementById('scanning'));
    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            x: 10000,

        },
        splitArea: {
            areaStyle: {
                color: ['rgba(114, 172, 209, 0)',
                    'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0)',
                    'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 0)'],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
            }
        },
        legend: {
            x: 'right',
            data: ['他评', '自评']
        },
        calculable: true,
        polar: [
            {
                indicator: [
                    { text: data.dataName[0], max: 5 },
                    { text: data.dataName[1], max: 5 },
                    { text: data.dataName[2], max: 5 },
                    { text: data.dataName[3], max: 5 },
                    { text: data.dataName[4], max: 5 },
                    { text: data.dataName[5], max: 5 },
                    { text: data.dataName[6], max: 5 },
                    { text: data.dataName[7], max: 5 },
                    { text: data.dataName[8], max: 5 },
                    { text: data.dataName[9], max: 5 },
                ],
                center: ['50%', '50%'],
                radius: 100
            }
        ],
        series: [
            {
                name: '雷达图',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        // color: 各异,
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: [data.dataOther[0], data.dataOther[1], data.dataOther[2], data.dataOther[3], data.dataOther[4], data.dataOther[5], data.dataOther[6], data.dataOther[7], data.dataOther[8], data.dataOther[9]],
                        name: '他评',
                        symbol: 'star5',
                        symbolSize: 4,           // 可计算特性参数，空数据拖拽提示图形大小
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            }
                        },
                        lineStyle: {                // 单项线条样式。
                            normal: {
                                color: 'rgba(75, 211, 140, 1)'         // 图形透明度
                            }
                        },
                        //rgba(75, 211, 140, 1)
                    },
                    {
                        value: [data.dataSelf[0], data.dataSelf[1], data.dataSelf[2], data.dataSelf[3], data.dataSelf[4], data.dataSelf[5], data.dataSelf[6], data.dataSelf[7], data.dataSelf[8], data.dataSelf[9]],
                        name: '自评',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            },

                        },
                        lineStyle: {                // 单项线条样式。
                            normal: {
                                opacity: 0         // 图形透明度
                            }
                        },

                        areaStyle: {                // 单项区域填充样式
                            normal: {
                                color: 'rgba(126, 75, 211, 0.9)'       // 填充的颜色。[ default: "#000" ]
                            }
                        }

                    },

                ]
            },

        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
