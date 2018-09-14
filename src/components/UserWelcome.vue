<template>
  <!--<el-container class="container-bg">-->
    <!--<el-main>Main</el-main>-->
    <!--<el-footer>footer</el-footer>-->
  <!--</el-container>-->


  <div class="container-bg">
    <div class="index">
      假装这里有视频有便签
      <el-button type="primary" round v-on:click="login">马上联系红娘</el-button>
      <!-- <el-button type="primary" round  v-on:click="inputUserInfo">输入用户信息</el-button>
      <el-button type="primary" round  v-on:click="register">注册</el-button> -->
      <ul>
        <li v-for="label in labels">
          {{ label.id }} : {{ label.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Store from '@/tool/store.js'
  import Conf from '@/conf/conf.js'

  export default {
    name: 'UserWelcome',
    data() {
      return {
        labels: []
      }
    },
    methods: {
      inputUserInfo: function () {
        this.$router.push({
          path: '/UserInfoInput'
        })
      },
      register: function () {
        this.$router.push({
          path: '/Register'
        })
      },

      login: function () {
        var that = this
        axios.get(Conf.API + '/userInfo/uid/get')
          .then(function (response) {
            var responseData = response.data.data
            console.log(response.data.code);
            if (response.data.code === 0) {
              Store.save('uid', responseData)
              that.$router.push({
                name: 'UserInfoInput'
              })
            }
          })
          .catch(function (response) {
            that.$message.error('连接服务器失败');
          })

      }
    },
    mounted() {
      var that = this
      axios.get(Conf.API + '/label/')
        .then(function (response) {
          var responseData = response.data.data
          console.log(response.data.code);
          if (response.data.code === 0) {
            that.labels = responseData
          }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
  }
</script>


<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  .container-bg{
    background: url("../assets/user-welcome-bg.png");
  }


  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

   el-container {
    margin-bottom: 40px;
  }



  .index {
    margin: 450px auto 0;
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
