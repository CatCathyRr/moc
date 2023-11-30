import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

// import {defineStore} from 'pinia'
// import {IndexData, CurrentPlan, CurrentPredict} from '../api/index'

// const res = await IndexData();

// const params = {
//   site: 'VCTZ',
//   shop: 'LQB',
//   oven_type: '',
// };



// export const useOvenStore = defineStore('state',{
//   state: () => {
//     return {
//       namecn: "",
//       status: 0,
//     }
//   },

//   getters: {
//     getovenstatus: store=>store.status,
//     getname: store=>store.namecn,
//   },

//   actions: {
    
//     async run(ovenIndex:number) {
   
//       const oven = res.ovens[ovenIndex]
//       params.oven_type = oven.oven_type
//       this.namecn = oven.name_cn ;
      
//       if (oven.online == 0){
//         this.status = 1
        
//         //1 未上线
//       }
//       else{
             
//         const plan = await CurrentPlan(params);

//         if(plan==undefined){
//           // ERROR: 名字不匹配
//         }
//         else if (plan?.bizCode < 0 ){
//           this.status = 2
//           //2 上线非生产日
//         }
//         else if (plan?.bizCode > 0 ){
//           // ERROR: Crrent Plan bizCode大于0
//         }
//         else{

//           const predict = await CurrentPredict(params)
          
//           if(predict==undefined){
//             // ERROR: 名字不匹配
//           }
//           else if(predict?.bizCode == 0){

//             this.status = 3            
//             //预测成功

//           }
//           else if(predict?.bizCode == 1){
//             this.status = 4
//             //预测未开始
//           }
//           else if(predict?.bizCode < 0){
//             this.status = 5 
//              //预测错误
             
//           }
//           else {
//               this.status = 0
//           }
          
//         }
//       }
      
//     }
//   }
// })


