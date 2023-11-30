<style lang="scss" scoped>
.toast {
  z-index: 10000 !important;
}

.chart-con-inner {
  text-align: left;
}

.chart-con {
  // width: 100%;
  box-sizing: border-box;
  background-color: white;

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
<template  style="background-color: #EBEBEB;">
  <div class="dots-container" style="margin-top: 90%;color: #6793fb;" v-if="!state.loading">{{ $t('tabbar.loading') }}</div>
   <section class="dots-container" style="margin-top: 5%;" v-if="!state.loading">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>

  <div style="height: 845px;background-color: #EBEBEB; " v-if="state.loading">
    <!-- <van-loading size="24px" vertical v-if="!state.loading">{{ $t('tabbar.loading') }}</van-loading> -->

    <div style="padding: 20px 20px" >
      <!-- 主副标题 -->
      <div class="chart-con"
        style="background-color: white ;margin-bottom: 20px; color:#000000;text-align: center;border-radius:5px">
        <div style="padding: 16px;">
          <div>
            <h3>{{ state.openinfo.oven }}</h3>
          </div>
          <div style="padding-top: 5px">
            <h3>{{ $t('predict.pop') }}</h3>
          </div>
        </div>
      </div>

      <!-- 开机时间注意 -->

      <div class="chart-con" style=" text-align: center;border-radius:5px">
        <div class="chart-con-inner" style="padding: 0px;">
          <div style=" padding: 16px; border-bottom-style:solid;border-width: 1px; color:#000000;border-color: #f1f1f1;">
            <span style="font-weight: bold;">{{ $t('tabbar.detail') }}:</span></div>
          <div style="padding: 16px;">
            <div>
              <div style="font-size: 14px;font-weight: bold;color:#000000">{{ $t('predict.ptt') }}</div>
              <div style="font-size: 14px;color:  #476d3b;padding:10px 0px;">{{ state.openinfo.plan_time }}</div>
            </div>
            <div style="padding: 8px 0px;">
              <div style="font-size: 14px; font-weight: bold;color:#000000"> {{ $t('predict.ptha') }}</div>
              <div style="font-size: 14px;color:  #476d3b; padding:10px 0px 0px 0px; ">{{ state.openinfo.predict_time }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 开机时间模块    -->
      <!-- <div class="chart-con" style=" text-align: center; background-color:white;padding: 0px 16px 16px 16px;">

        <div style="background-color: white; border: 1px solid #000000; height: 70px; line-height: 70px; border-radius: 5px">
          <span style="width: 100%; color: #476d3b;"> 预测状态：</span>
          <span style="font-weight: 800;color:#000000"> {{ $t('predict.ns') }}</span>
        </div>
      </div> -->
    </div>
  </div>

</template>

<script lang="ts" setup name="DetailPage">

import { useI18n } from 'vue-i18n';
import { useNavBarStore } from '@/store/modules/user';
import { usePredcitDetailStore } from '@/store/modules/predictinfo';
const navbar = useNavBarStore();
const { locale, t } = useI18n();

const state = reactive({
  openinfo: {
    plan_time: '',
    predict_time: '',
    error: false,
    oven: '',
  },
  columns: [],
  loading: false,
});


const router = useRouter();

async function ovenName() {
      const oventype = router.currentRoute.value.query.oven_type;
      // const oventype = 'EDO';
      const res= usePredcitDetailStore();
      await res.runoven(oventype);
      state.openinfo.oven= locale.value == 'zh-cn' ?res.getOvenName.cn:res.getOvenName.en;
      debugger;
      state.loading = true;
      }

async function ovenPlan() {
      const oventype = router.currentRoute.value.query.oven_type;
      // const oventype = 'EDO';
      const res= usePredcitDetailStore();
      await res.runplan(oventype);
          state.openinfo.plan_time = res.getOvenPlan.plan_time;
          state.openinfo.predict_time = res.getOvenPlan.predict_time;
      }

  onMounted(async () => {

    ovenPlan();
    ovenName();
    navbar.setTitle(t('tabbar.detail'));
   
  });
  </script>

