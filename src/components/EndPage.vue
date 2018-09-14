<template>
  <div class="container" style="margin-top: 100px">
    <div id="endPageTitle">与你进行连线的老师是{{matchmakerName}}，您可以跟她进行联络哦</div>

    <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>

    <div
      id="matchmakerInfo">
      <span id="zhenaiWeiZhuShou">珍爱微助手</span>
      <img id="matchmakerIcon" src="../assets/endpage-matchmaker-icon.jpg"/>
      <span id="matchmakerName">{{matchmakerName}}</span>
      <span id="matchmakerAddress">{{deptName}}</span>
      <img id="matchmakerWechat" src="../assets/endpage-matchmaker-wechat.png"/>
      <span id="linkme">微信扫一扫添加好友，我正在{{deptName}}等着你</span>
    </div>

    <div id="addressInfo" style="text-align: left">
      <div id="addressInfoName" class="addressBaseText">{{deptName}}距您<span id="addressDistance">{{distance}}</span>
      </div>
      <div class="addressBaseText">联系电话：<span id="phoneCall">{{phone}}</span></div>
      <div class="addressBaseText">地址：{{deptAddr}}</div>
      <img id="addressSnipaste" src="../assets/endpage-address-snipaste.png"/>
    </div>

    <zaDailog v-if="cancelCountDown" @doConfirm="closeDailog" @doBg="closeDailog" @doCountDown="leaveAuto"
              :showCountDown=true :countDown=15 :showCancel=false confirm="继续操作" message="请问您还在吗？">
    </zaDailog>

  </div>

</template>

<script>
  import Conf from '@/conf/conf.js'
  import axios from 'axios'
  import Store from '@/tool/store.js'
  import zaDailog from './zaDailog.vue'

  export default {
    name: 'EndPage',
    data() {
      return {
        deptName: '',
        distance: '',
        deptAddr: '',
        matchmakerName: '',
        phone: '',
        cancelCountDown: false,
      }
    },

    components: {
      zaDailog
    },

    methods: {
      returnBtn: function () {
        this.$router.push({
          name: 'UserWelcome'
        })
      },

      leaveAuto: function () {
        if (this.cancelCountDown) {
          this.cancelCountDown = false;
          this.returnBtn();
        }
      },

      closeDailog: function () {
        this.cancelCountDown = false;
      },

      startTimer: function () {
        var that = this;
        clearInterval(that.timeOut);
        that.timeOut = setInterval(function () {
          that.cancelCountDown = true
        }, 1000 * 30) //这里设置30秒无操作弹出提示弹窗
      },

      isTimeOut: function () {
        this.startTimer();
        document.body.onmouseup = this.startTimer;
        document.body.onkeyup = this.startTimer;
        document.body.onclick = this.startTimer;
        document.body.ontouchend = this.startTimer;
      }

    },

    created() {
      this.isTimeOut()
    },

    mounted() {
      var that = this;
      axios.get(Conf.API + '/boxPosition/' + Store.fetch('client-id'))
        .then(function (response) {
          var responseData = response.data.data;
          if (response.data.code === 0) {
            that.deptName = responseData.deptName;
            that.distance = responseData.distance;
            that.deptAddr = responseData.deptAddr;
          }
        })
        .catch(function (response) {
          console.log(response)
        });

      axios.get(Conf.API + '/matchmakerInfo/' + Store.fetch('mid'))
        .then(function (response) {
          console.log('response  ' + response.data);
          var responseData = response.data.data;
          console.log(response.data.code);
          if (response.data.code === 0) {
            that.matchmakerName = responseData.name;
            that.phone = responseData.phone;
          }
        })
        .catch(function (response) {
          console.log(response)
        })
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

  #endPageTitle {
    padding: 20px;
    color: #ffffff;
    font-size: 35px;
  }

  #zhenaiWeiZhuShou {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #999999;
    font-size: 20px;
  }

  #matchmakerAddress {
    position: absolute;
    left: 10px;
    top: 180px;
    color: #999999;
    font-size: 20px;
  }

  #matchmakerWechat {
    position: absolute;
    bottom: 150px;
    left: 90px;
    width: 200px;
    height: 200px;
  }

  #linkme {
    text-align: left;
    position: absolute;
    bottom: 50px;
    left: 90px;
    width: 200px;
    height: auto;
    font-size: 20px;
  }

  #matchmakerIcon {
    position: absolute;
    right: 20px;
    top: 10px;
    width: 50px;
    height: 50px;
  }

  #matchmakerName {
    color: #515151;
    position: absolute;
    top: 40px;
    left: 10px;
    font-size: 40px;
  }

  #returnBtn {
    position: absolute;
    height: 60px;
    width: 120px;
    margin-left: 500px;
  }

  #matchmakerInfo {
    margin-top: 100px;
    margin-left: 550px;
    position: absolute;
    background: #ffffff;
    width: 400px;
    height: 600px;
  }

  #addressInfo {
    background: #ffffff;
    margin-top: 100px;
    position: absolute;
    width: 400px;
    height: 600px;
    margin-left: 950px;
  }

  .addressBaseText {
    padding: 5px;
    font-size: 20px;
  }

  #addressDistance, #phoneCall {
    position: absolute;
    color: cornflowerblue;
    font-size: 20px;
    padding-top: 3px;
    padding-left: 3px;
  }

  #addressInfoName {
    padding-top: 20px;
  }

  #addressSnipaste {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 310px;
  }


</style>
