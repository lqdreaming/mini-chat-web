import Vue from 'vue'
import Router from 'vue-router'
import MatchmakerIndex from '@/components/MatchmakerIndex'
import UserIndex from '@/components/UserIndex'
import Index from '@/components/Index'
import UserLogin from '@/components/UserLogin'
import UserWelcome from '@/components/UserWelcome'
import UserInfoInput from '@/components/UserInfoInput'
import MatchmakerLogin from '@/components/MatchmakerLogin'
import zaDailog from '@/components/zaDailog'
import VerifyPhone from '@/components/VerifyPhone'
import UserInfoAge from '@/components/UserInfoAge'
import UserInfoMarriage from '@/components/UserInfoMarriage'
import EndPage from '@/components/EndPage'

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
      path: '/UserWelcome/:positionId',
      name: 'UserWelcome',
      component: UserWelcome,
      meta: {
        keepAlive: true  // 通过此字段判断是否需要缓存当前组件
      }
    },
    {
      path: '/UserInfoInput',
      name: 'UserInfoInput',
      component: UserInfoInput
    },

    {
      path: '/zaDailog',
      name: 'zaDailog',
      component: zaDailog
    },
    {
      path: '/VerifyPhone',
      name: 'VerifyPhone',
      component: VerifyPhone
    },
    {
      path: '/UserInfoAge',
      name: 'UserInfoAge',
      component: UserInfoAge
    },
    {
      path: '/UserInfoMarriage',
      name: 'UserInfoMarriage',
      component: UserInfoMarriage
    },
    {
      path: '/EndPage',
      name: 'EndPage',
      component: EndPage
    }
  ]
})
