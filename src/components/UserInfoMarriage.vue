<template>

    <div class="index">

      <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn1.png"/>
      <div id="title">情感状况</div>
      <img ondragstart="return false" id="bg" src="../../static/info-bg.png"/>
      <div class="user-marriage">
        <div class="box-radio-group"><label class="radio-item"><input type="radio" name="marriage" value="1"
        hidden="hidden">
        <div class="radio-btn" @click="selectMarriage(1)"></div>
        <strong>单身</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="2"
        hidden="hidden">
        <div class="radio-btn" @click="selectMarriage(2)"></div>
        <strong>热恋</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="3"
        hidden="hidden">
        <div class="radio-btn" @click="selectMarriage(3)"></div>
        <strong>已婚</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="4"
        hidden="hidden">
        <div class="radio-btn" @click="selectMarriage(4)"></div>
        <strong>离异</strong></label></div>
      </div>
      <img ondragstart="return false" id="checkBtn1" v-show="marriage == 1" src="../../static/radio2.png"/>
      <img ondragstart="return false"  id="checkBtn2" v-show="marriage == 2" src="../../static/radio2.png"/>
      <img ondragstart="return false" id="checkBtn3" v-show="marriage == 3" src="../../static/radio2.png"/>
      <img ondragstart="return false" id="checkBtn4" v-show="marriage == 4" src="../../static/radio2.png"/>
      <img ondragstart="return false" id="nextBtn" v-on:click="nextStep(4)" src="../../static/nextBtn.png"/>

      <div v-if="show" class="bg"/>
      <VerifyPhonePass v-if="show" @verifyFail="verifyPhoneFail" @verify="verifyPhoneOK(5)" id="VerifyPhone" @close="showDailog = true"></VerifyPhonePass>
      <!-- <VerifyPhone v-if="show" @verifyFail="verifyPhoneFail" @verify="verifyPhoneOK(5)" id="VerifyPhone" @close="showDailog = true"></VerifyPhone> -->
      <zaDailog v-if="showDailog"  @doCancel="passPhone(5)" @doConfirm="showDailog = false" @doBg="showDailog = false" cancel="跳过" confirm="去验证" message="完成验证即可以连线长达10分钟，而跳过只能连线5分钟噢~"></zaDailog>
      <zaDailog v-if="cancelCountDown" @doConfirm="closeDailog" @doBg="closeDailog" @doCountDown="leaveAuto" :showCountDown=true :countDown=15 :showCancel=false confirm="继续操作" message="您已超过2分钟未进行任何操作，是否回到首页"></zaDailog>
    </div>
</template>


<script>
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'
import Connect from '@/tool/connect.js'
import index from '../router'
import zaDailog from './zaDailog.vue'
import VerifyPhonePass from './VerifyPhonePass.vue'
import VerifyPhone from './VerifyPhone.vue'
import updateStep from '@/tool/common.js'

export default {
  data () {
    return {
      marriage: 0,
      show: false,
      showDailog: false,
      rtc: null,
      cancelCountDown: false,
      noMatchmaker: false
    }
  },
  components:{
    zaDailog,
    VerifyPhonePass,
    VerifyPhone
  },
  methods: {
    returnBtn: function(){
      window.clearTimeout(this.time)
      Store.delete('user-gender');
      Store.delete('user-age');
      Store.delete('user-marriage');
      this.$router.push({
        name: 'UserInfoAge'
      })
    },
    passPhone: function(step){
      this.showDailog = false
      Store.save('hasPhone', 0)
      updateStep({
        step: step
      });
      this.$router.push({
        path:'/UserIndex'
      })
    },
    nextStep: function(step){
      window.clearTimeout(this.time)
      if(Store.fetch('user-marriage') == null){
        this.$message('请选择情感状况')
      }else{
        updateStep({
          step: step
        });
        axios.post(Conf.API + '/userInfo',  {
            uid: Store.fetch('uid'),
            gender: Store.fetch('user-gender'),
            age: Store.fetch('user-age'),
            marriage: Store.fetch('user-marriage'),
            label: Store.fetch('user-label')
          },{
          headers: {
              'X-Uid': Store.fetch('uid')
          }})
          .then(function (response) {
            var responseData = response.data.data
              if (response.data.code === 0){
                console.log("上传用户信息成功");
              }else{
                console.log("上传用户信息失败");
              }
          })

          .catch(function (response) {
            console.log(response)
          })
        if (this.marriage != 2 && this.marriage != 3 && !this.noMatchmaker){
          this.show = true
        }else {
          this.$router.push({
            path:'/UserIndex'
          })
        }
      }
    },
    selectMarriage (marriage) {
      this.marriage = marriage
      Store.save('user-marriage', marriage)
      Store.save('hasPhone', 0)
      var that = this
      window.clearTimeout(this.time)
      this.time = window.setTimeout(function () {
        // Connect.connect(Conf.WS_ADDRESS + "/2/" + Store.fetch('client-id'))
        if (that.marriage != 2 && that.marriage != 3 && !that.noMatchmaker){
          that.show = true
        }else {
          that.$router.push({
            path:'/UserIndex'
          })
        }

        axios.post(Conf.API + '/userInfo',  {
            uid: Store.fetch('uid'),
            gender: Store.fetch('user-gender'),
            age: Store.fetch('user-age'),
            marriage: Store.fetch('user-marriage'),
            label: Store.fetch('user-label')
          },{
          headers: {
              'X-Uid': Store.fetch('uid')
          }})
          .then(function (response) {
            var responseData = response.data.data
              if (response.data.code === 0){
                console.log("上传用户信息成功");
              }else{
                console.log("上传用户信息失败");
              }
          })
          .catch(function (response) {
            console.log(response)
          })

      }, 2000)
    },
    verifyPhoneOK: function(step){
      updateStep({
        step: step
      });
      Store.save('hasPhone', 1)
      this.$router.push({
        path:'/UserIndex'
      })

    },
    verifyPhoneFail: function(){
      this.$message("验证码错误，请重试")
    },
    leaveAuto: function(){
      if(this.cancelCountDown){
        this.cancelCountDown = false
        this.$router.push({
          name: 'UserWelcome'
        })
      }
    },
    closeDailog: function(){
      this.cancelCountDown = false
    },
    startTimer: function(){
      var that = this;
        clearInterval(that.timeOut);
        that.timeOut = setInterval(function () {
          that.cancelCountDown = true
        },1000*30) //这里设置30秒无操作弹出提示弹窗
    },
    isTimeOut: function(){
      this.startTimer();
      document.body.onmouseup = this.startTimer;
      // document.body.onmousemove = this.startTimer;
      document.body.onkeyup  = this.startTimer;
      document.body.onclick  = this.startTimer;
      document.body.ontouchend  = this.startTimer;
    }

  },
  created() {
    this.isTimeOut()
  },
  mounted(){
    var that = this
    var rtc = Connect.getConnect()
    rtc.on('getAllMatchMakerStatus', function (data) {
        if(Object.keys(data).length == 0){
          that.noMatchmaker = true
        }
    });

    rtc.socket.send(JSON.stringify({
        "eventName": "GetAllMatchmaker",
        "data": {

        }
    }))
  }


}
</script>


<style scoped>
strong{
  font-size: 20px;
}

#returnBtn:active {
  height: 70px;
  width: 140px;
}

#nextBtn{
  width: 250px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 0;
}
#nextBtn:active {
  width: 280px;
}
#bg {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1200px;
  margin-top: 450px;
  z-index: 0;
  margin-left: 360px;
}
  /*--------------婚姻状态选择器----------------------*/
  .user-marriage {
    position: absolute;
    right: 0;
    left: 0;
    margin-top: 475px;
    margin-left: 420px;
    width: 1000px;
    height: 350px;
    padding: 194px 40px 0;
    color: #fff;
  }

  .box-radio-group {
    height: 10px;
    padding: 0 15px;
    background: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    font-size: 15px;
  }

  .radio-item {
    display: block;
    text-align: center;
    width: 105px;
    height: 0;
    padding-top: 105px;
    position: relative;
  }

  .radio-btn {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border: 4px solid #fff;
    border-radius: 50%;
    margin: 0 auto;
    background: #FFB3C4;
    transition: all 0.1s ease;
  }

  strong {
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 93px;
    height: 46px;
    padding: 0 41px 0 53px;
    transform: translate(-50%, 23px);
  }
  #title {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    margin: auto;
    font-size: 30px;
    margin-left: 850px;
    color: #ffffff;
    background-color: #5eced6;
    width: 200px;
    height: 70px;
    border: 2px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 50px;
    text-align: center;
    line-height: 70px;
    margin-top: 200px;
  }

  #returnBtn {
    position: absolute;
    height: 60px;
    width: 120px;
    margin-left: 650px;
    margin-top: 100px;
  }
  #checkBtn1{
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0;
    margin-left: 480px;
    margin-top: 625px;
    z-index: 0;
  }
  #checkBtn2{
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0;
    margin-left:765px;
    margin-top: 625px;
    z-index: 0;
  }
  #checkBtn3{
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0;
    margin-left: 1055px;
    margin-top: 625px;
    z-index: 0;
  }
  #checkBtn4{
    position: absolute;
    height: 100px;
    width: 100px;
    left: 0;
    margin-left: 1345px;
    margin-top: 625px;
    z-index: 0;
  }
.index{
/* position: relative; */
  width: 1920px;
/* overflow: hidden; */
}
.bg{
  /* text-align: center; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* margin: auto; */
  height: 1080px;
  width: 1920px;
  background-color: rgba(90, 90, 90, 0.5);
  z-index: 0;
}
#VerifyPhone{
  position:absolute !important;
  animation:myfirst 0.7s !important;
  -webkit-animation:myfirst 0.7s !important;
  animation-fill-mode: forwards !important;
  /* margin-left: 2500px */
}
@-webkit-keyframes myfirst /* Safari and Chrome */
{
    0%   {width:0px; margin-left: 2500px}
    10%   {width:0px; margin-left: 2500px}
    20%   {width:580px; margin-left: 2500px}
    100% {width:580px; margin-left: 1340px}
}
</style>
