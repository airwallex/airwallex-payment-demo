import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hpp from '@/components/Hpp'
import DropIn from '@/components/DropIn'
import Card from "../components/Card";
import CardEle from "../components/CardEle";
import WechatEle from "../components/WechatEle";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hpp',
      name: 'Hpp',
      component: Hpp
    },
    {
      path: '/dropin',
      name: 'DropIn',
      component: DropIn
    },
    {
      path: '/card',
      name: 'Card',
      component: Card
    },
    {
      path: '/cardele',
      name: 'CardEle',
      component: CardEle
    },
    {
      path: '/wechatele',
      name: 'WechatEle',
      component: WechatEle
    }
  ]
})
