import Vue from 'vue';
import Router from 'vue-router';

const Discovery = () => import("../components/Discovery.vue");

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Discovery',
      component: Discovery
    }
  ]
})
