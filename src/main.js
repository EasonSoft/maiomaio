// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'
import vuex from 'vuex'


Vue.config.productionTip = false
 
import axios from 'axios'
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.axios = axios
// step3：使每次请求都会带一个 /api 前缀 
// axios.defaults.baseURL = '/api'  

import Scroller from '@/components/Scroller'
Vue.component('Scroller' , Scroller);

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

import MessageBox from '@/components/JS/MessageBox'
Vue.component('MessageBox',MessageBox)

// import VueTouch from 'vue-touch'
// Vue.use(VueTouch, {name: 'v-touch'})
/* eslint-disable no-new */

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(vuex);
new Vue({
  el: '#app',
  router,axios,store,
  components: { App },
  template: '<App/>'
})
