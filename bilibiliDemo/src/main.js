import Vue from 'vue'
import App from './App.vue'

//引入路由器
import router from './router'
Vue.config.productionTip = false

//引入ElementUI插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入二次封装axios
import axios from "./api/axios";
Vue.prototype.axios = axios;

// 引入仓库（Vuex相关
import store from '@/store'

//统一引入api文件夹里面全部请求函数
import * as API from '@/api';

import '@/assets/js/rem.js'


new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;

//统一接收api文件夹里面全部请求函数的挂载到vue原型对象上
    Vue.prototype.$API=API;
  },
  router,
  store
}).$mount('#app')
