<template>
  <div class="index" style="margin-top: 450px;margin-left:auto;margin-right:auto">
    假装这里有视频有便签
    <el-button type="primary" round  v-on:click="login">马上联系红娘</el-button>
    <el-button type="primary" round  v-on:click="inputUserInfo">输入用户信息</el-button>
     <el-button type="primary" round  v-on:click="register">输入用户信息</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import Store from '@/tool/store.js'
import Conf from '@/conf/conf.js'
export default {
  name: 'UserWelcome',
  data () {
    return {

    }
  },
  methods: {
      inputUserInfo: function(){
      this.$router.push({
        path:'/UserInfoInput'
      })
    },
          register: function(){
      // this.$router.push({
      //   path:'/Register'
      // })
    },

    login: function(){
      var that = this
      axios.get(Conf.API + '/userInfo/uid/get')
        .then(function (response) {
          var responseData = response.data.data
          console.log(response.data.code);
            if (response.data.code === 0){
              Store.save('uid', responseData)
              that.$router.push({
                name: 'UserIndex'
              })
            }
        })
        .catch(function (response) {
          that.$message.error('连接服务器失败');
        })

    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>
