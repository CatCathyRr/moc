<template>

  <div style="padding: 20px 20px ;background-color: #EBEBEB;height: 88vh;">
  <div class="chart-con" style="font-family: VolvoNovum-Regular;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center">

      <div style="padding-top: 5px">
        <h3> {{ $t('input.pti') }}</h3>
      </div>
    </div>
    <div style="margin-top: 20px;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center; height: 72vh;">
  <!-- 选择烘房 -->
  <div style=" text-align: center">
    <div style="padding: 5px 30px; display: flex; justify-content: center">
      <div v-for="(item,index) in state.ovenlist">
      <span style="width: 80px; font-size: 17px;"  :key="item.id" :class="0==index ? 'activeClass' : 'noactiveClass' " :id="item.id" @click="changeOvenData(item.oven_type)">
        {{item.oven_type}}
      </span>
      <van-divider vertical  style="color: white;border: white;height: 10px;"/> 
    </div>
    </div>
 
  </div>

<span>
  <van-cell center is-link
  style="margin-left:20px;padding:20px;width:90%"
  arrow-direction="down"
  icon="notes-o"
   @click="state.calendar.show = true " >
    {{ state.calendar.dateformat }}
  </van-cell>
</span>


 
<!-- 表格 -->

  <div v-if="state.selectedOven.online == '1'" style="padding-top: 20px; text-align: center">

    <div id="scroll" style="height:380px ;padding:0px ;display:flexbox;  overflow:scroll;">
    
      <table >
      <!-- 标题 -->
        <th style=" width: 32%;">{{ $t('input.date') }}</th>
        <th style=" width: 10%;">{{ "差异" }}</th>
        <th style=" width: 10%;">{{ "节约" }}</th>
        <th style=" width: 10%;">{{ "接受?" }}</th>
        <th style=" width: 10%;">{{ "更多" }}</th>
      <!-- 内容 --> 

        <tr class="odd" v-for="(item, index) in state.historyplan" :key="index">

          <td  style=" width: 32%; font-size: 15px;">{{ item.plan_date }}</td>

        <!-- 内容第二列: diff -->
          <td style=" width: 10%;color: #000000;padding: 10px;">
            {{ item.pred_diff }}
          </td>
       <!-- 内容第三列: timesaving -->
          <td style=" width: 10%;color: #000000;padding: 10px;">
           {{ item.pred_save }}
          </td>
      <!-- 内容第四列: accept-->
          <td style=" width: 10%;color: #000000;padding: 10px;">
           {{ item.accept }}
          </td>
      <!-- 内容第二列: more -->
          <td style=" width: 10%;color: #000000;padding: 10px;">
           <button @click="detailitem(index) ">more</button>
          </td>
        </tr>

      </table>
  
  </div>
  </div>


  <!-- 只在上线的烘房展示 -->
  <div  style="margin:30px 10px;text-align: center">
    <div v-if="state.selectedOven.online == '1'" style="padding: 5px 10px; display: flex; ">
    
      <van-button style="margin:10px;padding: 20px 0px; text-align: left;background-color: #ced9e5; color: #1c6bba; border: white;" size="small" type="primary" block @click="download">{{ $t('analysispage.download') }}</van-button>
      <van-button style="margin:10px;padding: 20px 0px; text-align: left;background-color: #ced9e5; color: #1c6bba; border: white;" size="small" type="primary" block @click="download">{{ $t('analysispage.email') }}</van-button>
    </div>
  </div>


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
  v-bind:show= state.calendar.show  
  ref = calendar
  :formatter = formatterCalendar
  :show-title="true"
  :show-subtitle="false"
  color="#7089ac"
  v-bind:max-date= state.calendar.maxdate
  v-bind:min-date= state.calendar.mindate
  :confirm-text="$t('input.confirm')"
  :default-date= state.calendar.default
  type="range"
  @close="onClose" 
  @confirm="onConfirm"
  class="abcd"
   >
   <template #title>
        <div class="calendar-top">

          <div class="calendar-top-time">
             
          </div>
          <div>
            {{ $t('analysispage.choose') }}
          </div>
          <table style="height: 30px;width: 100%; font-size: 12px ; ">
            <th style="width:14.3%;"> {{ $t('week.sun') }}</th>
            <th style="width:14%;">{{ $t('week.mon') }}</th>
            <th style="width:14.2%;">{{ $t('week.tue') }}</th>
            <th style="width:14.2%;">{{ $t('week.wed') }}</th>
            <th style="width:14.2%;">{{ $t('week.thu') }}</th>
            <th style="width:14.2%;">{{ $t('week.fri') }}</th>
            <th style="width:14.2%;">{{ $t('week.sat') }}</th>
          </table>
          

        </div>
      </template>
  </van-calendar>
</div>

</template>



<script lang="ts" setup name="HomePage">
  import { useOvenListStore } from '@/store/modules/ovenlist';
  import {  useHistoryListStore } from '@/store/modules/history';
  import { showToast } from 'vant';
  import { useI18n } from 'vue-i18n';
  const { locale, t } = useI18n();

 
const state= reactive(
    {
      showtime:false,    
      showdetaildia:false,
      calendar:{
        show:false,
        dateformat:'',
        maxdate: new Date,
        mindate: new Date(2023, 7, 1),
        default:timeInterval(),
      },
      opentime:'',
      ovenlist:[], //烘房列表
      dialogdeletetitle:'',
      dialoggeneratetitle:'',
      deleteindex: 0,  
      selectedOven: {   //被选中的烘房
        en:'',
        cn:'',
        type:'EDO',
        defaulttime:'',
        online:'1'
      },
      // showOptions: false,
      historyplan:[],  //补齐的生产计划
      isActive:false,
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
      const end = formatRangeDate(defaultrange[1]);
      state.calendar.dateformat=`${start} - ${end}`;


//表格中更多按钮
const detailitem = (index: number ) => {

 state.deleteindex = index;
 state.showdetaildia=true;
 state.dialogdeletetitle = "hahaha";

  };

//更多按钮后的弹窗事件
const  beforeClose  = async (action: any) => { 
                state.showdetaildia=false ;

        }

//生成未来7天计划
const download = () => {
showToast("下载的功能还没做呢")

  };

//生成按钮后的弹窗事件
// const  beforeGenerate  = async (action: any) => { 
//             if (action == 'confirm') { 
//                 // 确认
//                 state.showgeneratedia=false ;
//                 const planlist= usePlanListStore();
//                 const time =state.selectedOven.defaulttime;
//                 console.log(state.selectedOven.defaulttime);
                
//                 planlist.addeditblankplan(7,time);
                
//                 console.log('succeed');
                
//             } 
//             else if (action == 'cancel') { 
//                 // 取消
//                 state.showgeneratedia=false ;
//                 console.log('cancel');
//             }
//         }


//选择时间后把时间format，存在state.opentime
const onConfirmtime = ({ selectedValues }) => {
    let time = selectedValues[0] + ':' + selectedValues[1];
    state.opentime = time; //赋值给input
    console.log(state.opentime);
    state.showtime = false;
  };

//异步调用：从store获得每个烘房的信息
async function fetchOven() {
  
  const resList= useOvenListStore()
  await resList.run();
  state.ovenlist = resList.getOvenList;

  //取出默认烘房：  EDO 和 默认的时间  08:50
  state.selectedOven.type =  state.ovenlist[0]["oven_type"]  
  const time:string = state.ovenlist[0]["default_plan_time"]
  state.selectedOven.defaulttime = time.slice(0,5);
  
}

//异步调用：从store获得对应烘房的生产计划
async function getHistoryData(ovenType){

  console.log(`当前的烘房是${ovenType}`);
  
  //从store取得每个烘房的生产数据
  const historylist= useHistoryListStore();

  const plan = historylist.getHistoryList;
  
  state.historyplan= plan; 
console.log(state.historyplan);

}


// 导航栏: 点击更改颜色
function changeColor(div_id){
  for(var k in state.ovenlist){
    const divElement = document.getElementById(state.ovenlist[k]["id"]);
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

      let new_year = new Date().getFullYear();
      let new_month = new Date().getMonth() + 1;
      let start = new Date(new_year, new_month-1, 1); //取当年当月中的第一天
      let end = new Date(); //取最后一天
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
  
  state.calendar.dateformat=`${start} - ${end}`;
  state.calendar.show = false;
  state.calendar.default = selectedValues;
}

function formatRangeDate(dateinput) {
  const year = dateinput.getFullYear();
  const month = ('0' + (dateinput.getMonth() + 1)).slice(-2);
  const day = ('0' + dateinput.getDate()).slice(-2);
  const date =  year+'/' + month +'/'+ day;
  return date
};
  


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
       getHistoryData(oven_type)
      }
      //退出循环
      break;
    }
  }

};




onMounted(() => {

fetchOven();  
getHistoryData(state.selectedOven.type);







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

  td {
    padding: 10px 20px;
    text-align: center;
    border-bottom: 1px solid #f2f2f2;
    line-height: var(--van-cell-line-height);
    height: 15px;
  }



  tr.odd {
    height: 95px;
  
    // background-color: pink;
  }



  //表格样式，不能删
.van-cell {
    padding: 0px;
  }

  .van-cell__value {
    text-align: center;
  }

  ::v-deep .van-field__control::-webkit-input-placeholder {
  color: #000000;
}


::v-deep(.van-calendar__weekday) {
 
  display: none !important;
}
::v-deep(.van-calendar__header) {
 
 height: 180px;
}



</style>
