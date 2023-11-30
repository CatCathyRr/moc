import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const store = createPinia();
store.use(piniaPluginPersistedstate);

export default store;

import {defineStore} from 'pinia'
import {GETfeedback} from '../../api/index'



export const usefeedback = defineStore('feedback',{
  state: () => {
    return {
      feedback: {
        "result_id": null,
		    "accept_result": null,
	    	"currentdate": "",
        "opentime":'',
	    	"fault_code": null,
        "replace":0,
        // "submit":0,

		    // "accept_result_submit": null,
	    	// "currentdate_submit": "",
        // "opentime_submit":'',
	    	// "fault_code_submit": null,


      }
        
    }
  },

  getters: {
    getFeedback: store=>store.feedback,
  },

  actions: {

    async runfeedback(params){

      const res = await GETfeedback(params);

      
      if(res.feedback!=null ){
      this.feedback.result_id=res.feedback.result_id;
      this.feedback.accept_result=res.feedback.accept_result===0? 2: 1;
      this.feedback.fault_code=res.feedback.fault_code===0?null:res.feedback.fault_code; 
      this.feedback.currentdate= res.feedback.manual_start_time.split(' ')[0];
      this.feedback.opentime=res.feedback.manual_start_time.split(' ')[1].substring(0, 5);
      this.feedback.replace = 1;
    } 
    },
    resetfeedback(){
      const feedbacknull = {
        "result_id": null,
		    "accept_result": null,
	    	"currentdate": "",
        "opentime":'',
	    	"fault_code": null,
        "replace":0,
      };
      this.feedback=feedbacknull;

    }

  }
})