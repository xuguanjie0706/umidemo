export default [
  {
    path: '/',
    component: '@/layouts/SecurityLayout',
    routes: [
      {
        path: 'login',
        component: '@/layouts/Login',
      },
      {
        path: '/',
        component: '@/layouts/index',
        routes: [
          {
            path: '/',
            redirect: '/clinic/doctor',
          },
          {
            path: 'home',
            component: '@/pages/Home',
          },
          {
            path: 'clinic',
            icon: 'icon-folder-add',
            name: '安愈诊室',
            routes: [
              {
                path: 'doctor',
                name: '医生管理',
                component: '@/pages/DoctorView',
              },
              {
                path: 'doctorEidt/:id',
                name: '医生编辑',
                component: '@/pages/DoctorView/Detail',
                hideInMenu: true,
              },
              {
                path: 'reservation',
                name: '预约时间',
                component: '@/pages/ReservationView',
              },
              {
                path: 'reservationEidt/:id',
                name: '医生编辑',
                component: '@/pages/ReservationView/Detail',
                hideInMenu: true,
              },
              {
                path: 'reservationtime',
                name: '服务时间',
                component: '@/pages/ReservationTime',
              },
            ],
          },
          {
            path: 'user',
            icon: 'icon-user',
            name: '用户管理',
            routes: [
              {
                path: 'memberinfo',
                name: '会员信息',
                component: '@/pages/MemberInfo',
              },
              {
                path: 'healthdata',
                name: '健康数据',
                component: '@/pages/HealthData',
              },
            ],
          },
          // {
          //   path: 'operating',
          //   icon: 'icon-deploymentunit',
          //   name: '运营工具',
          //   routes: [
          //     {
          //       path: 'pushview',
          //       name: '消息推送',
          //       component: '@/pages/pushView',
          //     },
          //     {
          //       path: 'pushviewEdit/:id',
          //       name: '推送编辑',
          //       component: '@/pages/pushView/Detail',
          //       hideInMenu: true,
          //     },
          //   ],
          // },
          {
            path: 'operating',
            icon: 'icon-deploymentunit',
            name: '运营工具',
            routes: [
              {
                path: 'pushmessage',
                name: '消息推送',
                component: '@/pages/PushMessage',
              },
              {
                path: 'pushmessageEdit/:id',
                name: '推送编辑',
                component: '@/pages/PushMessage/Detail',
                hideInMenu: true,
              },
            ],
          },
          {
            component: '@/layouts/404',
          },
        ],
      },
      {
        component: '@/layouts/404',
      },
    ],
  },
  {
    component: '@/layouts/404',
  },
];
