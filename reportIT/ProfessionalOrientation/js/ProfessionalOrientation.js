// $.ajax({
//     url: 'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
//     // url: 'http://new.yx.iwedoing.com/api/ws/v1/useroperate/38/notifylist/1/',
//     type: 'PATCH',
//     contentType: 'multipart/form-data',

//     data: {
//         // people_result_id: 636883,
//         is_read: 1
//     },
//     dataType: 'json',
//     success: function (res) {

//         console.log(res)
//     }
// })
// ar[0]={name:1,value:newarr[gongzuoleixing]}

var report = {
    init() {
        this.created();

    },
    people_result_id: null,
    created() {
        let _this = this;
        this.people_result_id = this.GetQueryString('people_result_id');

        $.ajax({
            url: 'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
            // url: 'http://new.iwedoing.com/api/client/v1/front/report/data/',
            type: 'POST',
            data: {
                // people_result_id: 636883,
                people_result_id: this.people_result_id,
                report_type_id: 'CO2019'
            },
            dataType: 'json',
            success: function (res) {

                let data = res;
                // console.log(res)
                if (data.code == 0) {
                    let result = data.detail.report_data.msg;
                    _this.AddDom(result);
                } else {
                    alert('请求数据有误')
                }
            }
        })
    },

    // dealResult(father,data){

    // },
    GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    AddDom(data) {

        $('#Gender').text(data.Gender)
        $('#Name').text(data.Name)
        $('#Testtime').text(data.TestTime)
        $('#Age').text(data.Age)
        console.log(data)
        // 主导职业锚
        let fathA = $('#type_l');
        var MainTypes = data.MainTypes
        for (var i in MainTypes) {
            // console.log(MainTypes[i])
            let p = $('<p id="MainTypes">' + MainTypes[i] + '</p>')
            fathA.append(p)
        }

        // 辅助职业锚
        let fathB = $('#type_r');
        var SubTypes = data.SubTypes
        for (var i in SubTypes) {
            // console.log(SubTypes[i])
            let p = $('<p id="SubTypes">' + SubTypes[i] + '</p>')
            fathB.append(p)
        }

        //创建数据信息
        let dataMainType = [];
        let dataMainRes = [];
        let dataSubType = [];
        let dataSubRes = [];
        //储存数据信息
        $.each(data.Main, function (key, value) {
            dataMainType.push(key)
            dataMainRes.push(value)
        })
        $.each(data.Sub, function (key, value) {
            dataSubType.push(key)
            dataSubRes.push(value)
        })

       
        // console.log(dataMainType,dataMainRes,dataSubType,dataSubRes)
        let fath = $('#trait_list');
        let order =['基本特征','工作类型','薪酬福利','工作晋升','最佳认可方式']
        let ordercontent = new Array();
        
        $.each(dataMainRes[0], function (key, value) {
            if(key==order[0]){
                ordercontent[0]=value
            }else if(key==order[1]){
                ordercontent[1]=value
            }
            else if(key==order[2]){
                ordercontent[2]=value
            }
            else if(key==order[3]){
                ordercontent[3]=value
            }
            else if(key==order[4]){
                ordercontent[4]=value
            }
        })
        //第一循环，拿到JSON对象的的key和value值
        $.each(ordercontent,(key,value)=>{
            let fathDIV = $('<div class="trait_list_a"></div>')
            fath.append(fathDIV);
            //fath.text($('.sheet').length-5)
            let trait_list_name = $('<p class="trait_list_name">' + order[key] + '</p>')
            fathDIV.append(trait_list_name)
            //判断是否为第一列
            if (key != '基本特征') {
                trait_list_name.addClass('sm_title');
            }
            //判断字典类型
            //如果是字符串可以直接渲染
            if (typeof (value) == 'string') {

                let yuandian = $('<p class="yaundian"></p>')
                fathDIV.append(yuandian)
                let wenzi = $('<p class="wenzi">' + value + '</p>')
                fathDIV.append(wenzi)
            } else if (typeof (value) == 'object') {
                //如果数据是对象类型，循环渲染
                $.each(value, function (j, v) {

                    let yuandian = $('<p class="yaundian"></p>')
                    fathDIV.append(yuandian)
                    let wenzi = $('<p class="wenzi">' + v + '</p>')
                    fathDIV.append(wenzi)
                })
            }
        })



        
        //判断是否有多个类型
        if (dataMainRes.length > 1) {
            //创建新的节点
            var newSec = $(`<section class="trait sheet">
        <img src="./img/CO2019_picture02 2.png" alt="">
        <div class="border">
            <div class="content" id="MainTypes">
                <p>您的主导职业锚：<span class="MainName newMainName" id="MainName1"></span></p>
                
                <div class="trait_list " id="new_trait_list"></div>
            </div>
        </div>
        <div class="page"></div>
        
    </section`)
            //在后面添加
            $('.go').after(newSec)
            let fath3 = $('#new_trait_list');
            // console.log(dataMainType[1])
            // console.log($('#MainName1'))
            $('#MainName1').text(dataMainType[1]);
            let order2 =['基本特征','工作类型','薪酬福利','工作晋升','最佳认可方式']
            let ordercontent2 = new Array();

            $.each(dataMainRes[1], function (key, value) {
                if(key==order2[0]){
                    ordercontent2[0]=value
                }else if(key==order2[1]){
                    ordercontent2[1]=value
                }
                else if(key==order2[2]){
                    ordercontent2[2]=value
                }
                else if(key==order2[3]){
                    ordercontent2[3]=value
                }
                else if(key==order2[4]){
                    ordercontent2[4]=value
                }
            })
            $.each(ordercontent2, function (key, value) {
                let fathDIV = $('<div class="trait_list_b"></div>')
                fath3.append(fathDIV);
                //第二次循环，拿到字典里面的标题和内容
                let trait_list_name = $('<p class="trait_list_name ">' + order2[key] + '</p>')
                fathDIV.append(trait_list_name)
                //判断是否为第一列
                if (key != '基本特征') {
                    trait_list_name.addClass('sm_title');
                }
                //判断字典类型
                //如果是字符串可以直接渲染
                if (typeof (value) == 'string') {

                    let yuandian = $('<p class="yaundian"></p>')
                    fathDIV.append(yuandian)
                    let wenzi = $('<p class="wenzi">' + value + '</p>')
                    fathDIV.append(wenzi)
                } else if (typeof (value) == 'object') {
                    //如果数据是对象类型，循环渲染
                    $.each(value, function (j, v) {
    
                        let yuandian = $('<p class="yaundian"></p>')
                        fathDIV.append(yuandian)
                        let wenzi = $('<p class="wenzi">' + v + '</p>')
                        fathDIV.append(wenzi)
                    })
                }

            })
        }



        let fath2 = $('#trait_list_two');
        let order3 =['基本特征','工作类型','薪酬福利','工作晋升','最佳认可方式']
        let ordercontent3 = new Array();
        
        $.each(dataSubRes[0], function (key, value) {
            console.log(key,key==order3[2],order3[2])
            if(key==order3[0]){
                ordercontent3[0]=value
            }else if(key==order3[1]){
                ordercontent3[1]=value
            }
            else if(key==order3[2]){
                console.log(value)
                ordercontent3[2]=value
            }
            else if(key==order3[3]){
                ordercontent3[3]=value
            }
            else if(key==order3[4]){
                ordercontent3[4]=value
            }
        })
        console.log(ordercontent3)
        console.log(ordercontent3[2])
        //第一循环，拿到JSON对象的的key和value值
        $.each(ordercontent3, function (key, value) {
            let fathDIV = $('<div class="trait_list_c"></div>')
            fath2.append(fathDIV);

            let trait_list_name = $('<p class="trait_list_name">' + order3[key] + '</p>')
            fathDIV.append(trait_list_name)
            //判断是否为第一列
            if (key != '基本特征') {
                trait_list_name.addClass('sm_title');
            }
            //判断字典类型
            //如果是字符串可以直接渲染
            if (typeof (value) == 'string') {
                // console.log('sdfsdfd')
                
                let yuandian = $('<p class="yaundian"></p>')
                fathDIV.append(yuandian)
                let wenzi = $('<p class="wenzi">' + value + '</p>')
                fathDIV.append(wenzi)
            } else if (typeof (value) == 'object') {
                //如果数据是对象类型，循环渲染
                $.each(value, function (j, v) {

                    let yuandian = $('<p class="yaundian"></p>')
                    fathDIV.append(yuandian)
                    let wenzi = $('<p class="wenzi">' + v + '</p>')
                    fathDIV.append(wenzi)
                })
            }

        })
        if (dataSubRes.length > 1) {
            var newSec = $(`<section class="trait sheet">
        <img src="./img/CO2019_picture02 2.png" alt="">
        <div class="border">
            <div class="content" id="MainTypes">
                <p>您的辅导职业锚：<span class="MainName" id='MainName2'></span></p>
                
                <div class="trait_list " id="new_trait_list2"></div>
            </div>
        </div>
        <div class="page"></div>
        
    </section`)
            $('.go2').after(newSec)
            let fath4 = $('#new_trait_list2');

            // console.log(dataSubRes)
            $('#MainName2').text(dataSubType[1]);
            let order4 =['基本特征','工作类型','薪酬福利','工作晋升','最佳认可方式']
            // let order44 = ['基本特征','工作类型','薪酬福利','工作晋升','最佳认可方式']
            let ordercontent4 = new Array();
            
            $.each(dataSubRes[1], function (key, value) {
                if(key==order4[0]){
                    ordercontent4[0]=value
                }else if(key==order4[1]){
                    ordercontent4[1]=value
                }
                else if(key==order4[2]){
                    ordercontent4[2]=value
                }
                else if(key==order4[3]){
                    ordercontent4[3]=value
                }
                else if(key==order4[4]){
                    ordercontent4[4]=value
                }
            })


            $.each(ordercontent4, function (key, value) {
                let fathDIV = $('<div class="trait_list_d"></div>')
                fath4.append(fathDIV);
                //第二次循环，拿到字典里面的标题和内容
                let trait_list_name = $('<p class="trait_list_name ">' + order4[key] + '</p>')
                fathDIV.append(trait_list_name)
                //判断是否为第一列
                if (key != '基本特征') {
                    trait_list_name.addClass('sm_title');
                }
                //判断字典类型
                //如果是字符串可以直接渲染
                if (typeof (value) == 'string') {

                    let yuandian = $('<p class="yaundian"></p>')
                    fathDIV.append(yuandian)
                    let wenzi = $('<p class="wenzi">' + value + '</p>')
                    fathDIV.append(wenzi)
                } else if (typeof (value) == 'object') {
                    //如果数据是对象类型，循环渲染
                    $.each(value, function (j, v) {

                        let yuandian = $('<p class="yaundian"></p>')
                        fathDIV.append(yuandian)
                        let wenzi = $('<p class="wenzi">' + v + '</p>')
                        fathDIV.append(wenzi)
                    })
                }

            })
        }

        $('#MainName').text(dataMainType[0])
        $('#MainName3').text(dataSubType[0])

        if ($('.sheet').length == 9) {
            $.each($('.sheet'), (key, index) => {
                if (key > 3 && key < 9) {
                    $('.sheet').eq(key).children('.page').text("第" + (key - 1) + "页")

                }
            })
        } else if ($('.sheet').length == 7) {
            $.each($('.sheet'), (key, index) => {
                if (key > 3 && key < 7) {
                    $('.sheet').eq(key).children('.page').text("第" + (key - 1) + "页")

                }
            })
        } else if ($('.sheet').length == 8) {
            $.each($('.sheet'), (key, index) => {
                if (key > 3 && key < 8) {
                    $('.sheet').eq(key).children('.page').text("第" + (key - 1) + "页")

                }
            })
        }




        //图标数据
        var option = {
            dataName: [],
            data: []
        }
        for (var i of data.Score) {
            option.dataName.push(i[0]);
            option.data.push(i[1]);
        }

        this.AddEchart(option);
    },
    AddEchart(data) {

        let newData = data.data.reverse();
        let newData2 = [];

        $.each(newData, (i, item) => {
            newData2.push(30 - item)
        })

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: ''
                }
            },
            detail: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                }
            },
            grid: {
                left: "20%"
            },
            animation: false,
            xAxis: [
                {
                    type: 'value',
                    scale: true,
                    show: false,
                    splitLine: {
                        show: false
                    },
                    min: 0,
                    textStyle: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 26
                    }

                }
            ],
            yAxis: [{
                splitLine: {
                    show: false
                },
                "axisTick": {       //y轴刻度线
                    "show": false
                }, "axisLine": {       //y轴
                    "show": false

                },
                data: data.dataName.reverse(),
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontWeight: 'bold'
                    }
                }
            }],


            series: [
                {
                    barCategoryGap: '30%',
                    name: '总量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#1DE9B6'
                            }, {
                                offset: 1,
                                color: '#1DC4E9'
                            }]), label: {
                                show: true,     //开启显示
                                position: 'insideRight',
                                textStyle: {     //数值样式
                                    color: '#333333',
                                    fontSize: 16
                                }
                            }
                        }
                    },
                    data: newData
                },
                {
                    name: '总量',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#D8D8D8'
                        }
                    },
                    data: newData2
                },

            ]

        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}

report.init();
