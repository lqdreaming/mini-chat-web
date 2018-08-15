import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MatchmakerIndex from '@/components/MatchmakerIndex'
import UserIndex from '@/components/UserIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/MatchmakerIndex',
      name: 'MatchmakerIndex',
      component: MatchmakerIndex
    },
    {
      path: '/UserIndex',
      name: 'UserIndex',
      component: UserIndex
    }
  ]
})
