import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia'
import {PlanData, AddPlanData,PostPlanData, DeletePlanData} from '../../api/index'
import { showToast } from 'vant';

const getFormatedCurrentTime = (dateinput) => {
  const now = dateinput;
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  const datetime =  year+'-' + month +'-'+ day +' '+ hours +':'+ minutes ;
  const date =  year+'-' + month +'-'+ day;
  const time =hours +':'+ minutes
  return {
    time,
    date,
    datetime,
  }
};
const now = getFormatedCurrentTime(new Date());
const today = now.date;

const params = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  // debug_time:'2023-10-20 00:08:08',
};




const paramdelete = {
  id:'',
};

const paramsadd = {
  site: 'VCTZ',
  shop: 'LQB',
  oven_type: '',
  plan_time:'',
};

const paramspost = {
  id:'',
  plan_time:'',
};

export const usePlanListStore = defineStore('planlist',{
  state: () => {
    return {
      plans: [],
      plansnew: [], 

    }
  },

  getters: {
    getplanList: store=>store.plansnew,
  },

  actions: {

    async runplan(oventype) {
      params.oven_type = oventype;
      const res = await PlanData(params);
      const list = res.plans;
      console.log(`当前的plan是`);
      console.log(list);
  
    //该烘房没有生产计划时：
      if (list.length == 0){
      //先清空store,避免被别的烘房干扰
      var planlistlength = this.plans.length;
        for (var j=0;j< planlistlength;j++)
        { 
          this.plans.pop(); 
        };
      //补充今天的烘房
        this.plans[0] = {
          "id":  null,
          "site": params.site,
          "shop": params.shop,
          "oven_type": params.oven_type,
          "plan_date": today,
          "plan_time": '',
        }
        
        console.log("现在没有生产计划，所以补了今天的值");
        console.log(this.plans);  
      } 
    //该烘房有生产计划：直接赋值
      else{
      this.plans = res.plans;}
    //检查烘房的第一条是不是今天
      const firstplan= this.plans[0]["plan_date"]
      //如果不是今天，把今天补在第一条
      if ( firstplan !== today) {
        const Addtoday = 
        {
          "id":  null,
          "site": params.site,
          "shop": params.shop,
          "oven_type": params.oven_type,
          "plan_date": today,
          "plan_time": '',
          
        };
        this.plans.unshift(Addtoday);
      }
    
    //每个对象中增加time和action
    //因为plan_time  格式为 2023-10-20 00:08:08， 所以增加一个00:00 放到time
      for(var i in this.plans){
        const time:string = this.plans[i]["plan_time"];
        this.plans[i]["time"]=time.slice(11,16);
        this.plans[i]["action"] = 'save';
      };

    //把列表中不连续的都日期补齐，并存入this.plansnew

       const getNewDate = (time) => {
        let date = new Date(time).getTime() + 1000 * 60 * 60 * 24;
        let Y = new Date(date).getFullYear() + '-';
        let M =(new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1) + '-';
        let D =new Date(date).getDate() < 10 ? '0' + new Date(date).getDate() : new Date(date).getDate();
        return Y + M + D;
      };
       const pathDate = (dateArr) => {
        //　新日期数组
        let newDateArr = [];
        newDateArr.push(dateArr[0], dateArr[dateArr.length - 1]);
        let startDate = newDateArr[newDateArr.length - 2].plan_date;
        let endDate = newDateArr[newDateArr.length - 1].plan_date;
        let startStamp = new Date(startDate).getTime();
        let endStamp = new Date(endDate).getTime();
        let diffCounts = Math.abs(startStamp - endStamp) / 1000 / 60 / 60 / 24;
        // 得出倒数第二天和倒数第一天的相差天数，依次递减，直到相差１天，表示是相邻的两天
        for (let index = diffCounts; index > 1; index--) {
          //　根据时间戳得出应该往后加的日期
          getNewDate(newDateArr[newDateArr.length - 2].plan_date);
          //　把新的日期从倒数第二个位置追加到新日期数组
          newDateArr.splice(newDateArr.length - 1, 0, {
            id:null,
            site:'VCTZ',
            shop:'LQB',
            oven_type:oventype,
            plan_date: getNewDate(newDateArr[newDateArr.length - 2].plan_date),
            plan_time: "",
            time:"",
            action:"save",
          });
        }
        newDateArr.forEach((newItem) => {
          dateArr.forEach((oldItem) => {
            if (newItem.plan_date === oldItem.plan_date) {
              newItem.id = oldItem.id;
              newItem.plan_time=oldItem.plan_time;
              newItem.time=oldItem.time;
              newItem.action=oldItem.action;
            }
          });
        });
        function unique (arr) {
          return Array.from(new Set(arr))
          }
        
        console.log("这是补齐时间后的生产计划列表");
        
        console.log(newDateArr);
        
        this.plansnew=unique(newDateArr);

        console.log("这是去重后的列表");
        console.log(this.plansnew);
        
        
        //
      }
      pathDate(this.plans);

    // 对当前时间之前的行，设置为不可编辑
    // 判断这一行的生产时间是不是在当前时间之前
      for(var j in this.plansnew){
        const time:string = this.plansnew[j]["plan_time"];
        const date:string = this.plansnew[j]["plan_date"];
        var itemdatetime = new Date(time).getTime();
        var now =  new Date().getTime(); 
        var threeHoursBefore = new Date(itemdatetime);
        threeHoursBefore.setHours(threeHoursBefore.getHours() - 3);
        //time 为空判断 date ,date是今天就不能编辑
        if (time == ''){
          today === date ? this.plansnew[j]["noedit"]=true : this.plansnew[j]["noedit"]=false;
        }
        //time 有数据判断plan_time, 早于现在的时间就不能编辑
        else if(threeHoursBefore <= now){
          
           this.plansnew[j]["noedit"]=true }
        //其他情况可以编辑
        else {
           this.plansnew[j]["noedit"]=false;}
      };    
      },

    async addplan(oventype,plantime){
      paramsadd.plan_time = plantime;
      paramsadd.oven_type = oventype;
      console.log(paramsadd);
      
      const res  = await AddPlanData(paramsadd);
      res.bizCode == 0 ? console.log('Add succeed'):showToast('Add failed');
      ; 
      const params = {
        id:''
      }
      params.id = res.id
      return  params
      
      
    },

    async postplan(id,plantime){
      paramspost.plan_time = plantime
      paramspost.id = id;
      console.log(paramspost);
      const res  = await PostPlanData(paramspost);
      res.bizCode === 0 ? console.log('Post succeed'):showToast('Post Failed');
      ;
    },

    async deleteplan(id){
      paramdelete.id = id;
      console.log(paramdelete);
      const res  = await DeletePlanData(paramdelete);
      res.bizCode === 0 ? 
     console.log('Delete succeed'):showToast('Delete Failed');
      ;
    },

    // addblankplan(adddays:number){
    //   const len = this.plansnew.length;
    //   const maxdate = this.plansnew[len-1]['plan_date'];

    //   for (var j=0;j< adddays;j++){ 
    //     const Adddatelist = [{},];
    //     Adddatelist[j] = 
    //     {
    //       "id":  null,
    //       "site": params.site,
    //       "shop": params.shop,
    //       "oven_type": params.oven_type,
    //       "plan_date": (getNextDate(maxdate,j+1)),
    //       "plan_time": '',
    //       "noedit":false,
    //       "action":'save'
    //     };
    //     this.plansnew.push(Adddatelist[j]);
    //   }
    //   function getNextDate(date, day) { 
    //     var dd = new Date(date);
    //     dd.setDate(dd.getDate() + day);
    //     var y = dd.getFullYear();
    //     var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    //     var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    //     return y + "-" + m + "-" + d;
    //     };
    // },

    
    addeditblankplan(adddays:number, defaulttime){
      const len = this.plansnew.length;
      const maxdate = this.plansnew[len-1]['plan_date'];
      const de = defaulttime

      for (var j=0;j< adddays;j++){ 
        const Adddatelist = [{},];
        Adddatelist[j] = 
        {
          "id":  null,
          "site": params.site,
          "shop": params.shop,
          "oven_type": params.oven_type,
          "plan_date": (getNextDate(maxdate,j+1)),
          "plan_time": de,
          "noedit":false,
          "action":'save'
        };
        this.plansnew.push(Adddatelist[j]);
        console.log(this.plansnew);
        
      }
      function getNextDate(date, day) { 
        var dd = new Date(date);
        dd.setDate(dd.getDate() + day);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
        };
    }

    
    
  }})




  