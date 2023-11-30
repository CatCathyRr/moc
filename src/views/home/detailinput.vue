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


 
<!-- 表格 -->

  <div v-if="state.selectedOven.online == '1'" style="padding-top: 20px; text-align: center">

    <div id="scroll" style="height:380px ;padding:0px ;display:flexbox;  overflow:scroll;">
    
      <table >
      <!-- 标题 -->
        <th style=" width: 38%;">{{ $t('input.date') }}</th>
        <th style=" width: 20%;">{{ $t('input.time') }}</th>
        <th>{{ $t('input.action') }}</th>
      <!-- 内容 --> 

        <tr class="odd" v-for="(item, index) in state.plan" :key="index">

          <td v-if="item.noedit==true" style=" width: 38%; font-size: 15px;color: #ababab; ">{{ item.plan_date }}</td>
          <td v-else style=" width: 38%; font-size: 15px; ">{{ item.plan_date }}</td>
        <!-- 内容第二列: time -->
          <td style=" width: 18%;color: #000000;padding: 10px;">

            <template v-if="item.action == 'edit'">
              <van-cell-group >
                <van-field
                style=" font-size: 15px;text-align: center;padding-left: 0px;"
                v-model="state.opentime"
                readonly @click="state.showtime = true"
               :placeholder='state.selectedOven.defaulttime'
                />
              </van-cell-group>
            </template>

            <template v-else>
              <van-cell-group>
                <van-cell style="text-align: center;;padding-left: 0px;font-size: 15px;">{{ item.time }}</van-cell>
              </van-cell-group>
            </template>
          </td>
        <!-- 操作 -->
          <td >
            <div v-if="item.action == 'edit' ">
              <span class="buttonsavestyle">
              <a @click="save(index)">{{ $t('input.save') }}</a>
             </span>
              <van-divider vertical />
              <span class="buttonsavestyle">
              <a @click="cancel(index)">{{ $t('input.cancel') }}</a>
            </span>
          </div>
            <div v-else-if="item.noedit==false" > 
              <span class="buttoneditstyle">
              <a style=' color: black;' @click="edit(index)">{{ $t('input.edit') }}</a>
            </span>
              <van-divider vertical />
              <span class="buttondeletestyle">
                <a style=' color: #d3a8a6;' @click="deleteitem(index)">{{ $t('input.delete') }}</a>
              </span>
            </div>
            <div v-else-if="item.noedit==true" > 
              <span class="buttoneditstyle">
              <a style=' color: #ababab;'>{{ $t('input.edit') }}</a>
            </span>
              <van-divider vertical />
              <span class="buttondeletestyle">
                <a style=' color: #ababab'>{{ $t('input.delete') }}</a>
              </span>
            </div>
          </td>
        </tr>

      </table>
  
  </div>
  </div>

  <!-- <div v-if="state.selectedOven.online == '0'" style="padding-top: 300px; text-align: center"> {{ $t('home.coming') }}</div> -->



  <!-- 生成未来七天生产计划 按钮 -->
  <!-- 只在上线的烘房展示 -->
  <div  style="margin:30px 10px;text-align: center">
    <div v-if="state.selectedOven.online == '1'" style="padding: 5px 10px; display: flex; ">
      <!-- <van-button style=" margin: 0 10px;background-color: #ced9e5; border: #ced9e5; width: 100%;font-size: 15px;" size="small" type="primary" block @click="add">+</van-button> -->
      <van-button style="padding: 20px 0px; text-align: left;background-color: #ced9e5; color: #1c6bba; border: white;" size="small" type="primary" block @click="add">{{ $t('input.sevengenerate') }}</van-button>
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

<!-- 确认删除弹窗 -->
<van-dialog
     :title=state.dialogdeletetitle
      v-bind:show= state.showdeletedia
      show-cancel-button
      :beforeClose="beforeClose"
    >
</van-dialog>

</div>

</template>



<script lang="ts" setup name="HomePage">
  import { useOvenListStore } from '@/store/modules/ovenlist';
  import { usePlanListStore } from '@/store/modules/input';
  import { showToast } from 'vant';
  import { useI18n } from 'vue-i18n';
  const { locale, t } = useI18n();

 
const state= reactive(
    {
      showtime:false,    
      showdeletedia:false,
      showgeneratedia:false,
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
      plan:[],  //补齐的生产计划
      isActive:false,
    }
  );

//表格中的保存按钮
const save = async (index:number) => {
    state.plan[index].action = 'save';  
    
    state.plan[index].time = state.opentime==undefined? state.selectedOven.defaulttime: state.opentime; 
    const time = state.opentime == undefined? state.selectedOven.defaulttime: state.opentime
    const plantime = state.plan[index].plan_date+' '+time+':00';
    const planlist= usePlanListStore();
    
    //按照是否有id分辨是新增记录还是修改记录，从而调不同的接口
    if(state.plan[index].id === null){   
      const res = await planlist.addplan(state.selectedOven.type,plantime);
      state.plan[index].id =res.id;
      showToast(t("input.savesucceed"))
    } else {
      await planlist.postplan(state.plan[index].id,plantime);    
      showToast(t("input.savesucceed"))
      }}

//表格中的编辑按钮
const edit = (index: number) => {
    state.plan[index].action = 'edit';
    state.opentime = state.plan[index].plan_time==""? state.selectedOven.defaulttime :state.plan[index].time; 
    console.log(state.plan[index]);
  
  };

//表格中取消按钮
const cancel = (index: number) => {
    state.plan[index].action = 'save';
  };

//表格中删除按钮
const deleteitem = (index: number ) => {

 state.deleteindex = index;
 const date :string =state.plan[state.deleteindex].plan_date;
 const time =state.plan[state.deleteindex].time;

    //如果time列没有数据，就不需要删除
    if(time===undefined || time===''){
          showToast('无需删除')
        }else {
          state.showdeletedia=true;
           } 
    const titleen = "Delete production time on " + date +"?"
    const titlecn = '是否删除'+date+'的生产数据？'
    state.dialogdeletetitle = locale.value == 'zh-cn' ? titlecn:titleen;

  };

//删除按钮后的弹窗事件
const  beforeClose  = async (action: any) => { 
            if (action === 'confirm') { 
                // 确认
                state.showdeletedia=false ;
                state.plan[state.deleteindex].time =''; 
                const planlist= usePlanListStore();
                const id = state.plan[state.deleteindex].id;
                await planlist.deleteplan(id);

            } 
            else if (action === 'cancel') { 
                // 取消
                state.showdeletedia=false ;
                console.log('cancel');
            }
        }

//生成未来7天计划
const add = () => {
  // state.showgeneratedia=true; 
  // const titleen = "Add the records in the following 7 days ?"
  // const titlecn = '确认向下添加7天的生产计划吗?'
  // state.dialoggeneratetitle = locale.value == 'zh-cn' ? titlecn:titleen;
  var scrollTarget = document.getElementById("scroll");
//scrollTarget.scrollHeight是获取dom元素的高度，然后设置scrollTop
 if(scrollTarget!= null) {
  scrollTarget.scrollTop=scrollTarget.scrollHeight;
 
  // scrollTarget.scrollTop=scrollTarget.scrollTop;
  // console.log(scrollTarget.scrollTop);
}

  state.showgeneratedia=false ;
                const planlist= usePlanListStore();
                const time =state.selectedOven.defaulttime;
                console.log(state.selectedOven.defaulttime);
                
                planlist.addeditblankplan(1,time);
                
                console.log('succeed');
                showToast(t("input.addsucceed"));
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
async function getPlanData(ovenType){

  console.log(`当前的烘房是${ovenType}`);
  
  //从store取得每个烘房的生产数据
  const planlist= usePlanListStore();
  await planlist.runplan(ovenType);
  const plan = planlist.getplanList;
  
  state.plan= plan; 

  
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

//导航栏: 点击事件
function changeOvenData(oven_type) {

//将type存储到state
    state.selectedOven.type = oven_type;
//选择烘房，先将表格数据清空
  var planlistlength = state.plan.length;
  for (var j=0;j< planlistlength;j++)
  { 
    state.plan.pop();
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
       getPlanData(oven_type)
      }
      //退出循环
      break;
    }
  }

};


onMounted(() => {

fetchOven();  
getPlanData(state.selectedOven.type);


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

//   th {
//   position: sticky;
//   top: 0;
//   padding: 20px;
// }
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




</style>
