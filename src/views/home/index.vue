<template>
 <div v-if="state.showstatus===0"> </div>
 <div v-if="state.showstatus===1">
  <div style="text-align: right ;margin-top: 20px;"
    ><div class="btn-wrap">
      <nut-button
        shape="square"
        size="small"
        type="default"
        :class="['language-button', { selected: 'zh-cn' === selectedLang }]"
        @click="changeLang('zh-cn')"
      >
        {{ $t('language.zh') }}
      </nut-button>
      <nut-button
        shape="square"
        size="small"
        type="default"
        :class="['language-button', { selected: 'en-us' === selectedLang }]"
        @click="changeLang('en-us')"
      >
        {{ $t('language.en') }}
      </nut-button>
    </div></div
  >
  <!-- 标题 -->
  <div class="header" >{{ $t('taizhou') }}</div>
  <div class="header" style="margin-top: 20px ;">{{ $t('title') }}</div>
  <!-- 四张烘房图片 -->
  <div style="padding-top: 10px;" >
    <div style="padding: 0 10px">
      <van-row style="margin-top: 60px;">
        <template v-for="(item) in state.ovenlist" :key="index">
          <van-col span="12" style="padding: 10px 10px 10px 10px;" v-if="item.online == 1">
            <div class="ovenonline" @click="clickOven(item)">
              <div class="covertext">
                <div v-if="selectedLang =='zh-cn'">{{ item.name_cn }}</div>
                <div v-if="selectedLang =='en-us'">{{ item.oven_type }}</div>
              </div>

            </div></van-col
          >
          <van-col span="12" style="padding: 10px 10px 10px 10px;" v-if="item.online == 0">
            <div class="ovencoming" @click="clickOven(item)">
                <div class="coming">
                  {{ $t('home.coming') }}
                </div>
              
              <div class="covertextcom">
                <div v-if="selectedLang =='zh-cn'">{{ item.name_cn }}</div>
                <div v-if="selectedLang =='en-us'">{{ item.oven_type }}</div>
              </div>
            </div></van-col
          >
        </template>
      </van-row>
    </div>
  </div>
  <div class="version">v: 2023.11.13 input done </div>
</div>


 


  
</template>

<script lang="ts" setup name="HomesPage">
  import { computed } from 'vue';
  import { useNavBarStore } from '@/store/modules/user';
  import { useOvenListStore } from '@/store/modules/ovenlist';
  import {  showToast } from 'vant';
  import { setLang } from '@/i18n';
  import { useI18n } from 'vue-i18n';


const state = reactive(
{
  ovenlist:[],
  status:0,
  showstatus:0,
} )



//从 store 获得 ovenlist 
async function fetchOven() {
const resList= useOvenListStore()
await resList.run();
state.ovenlist = resList.getOvenList;
}



//点击后从store 获得每个oven的状态，并对应触发action
async function clickOven(item: any) {
const resList= useOvenListStore()

await resList.runitem(item.id-1);
state.status  = resList.getClickOvenstatus;

switch (state.status) {
  case 1:
    showToast(t('home.coming'));
    break;
  case 2:
    showToast(t('btn.notproday'));
    break;
  case 3:
  case 5:
    router.push({
      path: '/detailform',
      query: {
        oven_type: item.oven_type,
      },
    });
    break;
  case 4:
    router.push({
      path: '/detail',
      query: {
        oven_type: item.oven_type,
      },
    });
    break;
  default:
    console.log('Unknown status:', state.status);
}
}


  //使用路由
  const router = useRouter();

  //变更语言
  const changeLang = (type) => {
    setLang(type);
  };

  //获得当前选择的语言
  const selectedLang = computed(() => {
    const { locale } = useI18n();
    return locale.value;
  });

  //设置导航栏
  const navbar = useNavBarStore();
  const { locale, t } = useI18n();

  //导航栏的标题中英变动
  navbar.setTitle(t('title'));
  watch(
    () => locale.value,
    () => {
    
        navbar.setTitle(t('title'));
    },
  );


  onMounted(() => {

    fetchOven();
    state.showstatus= 1;
    
  });

</script>
<style lang="scss" scoped>




  .btn-wrap {
    position: relative;
    margin: 20px;
    padding-right: 20px;
  
  }

  .language-button.selected {
    background-color: #ced9e5;
    color:#1c6bba; /* You can adjust the text color as needed */
    font-family: VolvoNovum-Regular;
    border: #fff;
    border-radius: 5px;
    width: 80px;
  }
  .language-button {
    background-color:#fafafa;
    color: #707070; /* You can adjust the text color as needed */
    font-family: VolvoNovum-Regular;
    border: #fff;
    border-radius: 5px;
    width: 80px;
  }
  .coming {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    text-align: center;
    color: #a3a3a3;
    font-family: VolvoNovum-Regular;
  }
  .covertext {
    font-size: 36px;
    margin-top: 38%;
    text-align: center;
    font-family: VolvoNovum-Regular;
    color:white ;

  }
  .covertextcom {
    font-size: 36px;
    margin-top: 38%;
    text-align: center;
    font-family: VolvoNovum-Regular;
    color:#7089ac;

  }
  .version{  
    text-align: right;padding-right: 30px;margin-top: 80px;font-family: VolvoNovum-Regular;color: #d5d5d5;font-size: 12px;
  }


  .header{
    margin-top: 80px; margin-bottom: 60px;width: 100%;height: 30px; text-align: center; font-size: 48px;font-family: VolvoNovum-Regular;
  }

  .ovenonline{
    height:290px ;padding: 10px ;background-color:#7089ac;border-radius: 10px;
  }


  .ovencoming{
    height:290px ;padding: 10px ;background-color: #ebebeb;;border-radius: 10px;position: relative;
  }
</style>
