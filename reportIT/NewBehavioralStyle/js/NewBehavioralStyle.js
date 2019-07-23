function GetQueryString(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = ""; 
    if (r != null) 
        context = r[2]; 
    reg = null; 
    r = null; 
    return context == null || context == "" || context == "undefined" ? "" : context; 
}

let people_result_id= this.GetQueryString('people_result_id');

$.ajax({
    url: 'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
    // url:'http://new.iwedoing.com/api/client/v1/front/report/data/',
    type: 'POST',
    data: {
        // people_result_id:30255,
        people_result_id: people_result_id,
        report_type_id: 'NewBehavioralStyle'
    },
    dataType: 'json',
    success: function (res) {

        let data = res;
        
        if (data.code == 0) {
            let result = data.detail.report_data.msg;
            AddDom(result)
            //_this.AddDom(result);
        } else {
            alert('请求数据有误')
        }
    }
})

function AddDom(data) {

    $('#Name').text(data.personal.Name)
    $('#Age').text(data.personal.Age)
    $('#Sex').text(data.personal.Sex)
    $('#TestTime').text(data.personal.TestTime)
    $('#l_scorew').text(data.score.l_score[0])
    $('#l_scoreg').text(data.score.l_score[1])
    $('#l_scores').text(data.score.l_score[2])
    $('#l_scorep').text(data.score.l_score[3])

    $('#r_scorew').text(data.score.r_score[0])
    $('#r_scoreg').text(data.score.r_score[1])
    $('#r_scores').text(data.score.r_score[2])
    $('#r_scorep').text(data.score.r_score[3])

    $('#TypeName').text(data.style.content)
    
    $('#type_title').text(data.style.characteristics)

    // val = $("#l_scorew")
    // val.style.width = data.score.l_score[0]

    
    $('#l_scorew').css('width',data.score.l_score[0]+'%')
    $('#l_scoreg').css('width',data.score.l_score[1]+'%')
    $('#l_scores').css('width',data.score.l_score[2]+'%')
    $('#l_scorep').css('width',data.score.l_score[3]+'%')

    $('#r_scorew').css('width',data.score.r_score[0]+'%')
    $('#r_scoreg').css('width',data.score.r_score[1]+'%')
    $('#r_scores').css('width',data.score.r_score[2]+'%')
    $('#r_scorep').css('width',data.score.r_score[3]+'%')
   

    let TypeArr = [];
    for (var i = 0; i < data.style.characteristics.length; i++) {

        TypeArr.push(data.style.characteristics[i])
    }

    if (TypeArr[0] == 'E') {
        $('.letter').eq(0).addClass('blue')
        $('.letter').eq(1).addClass('gray')
    } else {
        $('.letter').eq(1).addClass('blue')
        $('.letter').eq(0).addClass('gray')
    }

    if (TypeArr[1] == 'S') {
        $('.letter').eq(2).addClass('blue')
        $('.letter').eq(3).addClass('gray')
    } else {
        $('.letter').eq(3).addClass('blue')
        $('.letter').eq(2).addClass('gray')
    }

    if (TypeArr[2] == 'T') {
        $('.letter').eq(4).addClass('blue')
        $('.letter').eq(5).addClass('gray')
    } else {
        $('.letter').eq(5).addClass('blue')
        $('.letter').eq(4).addClass('gray')
    }


    if (TypeArr[3] == 'J') {
        $('.letter').eq(6).addClass('blue')
        $('.letter').eq(7).addClass('gray')
    } else {
        $('.letter').eq(7).addClass('blue')
        $('.letter').eq(6).addClass('gray')
    }

    let fath = $('#jiben');
    $.each(data.style.blindness, function (key, value) {
        let yuandian = $('<p class="yuandian"></p>')
        fath.append(yuandian)
        let wenzi = $('<p class="wenzi">' + value + '</p>')
        fath.append(wenzi)

    })

    let fath2 = $('#mangdian');
    $.each(data.style.description, function (key, value) {
        let yuandian = $('<p class="yuandian"></p>')
        fath2.append(yuandian)
        let wenzi = $('<p class="wenzi">' + value + '</p>')
        fath2.append(wenzi)

    })

}