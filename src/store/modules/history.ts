import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia';
import { HistoryList,HistoryKpi,HistoryOnlineDays } from '../../api/index';
import { showToast } from 'vant';



const params = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  start:'2023-10-19 00:00:00',
  end:'2023-12-09 00:00:00'
};
const params2 = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',

};



export const useHistoryListStore = defineStore('historylist',{
  state: () => {
    return {
     
     historyplan:[],
     historykpi:[],
     historydays:[]
    }
  },



  getters: {
    getHistoryList: store=>store.historyplan,
    getHistoryKpi: store=>store.historykpi,
    getHistoryDays: store=>store.historydays
  },

  actions: {
    async runHistory(oventype:string,start:string,end:string) {
    params.oven_type=oventype
    params.start = start
    params.end = end
    const res = await HistoryList(params);
    const historydetail= res.historylist;
    this.historyplan=historydetail
  },
    async runHistoryKpi(oventype:string,start:string,end:string) {
      params.oven_type=oventype
      params.start = start
      params.end = end
      const res = await HistoryKpi(params);
      const historydetail= res.historykpi;
      this.historykpi=historydetail
    },
    async runHistoryDays(oventype:string) {
      params2.oven_type=oventype
      const res = await HistoryOnlineDays(params2);
      const historydetail= res.days;
      this.historydays=historydetail
      const date:string = this.historydays["StartDate"];
      this.historydays["StartDate"]= date.slice(0,10);
       
    },


}



})




  