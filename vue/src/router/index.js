import Vue from 'vue';
import Router from 'vue-router';
import Hpp from '@/components/hpp';
import DropIn from '@/components/dropIn';
import FullFeaturedCard from '@/components/fullFeaturedCard';
import SplitCard from '@/components/splitCard';
import Wechat from '@/components/wechat';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/dropin',
      name: 'DropIn',
      component: DropIn,
    },
    {
      path: '/full-featured-card',
      name: 'FullFeaturedCard',
      component: FullFeaturedCard,
    },
    {
      path: '/split-card',
      name: 'SplitCard',
      component: SplitCard,
    },
    {
      path: '/wechat',
      name: 'Wechat',
      component: Wechat,
    },
    {
      path: '/*',
      name: 'Hpp',
      component: Hpp,
    },
  ],
});
