import Vue from 'vue'
import Router from 'vue-router'
import MatchmakerIndex from '@/components/MatchmakerIndex'
import UserIndex from '@/components/UserIndex'
import Index from '@/components/Index'
import UserLogin from '@/components/UserLogin'
import MatchmakerLogin from '@/components/MatchmakerLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/UserLogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/MatchmakerLogin',
      name: 'MatchmakerLogin',
      component: MatchmakerLogin
    },
    {
      path: '/MatchmakerIndex/:mid',
      name: 'MatchmakerIndex',
      component: MatchmakerIndex
    },
    {
      path: '/UserIndex/:userId',
      name: 'UserIndex',
      component: UserIndex
    }
  ]
})
