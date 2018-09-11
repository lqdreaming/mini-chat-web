<template>
  <div>
    <div id="bg" />
    <div id="content">
      <h2>红娘登录</h2>
      <el-input v-model="mid" clearable placeholder="请输入红娘工号"></el-input>
      <el-input v-model="password"  clearable type="password"placeholder="请输入红娘密码"></el-input>
      <br>
      <br>
      <el-button type="primary" round  v-on:click="login">上线</el-button>
    </div>
  </div>
</template>

<script>
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'

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
      var postData,
          that = this
      axios.post(Conf.API + '/matchmakerInfo/login', {
        mid: that.mid,
        password: that.password
      })
      .then(function (response) {
        console.log(response.data.code);
        if (response.data.code === 107){
           that.$message.error('账号和密码不匹配，请重试');
        }
        if (response.data.code === 0){
          Store.save('mid', that.mid)
          that.$router.push({
            name: 'MatchmakerIndex'
          })
        }
      })
      .catch(function (response) {
        console.log(response);
      });

    }
  },
  mounted(){
    var that = this
    document.onkeydown = function(e){
      var e = window.event ? window.event:e;
      if(e.keyCode == 13){
        that.login()
      }
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
  color: #3d444c;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
#bg{
  /* text-align: center; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* margin: auto; */
  height: 1080px;
  width: 1920px;
  background-color: #eeeeee;
  z-index: 0;
}
#content{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 300px;
  width: 400px;
  background: #FFFFFF;
  padding: 50px;
  height: 190px;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
}
.el-button{
  border-radius: 0px;
}
</style>
