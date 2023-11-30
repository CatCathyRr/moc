import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia'
import {IndexData, CurrentPlan, CurrentPredict} from '../../api/index'


const params = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  // debug_time:'2023-10-20 00:08:08',
};

export const useOvenListStore = defineStore('ovenlist',{
  state: () => {
    return {
      ovenlist: [],
      status:0,
    }
  },

  getters: {
    getOvenList: store=>store.ovenlist,
    getClickOvenstatus: store=>store.status,
  },

  actions: {
    async run() {
      const res = await IndexData();
      const oven = res.ovens
      this.ovenlist= oven;    
        },
  
    async runitem(ovenIndex: number) {
      const oven = this.ovenlist[ovenIndex]
      params.oven_type = oven.oven_type
    
      const isOnline = oven.online
      // const plan = await CurrentPlan(params)
      // const predict = await CurrentPredict(params)
    
      if (isOnline == 0){
        this.status = 1 }
        else{
          const plan = await CurrentPlan(params)

          if(plan==undefined){
            // ERROR: 名字不匹配
          }
          else if (plan?.bizCode < 0 ){
            this.status = 2
            //2 上线非生产日
          }
          else if (plan?.bizCode > 0 ){
            // ERROR: Crrent Plan bizCode大于0
          }
          else{ const predict = await CurrentPredict(params)

            if(predict==undefined){
              // ERROR: 名字不匹配
            }
            else if(predict?.bizCode == 0){
  
              this.status = 3            
              //预测成功
  
            }
            else if(predict?.bizCode == 1){
              this.status = 4
              //预测未开始
            }
            else if(predict?.bizCode < 0){
              this.status = 5 
               //预测错误
  
            }
            else {
                this.status = 0
            }
  
          }
        }
    }
    
      }
    })



   