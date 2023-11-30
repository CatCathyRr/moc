export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/basic/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'title',
          keepAlive: false,
        },
      },
      {
        path: 'detail',
        component: () => import('@/views/home/detail.vue'),
        meta: {
          title: 'title',
          keepAlive: false,
        },
      },
      {
        path: 'detailform',
        component: () => import('@/views/home/detailform.vue'),
        meta: {
          title: 'title',
          keepAlive: false,
        },
      },
      //输入：
      {
        path: 'input',
        component: () => import('@/views/home/detailinput.vue'),
        meta: {
          title: 'tabbar.input',
          keepAlive: false,
        },
      },

      //分析
      {
        path: 'analysis',
        component: () => import('@/views/home/ana.vue'),
        meta: {
          title: 'tabbar.analysis',
          keepAlive: false,
        },
      },

      // {
      //   path: 'list',
      //   component: () => import('@/views/list/index.vue'),
      //   meta: {
      //     title: 'tabbar.list',
      //     keepAlive: true,
      //   },
      // },
      {
        path: 'member',
        component: () => import('@/views/member/index.vue'),
        meta: {
          title: 'tabbar.member',
          keepAlive: false,
        },
      },
      {
        path: 'demo',
        component: () => import('@/views/demo/index.vue'),
        meta: {
          title: 'tabbar.demo',
          keepAlive: false,
        },
      },
      {
        name: 'listDetails',
        path: '/details',
        component: () => import('@/views/list/details/index.vue'),
        meta: {
          title: 'list.details',
          border: false,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/Home',
  },
];

export default routes;
