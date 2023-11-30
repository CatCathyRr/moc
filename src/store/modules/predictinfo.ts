import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia'
import {Faultdata, IndexData, CurrentPlan, CurrentPredict} from '../../api/index'

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
function formatTime (time)  {
  const a = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
  const result= time.match(a);
  const hour = result[4];
  const minute = result[5];
  return `${hour}:${minute}`;
};
function formatDateString (time)  {
  const a = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
  const result= time.match(a);
  const year = result[1];
  const month = result[2];
  const day = result[3];
  return `${year}-${month}-${day}`;
};


const params = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  // debug_time:'2023-10-20 00:00:00',

};

export const usePredcitDetailStore = defineStore('predictinfo',{
  state: () => {
    return {
      ovenPredict: {
        "errorMsg":'',
        "errorMsgCN":'',
        "errorCode":'',
        "id": '',
		    "last_close_time": '',
	    	"data_time": '',
        "predict_open_time": '',
        "predicted_temp_incr_time": '',
        "plc_open_time": '',
        "temp": null,
        "humid":null,
        "oven_detail": [
         { 'name':'','value':null}
        ],
        "oven_detail1st":null,
        "current_date":'',
        'open_time':'',
      },
      ovenPlan:{
        "plan_time": "",
        "predict_time": "",
        "current_time": ""
      },
      PredictBiz:-1,
      ovenName:{
        'cn':'',
        'en':''
      },
      reasons:[],
    }
  },

  getters: {
    getOvenPredict: store=>store.ovenPredict,
    getPredictBiz: store=>store.PredictBiz,
    getOvenPlan: store=>store.ovenPlan,
    getOvenName:store=>store.ovenName,
    getFaultReasons:store=>store.reasons,
  },

  actions: {
    async runpredict(oventype:string) {
      params.oven_type=oventype
      const res = await CurrentPredict(params);
      const ovendetail= res.predict_info;
      const biz =res.bizCode;
      if(res.bizCode < 0){
        this.ovenPredict.errorMsg=res.errorMsg;
        this.ovenPredict.errorMsgCN=res.errorMsgCN;
        this.ovenPredict.errorCode=res.errorCode
      }
      this.ovenPredict.id= ovendetail.id; 
      this.ovenPredict.last_close_time= ovendetail.last_close_time; 
      this.ovenPredict.data_time= ovendetail.data_time; 
      this.ovenPredict.predict_open_time= ovendetail.predict_open_time; 
      this.ovenPredict.predicted_temp_incr_time= ovendetail.predicted_temp_incr_time+'min'; 
      this.ovenPredict.plc_open_time= ovendetail.plc_open_time; 
      this.ovenPredict.current_date=this.ovenPredict.plc_open_time == null ? formatDate(new Date()):formatDateString(this.ovenPredict.plc_open_time);
      this.ovenPredict.open_time=this.ovenPredict.plc_open_time ==null ? '' : formatTime(this.ovenPredict.plc_open_time).substring(0, 5);
      this.ovenPredict.temp = ovendetail.temp === null ? '' : parseFloat(ovendetail.temp).toFixed(1) + '°C'; 
      this.ovenPredict.humid=ovendetail.humid=== null?'': (parseFloat(ovendetail.humid) * 100).toFixed(1)+'%';; 
      this.ovenPredict.oven_detail= ovendetail.oven_detail.map((item) => {
        const roundedValue = item.value !== null ? item.value.toFixed(1) : null;
        const rvalue= roundedValue=== null? null:`${roundedValue}°C`;
        return { name: item.name, value: rvalue };
        });
      this.ovenPredict.oven_detail1st=this.ovenPredict.oven_detail[0]['value']=== null ? '' :this.ovenPredict.oven_detail[0]['name']+':'+this.ovenPredict.oven_detail[0]['value'];
      
      this.PredictBiz = biz     
        },
  
    async runplan(oventype:string) {
      params.oven_type=oventype
      const res = await CurrentPlan(params);
      const ovenplan= res.plan_info
      this.ovenPlan.plan_time= ovenplan.plan_time;
      this.ovenPlan.predict_time= ovenplan.predict_time;
      this.ovenPlan.current_time= ovenplan.current_time;
            },

    async runoven(oventype:string){
      const ovens = await IndexData();
          for (let i = 0; i < ovens.ovens.length; i++) {
             if (ovens.ovens[i].oven_type === oventype) {
                 this.ovenName.cn= ovens.ovens[i].name_cn;
                 this.ovenName.en= ovens.ovens[i].name_en;
               break;
               }
          }
    },

    async runreasons(){
    const res = await Faultdata();
    this.reasons = res.types;
    }
  }
})