import indexPage from '../pages/index/index.vue'
import dynamic from '../pages/dynamic/dynamic.vue'
import personInit from '../pages/personCenter/personInit.vue'
import vipPurchase from '../pages/vipPurchase/vipPurchase.vue'
import recommend from '../pages/index/recommend.vue'
import liveStreaming from '../pages/index/liveStreaming.vue'
import serialNumber from '../pages/index/serialNumber.vue'
import Login from '@/pages/personCenter/login.vue'
import Search from '@/pages/index/search/search.vue'


export default [
    {
        //初始页面路由设置
        path: '',
        redirect: '/indexpage'
    },
    {
        path: '/indexpage',
        component: indexPage,
        meta: {
            topshow: true,
            footershow: true
        },
        children: [
            {
                path: '',
                redirect: 'recommend',
                meta: { topshow: true, footershow: true },
            },
            {
                path: 'recommend',
                component: recommend,
                meta: { topshow: true,footershow: true },
            },
            {
                path: 'liveStreaming',
                component: liveStreaming,
                meta: { topshow: true , footershow: true},
            },
            {
                path: 'serialNumber',
                component: serialNumber,
                meta: { topshow: true, footershow: true },
            },
            //  {
            //     path: 'details/:id',
            //     component: Details,
            //     meta: { topshow: false, footershow: true },
            //        //传给页面的路由参数的id
            //        props:true
            // },
        ]
    },
    {
        path: '/dynamic',
        component: dynamic,
        meta: { topshow: false , footershow: true},
    },
    {
        path: '/personinit',
        component: personInit,
        meta: { topshow: false , footershow: true},
    },
    {
        path: '/vippurchase',
        component: vipPurchase,
        meta: { topshow: false, footershow: true },
    },
    {
        path: '/search',
        component: Search,
        meta: { topshow: false, footershow: false },
    },
    {
        path: '/login',
        component: Login,
        meta: { topshow: false, footershow: true },
    },
   
]