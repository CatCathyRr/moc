<template>
  <div class="dots-container" style="margin-top: 90%;color: #6793fb;" v-if="!state.loading">{{ $t('predicting') }}</div>
   <section class="dots-container" style="margin-top: 5%;" v-if="!state.loading">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>

  <!-- <van-loading size="24px" vertical v-if="!state.loading">{{ $t('tabbar.loading') }}</van-loading> -->
  <div style="padding: 20px 20px;background-color: #EBEBEB;" v-if="state.loading" >
    <!-- 主副标题 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular;padding: 16px;background-color:white ;border-radius: 5px;color: #000000; text-align: center">
      <div>
        <h3>{{ state.openinfo.oven}}</h3>
      </div>
      <div style="padding-top: 5px">
        <h3>{{ $t('predict.pop') }}</h3>
      </div>
    </div>

    <!-- 注意 -->
    <div style="font-family: VolvoNovum-Regular;background-color: white; color: #000000; border-radius: 5px;margin:20px 0px;">
    <!-- 开机时间注意 -->
    <div class="chart-con" style=" font-family: VolvoNovum-Regular;text-align: center;">
      <div class="chart-con-inner" style="padding: 0px;">
        <div style=" padding: 16px; border-bottom-style:solid;border-width: 1px; border-color: #f1f1f1;"
          >
          <span v-if="!state.openinfo.error" style="font-weight: bold;">{{ $t('tabbar.detailform') }}:</span>
          <span v-else style="font-weight: bold;">{{ $t('tabbar.error') }}:</span>
        </div>
        <div style="padding: 16px;">
          <template v-if="!state.openinfo.error">
          <div
          ><div style="font-size: 14px;font-weight: bold;">{{ $t('predict.ptt') }}</div
          ><div style="font-size: 14px;color:  #476d3b;padding:10px 0px;">{{ state.openinfo.plan_time }}</div></div
        >
        <div style="padding: 8px 0px;"
          ><div style="font-size: 14px; font-weight: bold;"> {{ $t('predict.pwha') }}</div
          ><div style="font-size: 14px;color:  #476d3b; padding:10px 0px 0px 0px; ">{{ state.openinfo.actualtime }}</div></div
        >
          </template>
          <template v-if="state.openinfo.error">
          <div
          ><div style="font-size: 14px;font-weight: bold;">{{ $t('predict.ptt') }}</div
          ><div style="font-size: 14px;color:  #BF2012;padding:10px 0px;">{{ state.openinfo.plan_time }}</div></div
        >
        <div style="padding: 8px 0px;"
          ><div style="font-size: 14px; font-weight: bold;"> {{ $t('predict.pwha') }}</div
          ><div style="font-size: 14px;color:#BF2012; padding:10px 0px 0px 0px; ">{{ state.openinfo.actualtime }}</div></div
        >
          </template>
      </div>
      </div>
    </div>

    <!-- 开机时间模块    -->
    <div style="font-family: VolvoNovum-Regular;text-align: center;padding: 0px 16px 16px 16px;">
      <div style=" border-radius: 5px; line-height: 35px; border: 1px solid #000000">
        <template v-if="!state.openinfo.error">
          <div>
            <span style="font-weight: bold ">{{ $t('predict.opentime') }}</span></div
          >
          <div>
            <span style=" color: #476d3b;"> {{ state.openinfo.pro_time }}</span></div
          >
          <div style=" border-bottom-style:solid;border-width: 1px; border-color: #f1f1f1;"></div>
          <div>
            <span style="font-weight: bold">{{ $t('predict.phd') }}</span></div
          >
          <div>
            <span style=" color: #476d3b; "> {{ state.openinfo.incretime }}  </span></div
          >
        </template>
        
        <template v-else>
          <div style="padding: 16px;">
             <div><span style="color: #BF2012; font-weight: bold;">{{ $t('tabbar.error') }}</span></div>
             <div><span style="color: #BF2012; font-weight: bold;">{{ state.errormsg }}</span></div>
            </div>


        </template>
        </div>
      
    </div>
  
  </div>

    <!-- 输入数据检查 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular;color: #000000; background-color: white; border-radius: 5px; text-align: center">
      <div class="chart-con-inner">
        <!-- 数据检查标题 -->
        <div style="padding: 16px; border-bottom-style:solid;border-width: 1px; border-color: #f1f1f1;"
          ><span style="font-weight: bold">{{ $t('predict.dataic') }}</span></div
        >

        <div style="padding: 16px">
          <!-- 第一行: 烘炉温度 -->
          <van-row class="custom-row" style="padding-top: 0px;">
            <van-col span="2" class="flex-col">
              <thermometer theme="outline" size="22" fill="#333" :strokeWidth="2" />
            </van-col>
            <van-col span="6" class="padding-col">
              <van-tag style='font-size: 14px;'  class="custom-tag">{{ $t('predict.oventem') }}</van-tag>
            </van-col>
            <van-col  style='font-size: 13px;' offset="2" span="10" class="text-col">{{ state.openinfo.oven_detail }}</van-col>
            <van-col span="4" class="text-col" style="color: black; text-align: right;"
              ><a style="font-size: 13px; border-radius: 5px; background-color: #7089ac; color: white;padding: 5px 5px;" @click="showtip()">{{ $t('predict.more') }}</a></van-col
            >
          </van-row>
          <!-- 第二行：室内温度-->
          <van-row class="custom-row">
            <van-col span="2" class="flex-col">
              <umbrella theme="outline" size="20" :strokeWidth="2" />
            </van-col>
            <van-col span="6" class="padding-col">
              <van-tag style='font-size: 14px;'  class="custom-tag">{{ $t('predict.roomtem') }}</van-tag>
            </van-col>
            <van-col  style='font-size: 13px;' offset="2" span="14" class="text-col">{{ state.openinfo.temp }}</van-col>
          </van-row>
          <!-- 第三行：室内湿度 -->
          <van-row class="custom-row">
            <van-col span="2" class="flex-col">
              <dashboard-one theme="outline" size="20"  :strokeWidth="2" />
            </van-col>
            <van-col span="6" class="padding-col">
              <van-tag style='font-size: 14px;'  class="custom-tag">{{ $t('predict.roomhum') }}</van-tag>
            </van-col>
            <van-col  style='font-size: 13px;' offset="2" span="14" class="text-col">{{ state.openinfo.humid }}</van-col>
          </van-row>
          <!-- 第四行：上次关机时间-->
          <van-row class="custom-row">
            <van-col span="2" class="flex-col">
              <big-clock theme="outline" size="19" :strokeWidth="2" />
            </van-col>
            <van-col span="6" class="padding-col">
              <van-tag style='font-size: 14px;'  class="custom-tag">{{ $t('predict.lastclose') }}</van-tag>
            </van-col>
            <van-col  style='font-size: 13px;' offset="2" span="14" class="text-col">{{ state.openinfo.last_close_time }}</van-col>
          </van-row>
        </div>
      </div>
    </div>

    <!-- 用户输入模块 -->
    <div style="font-family: VolvoNovum-Regular; color: #000000; background-color: white;margin-top: 20px; border-radius: 5px;">
    <div style="font-family: VolvoNovum-Regular;padding: 16px; border-bottom-style:solid;border-width: 1px; border-color: #f1f1f1;"
          ><span style="font-weight: bold">{{ $t('predict.feedback') }}</span></div
        >
      <!-- 是否接受预测结果 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular;padding: 16px; text-align: center">
      <div class="chart-con-inner">
        <div
          ><span style="font-size: 14px;">{{ $t('predict.watr') }}</span></div
        >

        <div style="padding-top: 16px">
          <van-radio-group
            v-model="state.form.accept"
            direction="horizontal"
            shape="round"
            style="justify-content: center"
            @change="writecache"
          >
            <van-radio  :name=1 icon-size="20px" style="font-size: 14px;margin-right:30px ;" checked-color="#1c6bba">{{ $t('predict.yes') }}</van-radio>
            <van-radio  :name=2 icon-size="20px" style="font-size: 14px;margin-left:30px" checked-color="#1c6bba">{{ $t('predict.no') }}</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>

    <!-- 输入实际开机时间 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular;padding:0px 16px 16px 16px; text-align: center">
      <div class="chart-con-inner">
        <div><span style="font-size: 14px;">{{ $t('predict.aoti') }}</span></div>
        <div style="padding: 0px 16px 0px 0px;">
          <div style="padding-top: 10px; font-size: 12px; color: #A3A3A3; "> *{{ $t('predict.today') }}{{ state.openinfo.oven }}{{ $t('predict.totfplc') }} :</div>
          <div >
          <template v-if="state.updatedtime == ''" >
            <!-- <div style=" span:12; padding-top: 5px; padding-left: 4px; font-size: 12px; color: #A3A3A3" v-if="state.hasplcinfo===false">{{ $t('predict.nodata') }}</div> -->
            <div style=" span:12; padding-top: 5px; padding-left: 4px; font-size: 12px; color: #A3A3A3" v-if="state.openinfo.plctime === null"> {{ $t('predict.tbupdated') }} </div>
            <div style=" span:12; padding-top: 5px; padding-left: 4px; font-size: 12px; color: #A3A3A3" v-if="state.openinfo.plctime != ''"> {{ state.openinfo.plctime }}</div>
          </template>
          <template v-else>
            <div style="padding-top: 5px; padding-left: 4px; font-size: 12px; color: #A3A3A3"> {{ state.updatedtime }} </div>
          </template>
        </div>

      
        </div>
        <div style="padding-top: 5px; padding-left: 4px; font-size: 12px">
          <van-cell-group inset>
            <van-field
              v-model="state.form.currentdate"
              style="border: 1px gray; padding: 3px; width: 50%; float: left"
              readonly @click="state.showopendate = false"
              right-icon="notes-o"
              :placeholder="$t('input.date')"
            />
            <van-field
              v-model="state.form.opentime"
              style="border: 1px gray; padding: 3px; width: 50%; float: left"
              readonly @click="state.showopentime = true"
              right-icon="notes-o"
              :placeholder="$t('input.time')"
            />
          </van-cell-group>
        </div>
      </div>
    </div>

    <!-- 不接受预测原因 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular; padding:0px 16px 16px 16px; text-align: center" v-if="state.status === 2">
      <div class="chart-con-inner">
        <div
          ><span style="font-size: 14px;">{{ $t('predict.rwna') }}</span></div
        >

        <div style="padding-top: 5px; padding-left: 4px; font-size: 12px">
          <van-cell-group inset>
            <van-field
              v-model="reasontext"
              readonly @click="state.showReason = true; "
              style="border: 1px gray; padding: 3px"
              right-icon="arrow-down"
              :placeholder="$t('input.pls')"
            />
          </van-cell-group>
        </div>
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="chart-con" style="font-family: VolvoNovum-Regular;padding-bottom: 16px; text-align: center">
      <div style="padding: 5px 20px">
        <div>
          <van-button
            style="width: 100%;height: 36px; border: none; background-color: #284E80; color: white"
            size="small"
            type="primary"
            @click="submit"
            >{{ $t('predict.submit') }}</van-button
          >
        </div>
      </div>
    </div>
  </div>

    <!-- 弹出窗口1: 不接受预测原因 -->
    <van-popup v-model:show="state.showReason" round position="bottom"  >
      <van-picker
        :title="$t('input.reason')"
        :columns="state.columns"
        @confirm="onConfirm"
        :confirm-button-text="$t('input.confirm')"
        @cancel="state.showReason = false"
        :cancel-button-text="$t('input.cancel')"
        
      />
    </van-popup>

    <!-- 弹出窗口2: 选择日期 -->
    <van-popup v-model:show="state.showopendate" round position="bottom"  >
      <van-date-picker
        type="datetime"
        :title="$t('input.datechoose')"
        @confirm="onConfirmdate"
        :confirm-button-text="$t('input.confirm')"
        @cancel="state.showopendate = false"
        :cancel-button-text="$t('input.cancel')"
      />
    </van-popup>

    <!-- 弹出窗口3: 选择时间 -->
    <van-popup v-model:show="state.showopentime" round position="bottom"  >
      <van-time-picker
        type="datetime"
        :title="$t('input.timechoose')"
        @confirm="onConfirmtime"
        :confirm-button-text="$t('input.confirm')"
        @cancel="state.showopentime = false"
        :cancel-button-text="$t('input.cancel')"
        
      />
    </van-popup>
  </div>

</template>

<script lang="ts" setup name="detailformPage">
  import { Umbrella, Thermometer, DashboardOne, BigClock } from '@icon-park/vue-next';
  import { showToast, showDialog } from 'vant';
  import { useCookies } from '@vueuse/integrations/useCookies';
  import { useI18n } from 'vue-i18n';
  import { ADDfeedback} from '@/api';
  import { useNavBarStore } from '@/store/modules/user';
  import { usePredcitDetailStore } from '@/store/modules/predictinfo';
  import {usefeedback} from '@/store/modules/feedback';

  const navbar = useNavBarStore();
  const { locale, t } = useI18n();
  const router = useRouter();

  const state = reactive({
    form: {
      reason:null,
      accept:undefined,
      currentdate: '',
      opentime: '',
    },
    openinfo: {
      id:'',
      oven: '',
      plan_time: '' ,
      predict_time:  '',
      pro_time:  '',
      oven_detail:  '',
      oven_detaillist: [],
      incretime: '',
      temp:  '',
      humid:  '',
      last_close_time:  '',
      error: false,
      plctime: '',
      actualtime: '',
    },
    errormsg: '',
    hasplcinfo:true,
    updatedtime: '',
    showReason: false,
    showopendate: false,
    showopentime: false,
    loading: false,
    status: 1,
    columns: [{'value':'','text':''}],
  });

  async function ovenPlan() {
      const oventype = router.currentRoute.value.query.oven_type;
      // const oventype = 'EDO';
      const res= usePredcitDetailStore();
      await res.runplan(oventype);
          state.openinfo.plan_time = res.getOvenPlan.plan_time;
          state.openinfo.predict_time = res.getOvenPlan.predict_time;
      }

  async function ovenName() {
      const oventype = router.currentRoute.value.query.oven_type;
      // const oventype = 'EDO';
      const res= usePredcitDetailStore();
      await res.runoven(oventype);
      state.openinfo.oven= locale.value == 'zh-cn' ?res.getOvenName.cn:res.getOvenName.en;
      }

  async function ovenPredict() {
      const oventype = router.currentRoute.value.query.oven_type;
      // const oventype = 'EDO';
      const res= usePredcitDetailStore();
      await res.runpredict(oventype);
          state.openinfo.id = res.getOvenPredict.id;
          state.openinfo.temp = res.getOvenPredict.temp ==''? t('predict.nodata'):res.getOvenPredict.temp ;
          state.openinfo.humid = res.getOvenPredict.humid === '' ? t('predict.nodata'): res.getOvenPredict.humid;
          state.openinfo.last_close_time = res.getOvenPredict.last_close_time === null ? t('predict.nodata'):res.getOvenPredict.last_close_time;
          state.openinfo.actualtime = res.getOvenPredict.data_time === null ? t('predict.nodata'): res.getOvenPredict.data_time;
          state.openinfo.pro_time = res.getOvenPredict.predict_open_time === null ? t('predict.nodata'):  res.getOvenPredict.predict_open_time;
          state.openinfo.incretime = res.getOvenPredict.predicted_temp_incr_time === null ? t('predict.nodata'):res.getOvenPredict.predicted_temp_incr_time;  
          state.openinfo.oven_detail = res.getOvenPredict.oven_detail1st=== '' ?t('predict.nodata'):res.getOvenPredict.oven_detail1st;

          const processedData = res.getOvenPredict.oven_detail.map((item) => {
          const roundedValue = item.value !== null ? item.value : null;
          const rvalue= roundedValue === null? t('predict.nodata'):roundedValue;
          return { name: item.name, value: rvalue };
          });
          state.openinfo.oven_detaillist =  processedData;
          //来自plc的时间
          state.openinfo.plctime = res.getOvenPredict.plc_open_time===null?null:res.getOvenPredict.plc_open_time.substring(0, 16);
          state.form.currentdate = res.getOvenPredict.current_date;
          state.form.opentime = res.getOvenPredict.open_time
      
          const biz = res.getPredictBiz;
          
          userfeedback(state.openinfo.id);

          
          state.loading = true;
        
            if (biz == 0) {
              state.openinfo.error = false;
              navbar.setTitle(t('tabbar.detailform'));
            }
            if (biz < 0) {
            navbar.setTitle(t('tabbar.error'));
            state.errormsg = locale.value == 'zh-cn' ? res.getOvenPredict.errorMsgCN : res.getOvenPredict.errorMsg;
            state.openinfo.error = true;
            }
      }

  async function faultreasons() {
          const res= usePredcitDetailStore();
          await res.runreasons();
          state.columns = res.getFaultReasons.map((item) => {
              return {
                value: item.fault_code,
                text: locale.value == 'zh-cn' ? item.desc_cn : item.desc_en,
              };
            })
       }

  async function userfeedback(param) {
    
    const params = {
      result_id: param
    };
          const res= usefeedback();
          await res.runfeedback(params);
          if (res.getFeedback.replace===1){
            state.form.accept=res.getFeedback.accept_result;
            state.form.currentdate=res.getFeedback.currentdate;
            state.form.opentime= res.getFeedback.opentime;
            state.form.reason=res.getFeedback.fault_code;
          }
       }
  
  async function resetfeedback() {
    const res=usefeedback()
    await res.resetfeedback();
    state.form.accept=res.getFeedback.accept_result;
    state.form.currentdate=res.getFeedback.currentdate;
    state.form.opentime= res.getFeedback.opentime;
    state.form.reason=res.getFeedback.fault_code;
    }




  //选择的原因拿出来用于显示在前台
  const reasontext = computed(() => {
    var temptext ='';
    state.columns.map((item) => {
      if (state.form.reason == item.value) {
        // temptext.id= item.value;
        temptext= item.text;
      }
    });
  return temptext
  ;
  });

 

  const submit = async () => {
    if (state.form.accept == '') {
      // showToast.text('Please select whether accept the result');
      showToast(t('btn.plsfill2'));
      return false;
    }
    if (state.form.opentime == '') {
      showToast(t('btn.plsfill1'));
          return false;}
    
    if ( state.status == 2 && state.form.reason == null) {
   
      showToast(t('btn.plsfill3'));
      return false;
    } 

    
    //把用户的数据收集上来提交
    const postdata = {
      accept_result: state.form.accept == 1? true:false,
      manual_open_time: state.form.currentdate +" "+ state.form.opentime,
      fault_type_code: state.form.accept == 1?null:state.form.reason,
      result_id: state.openinfo.id,
    };
  //  console.log(postdata);
   
    
    // const res= usefeedback();    
    // res.setfeedback(postdata.accept_result,postdata.manual_open_time,postdata.fault_type_code);

    

    await ADDfeedback(postdata).then((res) => {

      
      if (res.bizCode == 0) { 
        showToast(t('btn.opsuccess'));
        setTimeout(() => {
          //   location.reload();
        }, 1000);
      }
    });
  

  };

 
 
  
  
//用于选择日期后在框中显示的日期样式
  const onConfirmdate = ({ selectedValues }) => {
    let date = selectedValues[0] + '-' + selectedValues[1] + '-' + selectedValues[2];
    state.form.currentdate = date; //赋值给input
    state.showopendate = false;
  };
  
  //用于选择日期后在框中显示的时间样式
  const onConfirmtime = ({ selectedValues }) => {
    let time = selectedValues[0] + ':' + selectedValues[1];
    state.form.opentime = time; //赋值给input
    state.showopentime = false;
  };
 //用于选择不接受原因呢后在框中显示的原因样式
  const onConfirm = ({ selectedValues }) => {
    state.form.reason = selectedValues[0];
    state.showReason = false;
  };


//点击更多，显示的烘炉温度明细弹窗
  const showtip = () => {
    var info = '';
    state.openinfo.oven_detaillist.map((item) => {
      info += ` ${item.name}:  ${item.value}\n`;
    });

    showDialog({
      title: t('predict.oventemdetail'),
      message: info,
      width: '240px',
      messageAlign:'left',
      confirmButtonText: t('btn.confirm'),
      
    });
  };




  
//用于判断不接受预测的原因是否显示  如果不接受 state.status = 2
  const writecache = () => {
    if (state.form.accept == 1) {
      state.status = 1;
    } else if(state.form.accept == 2){
      state.status = 2;
    }
    
    useCookies().set('accept', state.form.accept);
  };



  onMounted(async () => { 

  resetfeedback();
  faultreasons();
  ovenPlan();
  ovenName();
  ovenPredict() ;

  
 
  

      
  
  });

</script>
<style lang="scss" scoped>
  .toast {
    z-index: 10000 !important;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 40px;

    img {
      width: 90px;
      height: 90px;
    }
  }
  .chart-con-inner{
    text-align: left;
}
  .chart-con {
    width: 100%;
    box-sizing: border-box;

    .chart-wrap {
      width: 100%;
      box-sizing: border-box;
      background-color: #ffffff;
      padding: 16px 0px;
      border-radius: 10px;

      .title {
        box-sizing: border-box;
        width: 100%;
        padding: 0px 14px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }

      .ver-line {
        height: 40px;
        width: 5px;
        border-radius: 5px;
        background-color: #476D3B;
      }

      .title-desc {
        color: #222222;
        margin-left: 11px;
        font-weight: bold;
      }

      .ring-chart {
        height: 200px;
        width: 100%;
        box-sizing: border-box;
        padding: 0px 14px;
        margin-top: 16px;
      }

      .line-chart-con {
        width: 100%;
        box-sizing: border-box;
        padding: 0px 14px;
        margin: 20px 0px;
      }
    }
  }

  .custom-row {
    align-items: center;
    text-align: left;
    padding-top: 40px;
   
    
  }

  .flex-col {
    display: flex;
  }

  .padding-col {
    text-align: left;
    

    // margin: auto;
    // padding: auto;
  }

  .custom-tag {
    width: 100%;
    // text-align: center;

    // padding-right: 0px;
    // padding: auto;
    color: black;
    border-radius: 5px;
    background-color: #ffffff;
    
  }

  .text-col {
    text-align: left;
    padding: 0px;
  }

  .van-cell-group--inset {
    border-radius: 5px;
    border: 1px solid;
    margin: 0px;
  }

  .content {
    padding: 16px 16px 160px;
  }
  .van-toast--text {
    background: rgba(0, 0, 0, 0.7) !important;
  }

  .dots-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 100%;
}

.dot {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 11px;
  background-color: #b3d4fc;
  animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
  margin-right: 0;
}

.dot:nth-child(1) {
  animation-delay: -0.3s;
}

.dot:nth-child(2) {
  animation-delay: -0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.1s;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }

  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }

  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
}
</style>
