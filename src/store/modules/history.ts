import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia';
import { } from '../../api/index';
import { showToast } from 'vant';



const params = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  // debug_time:'2023-10-20 00:08:08',
};



export const useHistoryListStore = defineStore('historylist',{
  state: () => {
    return {
      historyplan: [
        { id: 1234, 
          error:false,
          site: 'VCTZ', 
          shop: 'LQB', 
          oven_type: 'EDO', 
          plan_date: '2023-11-20',
          pred_diff:"3",
          pred_save:"30",
          accept:true,
        },
        { id: 1235, 
          error:false,
          site: 'VCTZ', 
          shop: 'LQB', 
          oven_type: 'EDO', 
          plan_date: '2023-11-21',
          pred_diff:"4",
          pred_save:"20",
          accept:true,
        },
        { id: 1235, 
          error:false,
          site: 'VCTZ', 
          shop: 'LQB', 
          oven_type: 'EDO', 
          plan_date: '2023-11-21',
          pred_diff:"10",
          pred_save:"13",
          accept:true,
        },
        { id: 1235, 
          error:true,
          site: 'VCTZ', 
          shop: 'LQB', 
          oven_type: 'EDO', 
          plan_date: '2023-11-21',
          pred_diff:"10",
          pred_save:"13",
          accept:false,
        },
      ],


    }
  },

  getters: {
    getHistoryList: store=>store.historyplan,
  },

  actions: {


    
    
  }})




  