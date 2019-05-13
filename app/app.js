import Vue from 'vue';

import router from './router'
import store from './store/index';
import {duration, released} from './filters'

import App from './App.vue';

Vue.filter('duration', duration);
Vue.filter('released', released);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
