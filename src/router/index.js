import Vue from 'vue'
import Router from 'vue-router'
import MatchmakerIndex from '@/components/MatchmakerIndex'
import UserIndex from '@/components/UserIndex'
import Index from '@/components/Index'
import UserLogin from '@/components/UserLogin'
import UserWelcome from '@/components/UserWelcome'
import UserInfoInput from '@/components/UserInfoInput'
import MatchmakerLogin from '@/components/MatchmakerLogin'
import Register from '@/components/Register'

import zaDailog from '@/components/zaDailog'
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
      path: '/MatchmakerIndex',
      name: 'MatchmakerIndex',
      component: MatchmakerIndex
    },
    {
      path: '/UserIndex',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/UserWelcome',
      name: 'UserWelcome',
      component: UserWelcome
    },
    {
      path: '/UserInfoInput',
      name: 'UserInfoInput',
      component: UserInfoInput
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/zaDailog',
      name: 'zaDailog',
      component: zaDailog
    }
  ]
})
