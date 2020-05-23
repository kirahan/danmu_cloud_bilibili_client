import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import axios from 'axios'

Vue.prototype.$http = axios.create({
  baseURL : 'http://localhost:3009',
  // baseURL : 'https://api.bilibili.com/x/',
  headers :{
    "Content-Type":"text/html;charset=UTF-8",
  }
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
