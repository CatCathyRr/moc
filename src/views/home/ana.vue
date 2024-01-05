<template>

  <div style="padding: 20px 20px ;background-color: #EBEBEB;height: 178vh;">
<div class="chart-con" style="font-family: VolvoNovum-Regular;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center ; height: fit-content;">

      <div style="padding-top: 5px">
        <h3> {{ $t('analysispage.ph') }}</h3>
      </div>
</div>

<div  style="margin-top: 20px;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center; height: fit-content;">
  <!-- 选择烘房 -->
  <div  style=" text-align: center">
    <div style="padding: 5px 30px; display: flex; justify-content: center">
      <div v-for="(item,index) in state.ovenlist">
      <span style="width: 80px; font-size: 17px;"  :key="item.id" :class="0==index ? 'activeClass' : 'noactiveClass' " :id="item.id" @click="changeOvenData(item.oven_type)">
        {{item.oven_type}}
      </span>
      <van-divider vertical  style="color: white;border: white;height: 10px;"/> 
    </div>
    </div>
 
  </div>

<!-- 成功上线了多少天 -->
<div v-if="state.selectedOven.online == '1'">
<div >
  <span>{{ $t('analysispage.glfxd') }} </span>
  <span style='color: green; font-weight: 800;' >{{ state.historydays.OnlineDays }}</span> 
  <span> {{ $t('unit.day') }} </span>
</div>
<div >
  <span >{{ $t('analysispage.pfd') }} </span>
  <span style='color: green;; font-weight: 800;'>{{ state.historydays.SuccessPreDays }}</span> 
  <span> {{ $t('unit.day') }}</span>
</div>
</div>

</div>


<div v-if="state.selectedOven.online == '1'" style="margin-top: 20px;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center; height: fit-content;">
  
  <!-- 选择日期区间 -->
  <div  style=";text-align: left;margin-bottom: 5px;padding: 10px;">· {{ $t('analysispage.choose') }}</div>
  <van-cell v-if="state.selectedOven.online == '1'" center is-link
  style="width:100%; margin-bottom: 30px;;background-color: #EBEBEB;padding:10px 10px;border-radius: 5px"

  arrow-direction="down"
  icon="notes-o"
   @click="state.calendar.show = true " >
    {{ state.calendar.dateformat }}
  </van-cell>


  <div style=";margin: 20px;">
    <div style="padding:5px; color: #1c6bba;font-weight: 600;">----- {{ $t('analysispage.pi') }}-----</div>
  </div>

  <!-- kpi 列表 -->
<table v-if="state.selectedOven.online == '1'" style="height: fit-content ;">
 

<tr class="odd" >
<td  style=" width: 30%; font-size: 15px;text-align: left;"> {{ $t('analysispage.kpi1') }}</td>
<td style=" width: 20%;color: #000000;padding: 10px;text-align: right;">{{ state.historykpi.AvgDiff }} {{ $t('unit.min') }}</td>
</tr>
</table>

  <!-- 柱状图 -->
<div v-if="state.selectedOven.online == '1'" style="height: 180px;width: 100%;" :id="state.elementid">
</div>

<table v-if="state.selectedOven.online == '1'" style="height: fit-content ;">
<tr class="odd">
<td  style=" width: 30%; font-size: 15px;text-align: left;">{{ $t('analysispage.kpi2') }}</td>
<td style=" width:20%;color: #000000;padding: 10px;text-align: right;">{{ state.historykpi.SavingTimeinTotal }} {{ $t('unit.min') }}</td>
</tr>

<tr class="odd">
<td  style=" width: 30%; font-size: 15px;text-align: left;">{{ $t('analysispage.kpi3') }}</td>
<td style=" width: 20%;color: #000000;padding: 10px;text-align: right;">{{ state.historykpi.Accept}}</td>
</tr>

<tr class="odd">
<td  style=" width: 30%; font-size: 15px;text-align: left;">{{ $t('analysispage.kpi4') }}</td>
<td style=" width: 20%;color: #000000;padding: 10px;text-align: right;">{{ state.historykpi.ErrorRatio }}</td>
</tr>
</table>


 
<!-- 详细表格 -->

  <div v-if="state.selectedOven.online == '1'" style="padding-top: 40px; text-align: center;">
  <div style="margin: 20px;">
  <div style="padding:5px;color:#1c6bba;font-weight: 600; ">----- {{ $t('analysispage.pd') }} -----</div>
</div>

<!-- 表格标题 -->
    <table>
       <tr class="odd"  style="font-size: 0.8rem;color: #000000; border-bottom: #949292 ;"> 

      <td  style=" width: 20%; text-align: center;">
        {{ $t('analysispage.date') }}
      </td>

      <td style=" width: 20%;;padding: 10px;text-align: right;padding-right: 4%;">
       {{ $t('analysispage.diff') }}
      </td>

      <td style=" width: 24%;padding: 10px;text-align: right;padding-right: 2%;">
        {{ $t('analysispage.st') }}
      </td>

      <td style=" width: 20%;padding: 10px;">
        {{ $t('analysispage.accept') }}
      </td>

      <td style=" width: 18%;padding: 10px;">
        {{ $t('predict.more') }}
      </td>
      </tr>
    </table>

<!-- 表格内容 -->
    <div id="scroll" style="height:38vh ;padding:0;display:flexbox;  overflow:scroll;">
      <table  >
        <tr class="odd" v-for="(item, index) in state.historyplan" :key="index">

        <!-- 内容第一列：date -->
          <td  style=" width: 13%; font-size: 14px;padding: 0;text-align: center;">{{ item.Date }}</td>

        <!-- 内容第二列: diff -->
          <td v-if="item.MDiff > 10 || item.MDiff < -10 " style="font-size: 14px; width: 10%;padding: 0;color:red;">
            {{ item.MDiff }}
          </td>
          <td v-else-if="item.MDiff <= 10 && item.MDiff >= -10" style="font-size: 14px;padding: 0; width: 10%;color: green;">
            {{ item.MDiff }}
          </td>
          <td v-else style="font-size: 14px; width: 10%;color: green;">
            {{ item.MDiff }}
          </td>

       <!-- 内容第三列: timesaving -->
          <td style="font-size: 14px; width: 10%;color: #000000;text-align: right;">
           {{ item.Saving_Time }}
          </td>

      <!-- 内容第四列: accept-->
          <td v-if="item.Accept == 1" style="font-size: 14px; width: 14%;color: green;text-align: right;padding-right: 6%;">
            <!-- {{ item.Accept }} -->
         
            <check-small theme="outline" size="16"  :strokeWidth="2" />
          </td>
          <td v-else-if="item.Accept == 0" style="font-size: 14px; width: 14%;color: red;text-align: right;padding-right: 6%;">
            <!-- {{ item.Accept }} -->
            <close-small theme="outline" size="16" :strokeWidth="2" />
           
          </td>
          <td v-else="item.Accept == 0" style="font-size: 14px; width: 14%;color: #000000;text-align: right;padding-right: 6%;">
            <!-- {{ item.Accept }} -->
           
           
          </td>

      <!-- 内容第二列: more -->
          <td style=" width: 0%;color: #000000;text-align: right;">
           <button class= "more" @click="detailitem(index) ">
            <more theme="outline" size="20" :strokeWidth="2" />
          </button>
          </td>
        </tr>

      </table>
  
  </div>
  </div>
</div>

<!-- download -->
<!-- <div class="card" v-if="state.selectedOven.online == '1'" style="margin-top: 20px;padding: 16px;border-radius: 5px;color: #000000; text-align: center; height: fit-content;"> -->
  <!-- <div class="cardinside" >
  <div class="content">
    <span class="title">Good News Here!</span>
    <div class="desc">This report is now available for download.</div>
    <div class="actions">
      <div>
        <a class="download" @click="download()">Download</a>
      </div>
      <div>
        <a class="notnow" @click="download()">Send to My Email</a>
      </div>
    </div>
  </div>
</div> -->

  <!-- <div class="form" style="width: 100%;">
    <input placeholder="Enter your CDSID" type="email" name="email" id="email-address">
    <button type="submit">Subscribe</button>
  </div> -->

  
<!-- </div> -->
</div>



<!-- 从下方弹出时间选择 -->
<van-popup v-model:show="state.showtime" round position="bottom"  >
      <van-time-picker
        type="datetime"
        :title="$t('input.timechoose')"
        @confirm="onConfirmtime"
        :confirm-button-text="$t('input.confirm')"
        @cancel="state.showtime = false"
        :cancel-button-text="$t('input.cancel')"
        
      />
</van-popup>

<!-- 更多信息 -->
<van-dialog
     :title=state.dialogdeletetitle
      v-bind:show= state.showdetaildia
      :beforeClose="beforeClose"
    >
</van-dialog>

<van-calendar safe-area-inset-bottom
  class="calendar"
  v-bind:show= state.calendar.show  
  ref = calendar
  :formatter = formatterCalendar
  :show-title="true"
  :show-subtitle="false"
  color="#7089ac"
  :allow-same-day="true"
  v-bind:max-date= state.calendar.maxdate
  v-bind:min-date= state.calendar.mindate
  :confirm-disabled-text="$t('input.confirm')"
  :confirm-text="$t('input.confirm')"
  :default-date= state.calendar.default
  type="range"
  @close="onClose" 
  @confirm="onConfirm"
   >
   <template #title>
        <div class="calendar-top">

          <div class="calendar-top-time">
             
          </div>
          <div >
            {{ $t('analysispage.ct') }}
          </div>
        </div>
      </template>
  </van-calendar>


</template>



<script lang="ts" setup name="HomePage">
  import { useOvenListStore } from '@/store/modules/ovenlist';
  import {  useHistoryListStore } from '@/store/modules/history';
  import { Calendar, showToast,showDialog } from 'vant';
  import { useI18n } from 'vue-i18n';
  import { Locale } from 'vant';
  import enUS from 'vant/es/locale/lang/en-US';
  import zhCN from 'vant/es/locale/lang/zh-CN';
 import { More,CloseSmall,CheckSmall, } from '@icon-park/vue-next';
 import * as echarts from 'echarts';
  const { t,locale } = useI18n();

  if(locale.value  == 'en-us' ){
    Locale.use('en-US', enUS);
  }else{
    Locale.use('zh-CN',zhCN);
  } 


 
  const state= reactive(
      {
        calendar:{
          show:false,
          dateformat:'',
          maxdate: new Date,
          mindate: new Date(2023, 7, 1),
          default:timeInterval(),
          start:'',
          end:''
        },
        ovenlist:[], //烘房列表

        dialogdeletetitle:'',
     
        selectedOven: {   //被选中的烘房
          en:'',
          cn:'',
          type:'EDO',
          defaulttime:'',
          online:'1'
        },

        historyplan:[],
        historyline:[],  
        historykpi:{},
        historydays:{},
        elementid :"linechart",
        valuelist:[],
        datelist:[],
        taglist:[],
        reasonlist:[],
       
      }
    );





  const monthtoday = new Date ().getMonth() + 1;
  const daytoday = new Date ().getDate();

  const formatterCalendar = (day) =>{
    const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      if (month === monthtoday) {
         if (date ===daytoday) {
          day.text = t('analysispage.today');
        }
      }
      if (day.type === 'start') {
        day.bottomInfo = t('analysispage.start');
      } else if (day.type === 'end') {
        day.bottomInfo = t('analysispage.end');
      }
      return day;
  } 


  //设置日历默认值
  const defaultrange = timeInterval()
  const start = formatRangeDate(defaultrange[0]);
  state.calendar.start = formatInputRangeDate(defaultrange[0]);
 
  
  const end = formatRangeDate(defaultrange[1]);
  state.calendar.end = formatInputRangeDate(defaultrange[1]);
  state.calendar.dateformat=`${start} - ${end}`;


//表格中更多按钮
const detailitem = (index: number ) => {
    const info = state.historyplan[index]

    var infoShow = Object.entries(info)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    var sections = infoShow.split('\n');

    sections.splice(0, 0,  t('analysispage.info1'));
    sections.splice(5, 0, '');
    sections.splice(6, 0, t('analysispage.info2'));
    sections.splice(-5, 0, '');
    sections.splice(-5, 0, t('analysispage.info3'));

    // Join the sections back together with line breaks
    var formattedInfo = sections.join('\n');

        showDialog({
          title:  t('analysispage.infotitle'),
          message: formattedInfo,
          width: '440px',
          messageAlign:'left',
          confirmButtonText: t('btn.confirm'),
          
        });

  };

//更多按钮后的弹窗事件
const  beforeClose  = async (action: any) => { 
                state.showdetaildia=false ;

        }





//异步调用：从store获得每个烘房的信息
async function fetchOven() {
  
  const resList= useOvenListStore()
  await resList.run();
  state.ovenlist = resList.getOvenList;

//取出默认烘房：  EDO 
  state.selectedOven.type =  state.ovenlist[0]["oven_type"]    
}

//异步调用：从store获得对应烘房的生产计划
async function getHistoryData(ovenType,start,end){
  // console.log(`当前的烘房是${ovenType}`);
  //从store取得每个烘房的生产数据
  const historylist= useHistoryListStore();
  await historylist.runHistory(ovenType,start,end);
  const plan = historylist.getHistoryList; 

  state.historyplan= plan; 

  state.historyplan.forEach(function(item) {
  // 将日期字符串转换为 Date 对象
  var date = new Date(item.Date);

  // 获取年份的后两位
  var twoDigitYear = date.getFullYear() % 100;

  // 获取月份和日期的两位数格式
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);

  // 更新对象中的日期属性
  item.Date = twoDigitYear + '-' + month + '-' + day;
});
  
 // Echart 中的Tooltip 数据源
  state.historyline = plan.map(item => ({ "Date": item.Date, "MDiff": item.MDiff ,"Accept":item.Accept, "Reason_Cn":item.Reason_Cn ,"Reason_En":item.Reason_En })).filter(item => item.MDiff !== null);
  state.historyline.reverse();
 
  state.datelist = state.historyline.map(function (item) {
  return item.Date;
  });
  state.valuelist  = state.historyline.map(function (item) {
  return item.MDiff;
});
  state.taglist = state.historyline.map(function (item) {
  return item.Accept;
  });

  if (locale.value == 'zh-cn') {
    state.reasonlist =   state.historyline.map(function (item) {
  return item.Reason_Cn;
  })
  } else {
    state.reasonlist =   state.historyline.map(function (item) {
  return item.Reason_En;
  })}

  LaunchChart(state.elementid);

}

async function getHistoryKPI(ovenType,start,end){
  //从store取得每个烘房的生产数据
  const historylist= useHistoryListStore();
  await historylist.runHistoryKpi(ovenType,start,end);
  const plan = historylist.getHistoryKpi; 
  console.log(plan);
  state.historykpi= plan; 
  }

async function getHistoryDays(ovenType){
  //从store取得每个烘房的生产数据
  const historylist= useHistoryListStore();
  await historylist.runHistoryDays(ovenType);
  const plan = historylist.getHistoryDays; 
  console.log(plan);
  state.historydays= plan; 

  }

// 导航栏: 点击更改颜色
function changeColor(div_id){
  for(var k in state.ovenlist){
    
    const divElement = document.getElementById(state.ovenlist[k]["id"]);
    console.log(divElement);
    
    
    if(state.ovenlist[k]["id"] == div_id){
      // 设置div的字体颜色
      divElement.style.color = '#1c6bba';
      divElement.style.backgroundColor= '#ced9e5';
    }else{
      divElement.style.color = '#ababab';
      divElement.style.backgroundColor= '#ffffff';
    }
  }
}


//默认时间区间：当月第一天 - 今天
function timeInterval() {

  // console.log(state.historydays);
      // const [year, month, day] = state.historydays["StartDate"].split('-').map(Number);
      // let new_year = new Date().getFullYear();
      // let new_month = new Date().getMonth() + 1;
      let start = new Date(2023, 1, 1); //取当年当月中的第一天
      let end = new Date(); //取最后一天
      console.log([start,end]);
      return [start, end];    
    }

function onClose(){
  state.calendar.show = false
}

function onConfirm( selectedValues){
  // const [start, end] = event.detail;

  console.log(new Date);
  const start = formatRangeDate(selectedValues[0]);
  const end = formatRangeDate(selectedValues[1]);
  state.calendar.start = formatInputRangeDate(selectedValues[0]);
  state.calendar.end = formatInputRangeDate(selectedValues[1]);
  state.calendar.dateformat=`${start} - ${end}`;
  state.calendar.show = false;
  state.calendar.default = selectedValues;
  getHistoryData(state.selectedOven.type, state.calendar.start,state.calendar.end);
  getHistoryKPI(state.selectedOven.type, state.calendar.start,state.calendar.end);
}


function formatRangeDate(dateinput) {
  const year = dateinput.getFullYear();
  const month = ('0' + (dateinput.getMonth() + 1)).slice(-2);
  const day = ('0' + dateinput.getDate()).slice(-2);
  const date =  year+'/' + month +'/'+ day;
  return date
};

function formatInputRangeDate(dateinput) {
  const year = dateinput.getFullYear();
  const month = ('0' + (dateinput.getMonth() + 1)).slice(-2);
  const day = ('0' + dateinput.getDate()).slice(-2);
  const date =  year+'-' + month +'-'+ day + ' 00:00:00';
  return date
};


function LaunchChart (id) {
  const chartdom = document.getElementById(id)
  var myChart = echarts.init(chartdom);
  var option;
  option = {

      title: 
        {
          left: 'center',
        }
      ,
      grid:
        {
        containLabel:true,
        top:'10%',
        left: '5%',
        right: '5%',
        bottom: '10%'
        },
      tooltip: 
        {
          trigger: 'axis',
          formatter: function (params) {
            var tooltipContent = '';
            var index = params[0].dataIndex;
            var tag = state.taglist[index];
            var reason=state.reasonlist[index];
            var reasonf= '';
            var tagf = '';
            if (tag === null) {
            tagf = t('analysispage.AcceptNull')}
            else if (tag === 0){
              tagf = t('analysispage.AcceptNo')} 
            else if (tag === 1){
              tagf = t('analysispage.AcceptYes')};
            
            if (tag===null && reason === null) {
            reasonf = ""}
            else if(tag === 1 ) {
              reasonf = ''} 
            else if(tag === 0 && reason===null ) {
              reasonf = '原因未填写'} 
            else {
              reasonf = t('analysispage.Reasonis')+reason
            }
              
              ;
            

              tooltipContent += '<div>' + 
                                params[0].name + '<br>' +
                                t('analysispage.diff') +' '+ params[0].data+ t('unit.min') + '<br>' +
                                tagf + '<br>' +reasonf
                                '</div>';
            return tooltipContent;
          }
        },   
      xAxis: 
        {
          data: state.datelist
        },
      yAxis: 
        {
        type: 'value',
        // max:"15",
        // min:"-15"
        
        },

      series: 
        {
          type: 'bar',
          showSymbol: false,
          data: state.valuelist,
          smooth: true,
          markArea: {
            itemStyle: {
              color: 'rgba(180, 50, 50, 0.1)'
            },
            data: [
              [
                {
                  yAxis: '100'
                },
                {
                  yAxis: '10'
                }
              ],
              [
                {
                  yAxis: '-10'
                },
                {
                  yAxis: '-100'
                }
              ],
            ]
          },
        },
    };
  option && myChart.setOption(option);
}

  


//导航栏: 点击事件
function changeOvenData(oven_type) {

//将type存储到state
    state.selectedOven.type = oven_type;
//选择烘房，先将表格数据清空
  var planlistlength = state.historyplan.length;
  for (var j=0;j< planlistlength;j++)
  { 
    state.historyplan.pop();
  }
//遍历ovenlist, 如果oven_type等于传入的参数，则循环中止。
  for (var i in state.ovenlist){
    var ovens_data = state.ovenlist[i]
    if(ovens_data["oven_type"] == oven_type){
      // 更改元素样式
      changeColor(ovens_data["id"]);
      state.isActive=true;
      //把选中的中英文名称取出来
      state.selectedOven.cn=ovens_data["name_cn"];
      state.selectedOven.en=ovens_data["name_en"];
      const time:string = ovens_data["default_plan_time"];
      state.selectedOven.defaulttime=time.slice(0,5);
      state.selectedOven.online=ovens_data["online"];

      console.log(ovens_data);
      
      //未上线，显示弹窗
      if(ovens_data["online"] == 0){
        showToast(t('home.coming'));
      } 
      //已上线，显示对应的计划时间
      else{
       getHistoryData(oven_type,state.calendar.start,state.calendar.end)
       getHistoryKPI(oven_type,state.calendar.start,state.calendar.end)
       getHistoryDays(oven_type)
      }
      //退出循环
      break;
    }
  }

};




onMounted(() => {

fetchOven();  
getHistoryData(state.selectedOven.type, state.calendar.start,state.calendar.end);
getHistoryKPI(state.selectedOven.type, state.calendar.start,state.calendar.end);
getHistoryDays(state.selectedOven.type);







});
</script>
<style lang="scss" scoped>

//按钮样式
.buttondeletestyle{
  padding:6px 0px;
  border-radius: 5px;
}
.buttoneditstyle{
  // background-color: ;
  
  padding:6px 0px;
  border-radius: 5px;
}

.buttonsavestyle{
  color: #7089ac; 
  padding:6px 0px ;
  border-radius: 5px;
}



//导航样式
.activeClass{
  color: #1c6bba;
  background-color: #ced9e5;
  border-radius: 5px;
  padding: 10px 15px;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}
.noactiveClass{
  color: #ababab;
  border-radius: 5px;
  padding: 10px 15px;
  // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

  table {
    border-collapse: collapse;
    width: 100%;
    // border: 1px solid #ccc;
  }

  th{
    font-weight: 1000; 
    font-size: 0.9rem;
  }

  td {
    padding: 10px 20px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
    line-height: var(--van-cell-line-height);
    height: 15px;
  }



  tr.odd {
    height: 6vh;
  
    // background-color: pink;
  }



  //表格样式，不能删
.van-cell {
    padding: 0px;
  }

.van-cell__value {
    text-align: center;
  }



.card {
  margin-top: 50px;
  max-width: 100%;
  border-radius: 0.5rem;
  background:#606c88;
  background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
  background: linear-gradient(to right, #3f4c6b, #606c88);
  // padding: 1rem;
  color: rgb(107, 114, 128);
  // -webkit-box-shadow: 0px 87px 78px -39px rgba(0, 0, 0, 0.4);
  // box-shadow: 0px 87px 78px -39px rgba(0, 0, 0, 0.4);
}

.cardinside {
width: 100%;
}



.content {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
}

.title {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
  cursor: default;

}

.desc {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: rgb(202, 200, 200);
  cursor: default;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 0.5rem;
  gap: 0.5rem;
}

.download,
.notnow {
  width: 80%;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.375rem 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgb(255, 255, 255);
  outline: 2px solid transparent;
  border: 1px solid rgba(253, 253, 253, 0.363);
}

.download {
  background-color: #284385;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: all 0.25s cubic-bezier(0.18, 0.69, 0.18, 0.94);
  transition: all 0.25s cubic-bezier(0.18, 0.69, 0.18, 0.94);
}

.notnow {
  background-color: #606c88;
  font-weight: 500;
  text-decoration: none;
  -webkit-transition: all 0.25s cubic-bezier(0.18, 0.69, 0.18, 0.94);
  transition: all 0.25s cubic-bezier(0.18, 0.69, 0.18, 0.94);
}



.more{
  background-color: #f2f2f2; 

  border: #1c6bba;
  border-radius: 5px;
}

.form input {
margin: 20px;
  outline: none;
  line-height: 1.3rem;
  font-size: 0.875rem;
  color: rgb(255 255 255 );
  padding: 0.5rem 0.875rem;
  background-color: rgb(255 255 255 / 0.05);
  border: 1px solid rgba(253, 253, 253, 0.363);
  border-radius: 0.375rem;
  flex: 1 1 auto;
}

.form input::placeholder {
  color: rgb(216, 212, 212);
}

.form input:focus {
  border: 1px solid rgb(99, 139, 241);
}

.form button {
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.625rem 0.875rem;
  background-color: rgb(99, 121, 186);
  border-radius: 0.375rem;
  border: none;
  outline: none;
}


// ::v-deep .van-field__control::-webkit-input-placeholder {
//   color: #000000;
// }


// ::v-deep .van-calendar__weekday {
//   display: none !important;
//   color: white;
// }

.calendar ::v-deep .van-calendar__weekday {
    display: none !important;
    color: white !important;
  }
  



</style>
