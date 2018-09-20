<template>
  <div class='container'>
    <div class="containerTop">
      <div class="bgOpacity"></div>
      <div class="index">
        <div class="containerTopBasetext">珍爱12年，专业情感咨询服务</div>
        <div class="zhenaiMianDuiMian">珍心面对面</div>
        <div class="containerTopBasetext">
          免费与情感咨询师面对面诉说您的情感“心里话”
          <br>
          这里会有人理解您，并且帮您解答心中的困惑
        </div>
        <el-button type="primary" round id="linkMatchmaker" v-on:click="login">开始连线咨询</el-button>
      </div>
    </div>

    <div id="circleButtonSet">
      <div class="circleButton" style="margin-left: 0">专业</div>
      <div class="circleButton">真诚</div>
      <div class="circleButton" style="margin-right: 0">免费</div>
    </div>


    <div class="containerBottom">
      <div class="containerBottomTitle">点击以下任意标签，免费开启与专业情感咨询师的视频对话吧</div>

      <ul>
        <li v-for="label in labels" :key="label.id" v-on:click="labelClick(label.id)">{{ label.content }}</li>
      </ul>

    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import Store from '@/tool/store.js'
  import Conf from '@/conf/conf.js'
  import Connect from '@/tool/connect.js'
  import Label from '@/tool/label.js'
  import Version from '@/tool/version.js'

  export default {
    name: 'UserWelcome',
    data() {
      return {
        labels: [],
        time: null
      }
    },
    methods: {

      labelClick: function (lableIndex) {
        Store.save('user-label', lableIndex);
        var that = this;
        axios.get(Conf.API + '/userInfo/uid/get')
          .then(function (response) {
            var responseData = response.data.data;
            // console.log(response.data.code);
            if (response.data.code === 0) {
              Store.save('uid', responseData);
              Connect.connect(Conf.WS_ADDRESS + "/2/" + Store.fetch('client-id'))
              window.clearTimeout(that.time)
              that.$router.push({
                name: 'UserInfoInput'
              })
            }
          })
          .catch(function (response) {
            that.$message.error('连接服务器失败');
          })

      },

      login: function () {
        var that = this;
        // Store.delete('user-label');
        Store.save('user-label', 0);
        axios.get(Conf.API + '/userInfo/uid/get')
          .then(function (response) {
            var responseData = response.data.data;
            console.log(response.data.code);
            if (response.data.code === 0) {
              Store.save('uid', responseData);
              Connect.connect(Conf.WS_ADDRESS + "/2/" + Store.fetch('client-id'))
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

    created() {

    },

    mounted() {
      var that = this;
      Store.delete("hasPhone")
      var setLabels = function(){
        that.labels = Label.getLabels()
        if(Label.getOk() == true){
          return
        }
        else{setTimeout(function(){setLabels()}, 1000)}
      }

      setLabels()

      var setVersion = function(){
        Version.getRemoteVersion()
        if (Version.getVersion() != "" && Version.getVersion() != Store.fetch('version')){
          Store.save('version', Version.getVersion())
          window.location.reload()
        }
        that.time = window.setTimeout(function(){setVersion()}, 20*1000)
      }
      setVersion()

    },
  }
</script>


<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  .container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .containerTop {
    /* background: url("../assets/user-welcome-bg.png") no-repeat; */
    background: url("../../static/user-welcome-bg.png") no-repeat;
    background-size: 100%;
    position: absolute;
    width: 100%;
    height: 85%;
  }

  .bgOpacity {
    opacity: 0.4;
    background: #515151;
    background-size: 100%;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .index {
    padding-top: 15px;
    text-align: center;
    margin: 280px auto 0;
    position: absolute;
    width: 100%;
    height: 600px;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .containerTopBasetext {
    margin-top: 50px;
    color: #fff;
    font-size: 22px;
  }

  .zhenaiMianDuiMian {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    padding: 0px 0;
  }

  #linkMatchmaker {
    padding: 20px;
    font-size: 20px;
    border-radius: 50px !important;
    margin: 30px 0 50px;
  }

  #circleButtonSet {
    position: absolute;
    margin: auto;
    bottom: 14%;
    width: 100%;
    height: auto;
  }

  .circleButton {
    display: inline-block;
    background: #000000;
    margin-left: 60px;
    z-index: 100;
    position: relative;
    line-height: 60px;
    border-radius: 60px !important;
    width: 60px;
    height: 60px;
    color: #ffffff;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .containerBottom {
    background: #fff;
    position: absolute;
    width: 100%;
    height: 15%;
    bottom: 0;
    left: 0;
  }

  .containerBottomTitle {
    font-size: 22px;
    color: #000;
    left: 0;
    text-align: left;
    padding-left: 10px;
    padding-top: 15px;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  ul {
    list-style-type: none;
    padding: 0;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  li {
    color: #ff5292;
    display: inline-block;
    margin: 10px 10px;
    padding: 10px;
    font-size: 20px;
    border-radius: 50px !important;
    border: 1px solid #ff5292;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }


</style>
