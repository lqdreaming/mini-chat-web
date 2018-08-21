<template>
  <div class="index" style="width:500px;margin-left:auto;margin-right:auto">
    <h2>红娘登录</h2>
    <el-input v-model="mid" clearable placeholder="请输入红娘工号"></el-input>
    <el-input v-model="password"  clearable type="password"placeholder="请输入红娘密码"></el-input>
    <br>
    <br>
    <el-button type="primary" round  v-on:click="login">上线</el-button>
  </div>
</template>

<script>
import Conf from '@/conf/conf.js'
import axios from 'axios'

export default {
  name: 'Index',
  data () {
    return {
      mid: "",
      password: ""
    }
  },
  methods: {
    login: function(){
      var postData
      axios.post(Conf.API + '/matchmakerInfo/login', {
        mid: 'this.mid',
        password: 'this.password'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
      // Vue.http.post(Conf.API +　"/matchmakerInfo/login", {mid:this.mid, password:this.password}).then(function(data){
      //   if(data.code === 0){
      //       console.info("login success")
      //   }
      // })

      // this.$router.push({
      //   name: 'MatchmakerIndex',
      //   params: {
      //       mid: this.mid
      //    }
      // })
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
  color: #409EFF;
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
