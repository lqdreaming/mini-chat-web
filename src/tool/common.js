import axios from 'axios'
import Conf from '@/conf/conf.js'
import Store from '@/tool/store.js'

let boxNew = Conf.API || {}

// 更新step
const updateStep = (params) => {
  let XUid = Store.fetch('uid')
  const queryStr = new URLSearchParams()
  queryStr.append('step', params['step'])
  console.log(params, 123)
  return axios.post(`${boxNew}/step`, params, { headers: {'X-Uid': XUid} })
}

export default updateStep
