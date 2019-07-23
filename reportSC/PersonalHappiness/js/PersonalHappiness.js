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
        // people_result_id: 90777,
        people_result_id: people_result_id,
        report_type_id: 'PEOI2019'
    },
    dataType: 'json',
    success: function (res) {

        let data = res;
        console.log(res.detail.report_data.msg)
        if (data.code == 0) {
            let result = data.detail.report_data.msg;
            AddDom(result);
        } else {
            alert('请求数据有误')
        }
    }
})
function ceshijieguo(el, data) {
    let fathYS = el;
    let advantage = data;
    // console.log(data)
    if (advantage.length == 0) {
        let ZW = $('<p class="zw" style="color: rgba(168, 168, 168, 1);">暂无</p>')
        fathYS.append(ZW)
    } else if (advantage.length != 0) {
        let RES_DATA = $('<div class="data"></div>')
        $.each(advantage, function (key, value) {
            let PRES = $('<p class="res">' + value.name + '</p>')
            RES_DATA.append(PRES)
            let NUM = $('<p class="num">' + value.value + '</p>')
            RES_DATA.append(NUM)
        })
        fathYS.append(RES_DATA)
    }
}

function AddDom(data) {
    $('#Name').text(data.Name)
    $('#Age').text(data.Age)
    $('#Gender').text(data.Gender)
    $('#TestTime').text(data.TestTime);
    let youshi = new Array();
    let baochi = new Array();
    let guanzhu = new Array();
    let gaijin = new Array();

    let newyoushi = new Array();
    let newbaochi = new Array();
    let newguanzhu = new Array();
    let newgaijin = new Array();

    $.each(data.ranks, function (i1, item1) {
        if (i1 == 1) {
            gaijin = item1;
        } else if (i1 == 2) {
            guanzhu = item1;
        } else if (i1 == 3) {
            baochi = item1;
        } else {
            youshi = item1
        }
    })
    // console.log(data.scores)
    // console.log(youshi)
    $.each(data.scores, function (i1, item1) {
        $.each(youshi, function (i2, item2) {
            if (i1 == item2) {
                newyoushi.push({ name: i1, value: item1.rank });
            }
        })
        $.each(baochi, function (i2, item2) {
            if (i1 == item2) {
                newbaochi.push({ name: i1, value: item1.rank });
            }
        })
        $.each(guanzhu, function (i2, item2) {
            if (i1 == item2) {
                newguanzhu.push({ name: i1, value: item1.rank });
            }
        })
        $.each(gaijin, function (i2, item2) {
            if (i1 == item2) {
                newgaijin.push({ name: i1, value: item1.rank });
            }
        })
    })
    
    // console.log(newyoushi, newbaochi, newguanzhu, newgaijin)

    ceshijieguo($('.class_res').eq(3), newgaijin)
    ceshijieguo($('.class_res').eq(2), newguanzhu)
    ceshijieguo($('.class_res').eq(1), newbaochi)
    ceshijieguo($('.class_res').eq(0), newyoushi)

    //详情
    let EXPLAINTYPE = $('.extype');
    let EXPLAINTYPE_arr = [];

    $.each(EXPLAINTYPE, function (i, item) {
        // console.log(item)
        let biaozhunfen = item.getElementsByClassName('points')[0].getElementsByClassName('sta')[0].getElementsByClassName('norm')[0];
        let progress = item.getElementsByClassName('progressA')[0].getElementsByClassName('progress')[0].getElementsByClassName('pro')[0];
        // console.log(newgaijin)

        $.each(newgaijin, function (i2, item2) {

            if (item2.name == item.getElementsByTagName('h1')[0].innerHTML) {
                biaozhunfen.style.color = 'rgba(225, 70, 25, 1)'
                biaozhunfen.innerHTML = item2.value;
                progress.style.background = 'rgba(225, 70, 25, 1)'

                progress.style.width = (item2.value * 10) + '%'
            }
        })

        $.each(newguanzhu, function (i2, item2) {

            if (item2.name == item.getElementsByTagName('h1')[0].innerHTML) {
                biaozhunfen.style.color = 'rgba(106, 30, 218, 1)'
                biaozhunfen.innerHTML = item2.value;
                progress.style.background = 'rgba(106, 30, 218, 1)'

                progress.style.width = (item2.value * 10) + '%'
            }
        })

        $.each(newbaochi, function (i2, item2) {

            if (item2.name == item.getElementsByTagName('h1')[0].innerHTML) {
                biaozhunfen.style.color = 'rgba(61, 135, 255, 1)'
                biaozhunfen.innerHTML = item2.value;
                progress.style.background = 'rgba(61, 135, 255, 1)'

                progress.style.width = (item2.value * 10) + '%'
            }
        })

        $.each(newyoushi, function (i2, item2) {

            if (item2.name == item.getElementsByTagName('h1')[0].innerHTML) {
                biaozhunfen.style.color = '#1CCA6B'
                biaozhunfen.innerHTML = item2.value;
                progress.style.background = '#1CCA6B'

                progress.style.width = (item2.value * 10) + '%'
            }
        })
    })
    // console.log(EXPLAINTYPE_arr)


    $('#lgjj_rank').text(data.scores['乐观积极'].rank)
    $('#lgjj_pt').text(data.scores['乐观积极'].pt)
    $('#lgjj_cdf').text(data.scores['乐观积极'].cdf + '%')
    $('#lgjj_desc').text(data.scores['乐观积极'].desc)
    $('#lgjj_pro').css('width', data.scores['乐观积极'].rank + '0%')
    $('#lgjj_rank1').text(data.scores['乐观积极'].rank + '分')


    $('#zxjr_rank').text(data.scores['自信坚韧'].rank)
    $('#zxjr_pt').text(data.scores['自信坚韧'].pt)
    $('#zxjr_cdf').text(data.scores['自信坚韧'].cdf + '%')
    $('#zxjr_desc').text(data.scores['自信坚韧'].desc)
    $('#zxjr_pro').css('width', data.scores['自信坚韧'].rank + '0%')
    $('#zxjr_rank1').text(data.scores['自信坚韧'].rank + '分')

    $('#hlgy_rank').text(data.scores['合理归因'].rank)
    $('#hlgy_pt').text(data.scores['合理归因'].pt)
    $('#hlgy_cdf').text(data.scores['合理归因'].cdf + '%')
    $('#hlgy_desc').text(data.scores['合理归因'].desc)
    $('#hlgy_pro').css('width', data.scores['合理归因'].rank + '0%')
    $('#hlgy_rank1').text(data.scores['合理归因'].rank + '分')

    $('#qxtj_rank').text(data.scores['情绪调节'].rank)
    $('#qxtj_pt').text(data.scores['情绪调节'].pt)
    $('#qxtj_cdf').text(data.scores['情绪调节'].cdf + '%')
    $('#qxtj_desc').text(data.scores['情绪调节'].desc)
    $('#qxtj_pro').css('width', data.scores['情绪调节'].rank + '0%')
    $('#qxtj_rank1').text(data.scores['情绪调节'].rank + '分')

    $('#zzdx_rank').text(data.scores['自主定向'].rank)
    $('#zzdx_pt').text(data.scores['自主定向'].pt)
    $('#zzdx_cdf').text(data.scores['自主定向'].cdf + '%')
    $('#zzdx_desc').text(data.scores['自主定向'].desc)
    $('#zzdx_pro').css('width', data.scores['自主定向'].rank + '0%')
    $('#zzdx_rank1').text(data.scores['自主定向'].rank + '分')

    $('#yyxq_rank').text(data.scores['意义寻求'].rank)
    $('#yyxq_pt').text(data.scores['意义寻求'].pt)
    $('#yyxq_cdf').text(data.scores['意义寻求'].cdf + '%')
    $('#yyxq_desc').text(data.scores['意义寻求'].desc)
    $('#yyxq_pro').css('width', data.scores['意义寻求'].rank + '0%')
    $('#yyxq_rank1').text(data.scores['意义寻求'].rank + '分')

    $('#zztr_rank').text(data.scores['专注投入'].rank)
    $('#zztr_pt').text(data.scores['专注投入'].pt)
    $('#zztr_cdf').text(data.scores['专注投入'].cdf + '%')
    $('#zztr_desc').text(data.scores['专注投入'].desc)
    $('#zztr_pro').css('width', data.scores['专注投入'].rank + '0%')
    $('#zztr_rank1').text(data.scores['专注投入'].rank + '分')

    $('#zwtz_rank').text(data.scores['自我拓展'].rank)
    $('#zwtz_pt').text(data.scores['自我拓展'].pt)
    $('#zwtz_cdf').text(data.scores['自我拓展'].cdf + '%')
    $('#zwtz_desc').text(data.scores['自我拓展'].desc)
    $('#zwtz_pro').css('width', data.scores['自我拓展'].rank + '0%')
    $('#zwtz_rank1').text(data.scores['自我拓展'].rank + '分')

    $('#lhbt_rank').text(data.scores['灵活变通'].rank)
    $('#lhbt_pt').text(data.scores['灵活变通'].pt)
    $('#lhbt_cdf').text(data.scores['灵活变通'].cdf + '%')
    $('#lhbt_desc').text(data.scores['灵活变通'].desc)
    $('#lhbt_pro').css('width', data.scores['灵活变通'].rank + '0%')
    $('#lhbt_rank1').text(data.scores['灵活变通'].rank + '分')

    $('#brcy_rank').text(data.scores['包容差异'].rank)
    $('#brcy_pt').text(data.scores['包容差异'].pt)
    $('#brcy_cdf').text(data.scores['包容差异'].cdf + '%')
    $('#brcy_desc').text(data.scores['包容差异'].desc)
    $('#brcy_pro').css('width', data.scores['包容差异'].rank + '0%')
    $('#brcy_rank1').text(data.scores['包容差异'].rank + '分')

    $('#qhlt_rank').text(data.scores['亲和利他'].rank)
    $('#qhlt_pt').text(data.scores['亲和利他'].pt)
    $('#qhlt_cdf').text(data.scores['亲和利他'].cdf + '%')
    $('#qhlt_desc').text(data.scores['亲和利他'].desc)
    $('#qhlt_pro').css('width', data.scores['亲和利他'].rank + '0%')
    $('#qhlt_rank1').text(data.scores['亲和利他'].rank + '分')

    $('#zwyn_rank').text(data.scores['自我悦纳'].rank)
    $('#zwyn_pt').text(data.scores['自我悦纳'].pt)
    $('#zwyn_cdf').text(data.scores['自我悦纳'].cdf + '%')
    $('#zwyn_desc').text(data.scores['自我悦纳'].desc)
    $('#zwyn_pro').css('width', data.scores['自我悦纳'].rank + '0%')
    $('#zwyn_rank1').text(data.scores['自我悦纳'].rank + '分')

}