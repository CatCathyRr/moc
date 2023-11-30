<template>
  <!-- <van-nav-bar :title="$t(navbar.title as string)" :left-arrow="!tabbarVisible" @click-left="goBack" /> -->
  <div class="main-page" >
    <RouterView v-slot="{ Component }"  v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
  <!-- <div style="border-bottom: black;height: 90px;"></div> -->
  <nut-tabbar class="tabbar" unactive-color="#707070" active-color="#1c6bba" bottom v-model="activeTab" v-show="tabbarVisible" @tab-switch="tabSwitch ">

      <nut-tabbar-item style=" height: 60px;  padding: 10px;" v-for="item in tabItem" :key="item.key" :tab-title="$t(`tabbar.${item.key}`)" :icon="item.icon" />

  </nut-tabbar>
  
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { useRouter } from 'vue-router';
  import {  Shop, Edit ,Category} from '@nutui/icons-vue';
  import { showToast} from 'vant';
  import { useI18n } from 'vue-i18n';
  // import { useNavBarStore } from '@/store/modules/user';
  // const navbar = useNavBarStore();
  const tabItem = [
    { key: 'home', icon: Shop},
    { key: 'input', icon: Edit },
    { key: 'analysis', icon: Category },
  ];

  const router = useRouter();

  const activeTab = ref(0);

  const tabbarVisible = ref(true);

  const showBorder = ref(true);

  const { t } = useI18n();

  watch(
    () => router,
    () => {
      const judgeRoute = tabItem.some((item) => item.key === router.currentRoute.value.path.replace('/', ''));
      activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
      tabbarVisible.value = judgeRoute;
      showBorder.value = judgeRoute;
    },
    { deep: true, immediate: true },
  );

  

  const tabSwitch = (_item, index) => {
    switch (index) {
      case 0:
        router.push('/home');
        break;
      case 1:
        router.push('/input');
        // showToast(t('home.develop'));
        break;
      case 2:
        router.push('/analysis');
        // showToast(t('home.develop'));
        
        break;
    }
    activeTab.value = index;
  };

  // const goBack = () => {
  //   router.push('/home')
  // };
  
</script>

<style scoped lang="scss">

  .main-page {
    box-sizing: border-box;
    // background-color: pink;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #eff2f5;
    font-family: VolvoNovum-Regular;
  }

  .tabbar {
    // height: calc(100vh - 92px);
    // background-color: pink;
    // border:1px black solid ;
    padding-bottom: 0px;
    font-family: VolvoNovum-Regular;
  }

  .border {
    // background-color: pink;
    padding-right: 0px;
    padding-left: 0px; 
    // border: solid black;

  }


  // 样式穿透
 ::v-deep .nut-tabbar-item_icon-box_nav-word{
    // background-color: pink;
    font-size: 28px;
    font-family: VolvoNovum-Regular;
  }

::v-deep .nut-tabbar{
    height: 140px;
  }
</style>
