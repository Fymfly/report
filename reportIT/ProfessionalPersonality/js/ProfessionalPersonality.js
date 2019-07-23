 
    let start= {
        init:function(){
            this.resquest();
        },
        people_result_id:null,
        resquest:function(){
            
            let _this = this;
            this.people_result_id= this.GetQueryString('people_result_id');
            $.ajax({
                url:'http://admin.yx.iwedoing.com/api/client/v1/front/report/data/',
                // url:'http://new.iwedoing.com/api/client/v1/front/report/data/',
                type:'POST',
                data:{
                    people_result_id: this.people_result_id,
                    // people_result_id:633523,
                    report_type_id:'DISC_NEW'
                },
                dataType:'json',
                success:function(res){
                    let data =res;
                    // console.log(res)
                    if(data.code==0){
                        let data = res.detail.report_data
                        _this.AddDom(data);
                    }else{
                        alert('请求数据有误')
                    }
                }
            })
        },
        GetQueryString(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = ""; 
            if (r != null) 
                context = r[2]; 
            reg = null; 
            r = null; 
            return context == null || context == "" || context == "undefined" ? "" : context; 
        },
        AddDom(data){
            // console.log(data.disc)
            this.sampleCharts(data.msg.ChartSelfImage_Indicator);
            this.maskwork(data.msg.ChartWorkMask_Indicator);
            this.selfIm(data.msg.ChartSelfImage_Indicator);
            this.anti(data.msg.ChartBR_UnderStress_Indicator);
            $('#Gender').text(data.msg.Sex)
            $('#Name').text(data.msg.Name)
            $('#Testtime').text(data.msg.CompleteTime)
            $('#Age').text(data.msg.Age)
            $('.feature_char').eq(0).text(data.disc.ChartSelfImage_Indicator[0])
            $('.sample_char').eq(0).text(data.disc.ChartSelfImage_Indicator[1][1])
            $('.sample_char').eq(1).text(data.disc.ChartSelfImage_Indicator[1][3])
            $('.sample_char').eq(2).text(data.disc.ChartSelfImage_Indicator[1][5])
            // console.log(data.disc.ChartWorkMask_Indicator.hasOwnProperty("下移位"))
            if(data.disc.ChartWorkMask_Indicator.hasOwnProperty("下移位")){

            }
            $.each(data.disc.ChartSelfImage_Indicator,(key,value)=>{
                if(value=='下移位'){
                    $('.charFlag').css('display','none')
                }else if(value=='上移位'){
                    $('.charFlag').css('display','node')
                }
            })

            $.each(data.msg.ChartSelfImage_Indicator,(index,res)=>{
                $('.sample_table_title').eq(index).text(res.name)
                $('.sample_table_char').eq(index).text(res.score)
            })
           
        },
        CraetenewArr:function(arr){
            let data={
                arr:[],
                ave:0,
                to:0,
                from:0
            }
            arr.map(item=>{
                data.arr.push(item.finally)
                data.ave += item.finally
            })
            var max = Math.max.apply(null, data.arr);
            var min = Math.min.apply(null, data.arr)
            data.ave = Number((max+min)/2).toFixed(2)
            data.to =  (Number(data.ave)+2).toFixed(2)
            data.from =  (Number(data.ave)-2).toFixed(2)
            return data
        },
        anti:function(res){
            let arr = this.CraetenewArr(res)
           
            $.each(res,(key,item)=>{   
                $('.leading_item_table_char2').eq(key).text(item.score)
            })
            let Data = {
                title: {
                    text: null
                },
                chart:{
                    backgroundColor:'#F3F4F6',
                    animation: false
                },
                yAxis: { //y坐标
                    title:{
                        text:''
                    },
                    tickPositions: [0, 29],
                    gridLineWidth: 1,   
                    labels: {
                        enabled: false
                    },
                    gridLineDashStyle: 'longdash', 
                    plotLines:[{
                        color:'#333',            //线的颜色，定义为红色
                        dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                        value:14.5,               //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1                 //标示线的宽度，2px
                    }],
                    plotBands: [{
                        from: 16.5,
                        to: 12.5,
                        color: 'rgba(68, 170, 213, 0.2)',
                        
                    }]
                },
                legend:{
                    enabled:false
                },
                xAxis: {
                    categories: ['D', 'I', 'S', 'C'],  
                    tickPixelInterval: 'on',
                
                },
                plotOptions: {
                    series: {
                    animation: false
                    }
                },
                series: [{ //图表数据
                name: '职业特征值',
                data:arr.arr,
                
                }],
                credits: { //去掉版权logo
                enabled: false
                }
            }
            Highcharts.chart(document.querySelector('#ChartBR_UnderStress_Indicator'), Data);
        },
        selfIm:function(res){
            let arr = this.CraetenewArr(res)
            // console.log(arr)
            $.each(res,(key,item)=>{   
                $('.leading_item_table_char3').eq(key).text(item.score)
            })
            
            let Data = {
                title: {
                    text: null
                },
                chart:{
                    backgroundColor:'#F3F4F6',
                    animation: false
                },
                yAxis: { //y坐标
                    title:{
                        text:''
                    },
                    tickPositions: [0, 29],
                    labels: {
                        enabled: false
                    },
                    gridLineWidth: 1,   
                    gridLineDashStyle: 'longdash', 
                    plotLines:[{
                        color:'#333',            //线的颜色，定义为红色
                        dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                        value:14.5,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1                 //标示线的宽度，2px
                    }],
                    plotBands: [{
                        from: 16.5,
                        to: 12.5,
                        color: 'rgba(68, 170, 213, 0.2)',
                        
                    }]
                },
                legend:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                    animation: false
                    }
                },
                xAxis: {
                    categories: ['D', 'I', 'S', 'C'],  
                    tickPixelInterval: 'on',
                
                },
                series: [{ //图表数据
                name: '职业特征值',
                data:arr.arr,
                
                }],
                credits: { //去掉版权logo
                enabled: false
                }
            }
            Highcharts.chart(document.querySelector('#ChartSelfImage_Indicator'), Data);
        },
        maskwork:function(res){
            let arr = this.CraetenewArr(res)
            $.each(res,(key,item)=>{   
                $('.leading_item_table_char1').eq(key).text(item.score)
            })
            let Data = {
                title: {
                    text: null
                },
                chart:{
                    backgroundColor:'#F3F4F6',
                    animation: false
                },
                yAxis: { //y坐标
                    title:{
                        text:''
                    },
                    labels: {
                        enabled: false
                    },
                    tickPositions: [0, 29],
                    gridLineWidth: 1,  
                    gridLineDashStyle: 'longdash', 
                    plotLines:[{
                        color:'#333',            //线的颜色，定义为红色
                        dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                        value:14.5,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1                 //标示线的宽度，2px
                    }],
                    plotBands: [{
                        from: 16.5,
                        to: 12.5,
                        color: 'rgba(68, 170, 213, 0.2)',
                        
                    }]
                },
                legend:{
                    enabled:false
                },
                xAxis: {
                    categories: ['D', 'I', 'S', 'C'],  
                    tickPixelInterval: 'on',
                
                },
                plotOptions: {
                    series: {
                    animation: false
                    }
                },
                series: [{ //图表数据
                name: '职业特征值',
                data:arr.arr,
                
                }],
                credits: { //去掉版权logo
                enabled: false
                }
            }
            Highcharts.chart(document.querySelector('#ChartWorkMask_Indicator'), Data);
        },
        sampleCharts:function(res){
           
            let arr = this.CraetenewArr(res);
            // console.log(arr)
            let Data = {
                title: {
                    text: null
                },
                chart:{
                    backgroundColor:'#F3F4F6',
                },
                yAxis: { //y坐标
                    title:{
                        text:''
                    },
                    labels: {
                        enabled: false
                    },
                    tickPositions: [0, 29],
                    gridLineWidth: 1,   
                    gridLineDashStyle: 'longdash', 
                    plotLines:[{
                        color:'#333',            //线的颜色，定义为红色
                        dashStyle:'longdashdot',//标示线的样式，默认是solid（实线），这里定义为长虚线
                        value:14.5,                //定义在哪个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                        width:1                 //标示线的宽度，2px
                    }],
                    plotBands: [{
                        from: 16.5,
                        to: 12.5,
                        color: 'rgba(68, 170, 213, 0.2)',
                        
                    }]
                },
                legend:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                    animation: false
                    }
                },
                xAxis: {
                    categories: ['D', 'I', 'S', 'C'],  
                    tickPixelInterval: 'on',
                
                },
                series: [{ //图表数据
                name: '职业特征值',
                data:arr.arr,
                
                }],
                credits: { //去掉版权logo
                enabled: false
                }
            }
            Highcharts.chart(document.querySelector('#sample_charts'), Data);
        },
    }
    start.init();