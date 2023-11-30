import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/i18n';
import router from '@/router';
import store from '@/store';
import './assets/font/iconfont.css';
import './assets/app.css';
import '@icon-park/vue-next/styles/index.css';
import 'vant/lib/index.css';

import * as echarts from 'echarts'
const app = createApp(App);
app.provide('$echarts', echarts)

import { Loading } from 'vant';
app.use(Loading);
// 路由
app.use(router);
// 国际化
app.use(i18n);

// 状态管理
app.use(store);

app.mount('#app');
