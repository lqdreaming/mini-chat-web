<template>
  <div class="index">
    假装这里有视频有便签
    <el-button type="primary" round  v-on:click="login">马上联系红娘</el-button>
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
