/**
 * app.vue
 * Airwallex Payment Demo - Vue.  Created by Jessica Zhou.
 *
 * This file defines all the endpoints for the demos.
 */

import Vue from 'vue';
import Router from 'vue-router';
import Hpp from '@/components/hpp';
import DropIn from '@/components/dropIn';
import FullFeaturedCard from '@/components/fullFeaturedCard';
import SplitCard from '@/components/splitCard';
import Wechat from '@/components/wechat';
import Card from '@/components/card';
import Instructions from '@/components/instructions';
import Redirect from '@/components/redirect';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/card',
      name: 'Card',
      component: Card,
    },
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
      path: '/hpp',
      name: 'Hpp',
      component: Hpp,
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect,
    },
    {
      path: '/*',
      name: 'Instructions',
      component: Instructions,
    },
  ],
});
