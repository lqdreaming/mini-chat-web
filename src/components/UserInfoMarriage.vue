<template>

    <div class="index">

      <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>
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
      <img id="checkBtn1" v-show="marriage == 1" src="../../static/radio2.png"/>
      <img id="checkBtn2" v-show="marriage == 2" src="../../static/radio2.png"/>
      <img id="checkBtn3" v-show="marriage == 3" src="../../static/radio2.png"/>
      <img id="checkBtn4" v-show="marriage == 4" src="../../static/radio2.png"/>


      <div v-if="show" class="bg"/>
      <VerifyPhone v-if="show" @verifyFail="verifyPhoneFail" @verify="verifyPhoneOK" id="VerifyPhone" @close="showDailog = true"></VerifyPhone>
      <zaDailog v-if="showDailog"  @doCancel="passPhone" @doConfirm="showDailog = false" @doBg="showDailog = false" cancel="跳过" confirm="去验证" message="完成验证即可以连线长达10分钟，而跳过只能连线5分钟噢~"></zaDailog>
    </div>
</template>


<script>
  import Conf from '@/conf/conf.js'
  import axios from 'axios'
  import Store from '@/tool/store.js'
  import Connect from '@/tool/connect.js'
  import index from '../router'
  import zaDailog from './zaDailog.vue'
  import VerifyPhone from './VerifyPhone.vue'

  export default {
    data () {
      return {
        marriage: 0,
        show: false,
        showDailog: false,
      }
    },
    components:{
      zaDailog,
      VerifyPhone
    },
    methods: {
      returnBtn: function(){
        this.$router.push({
          name: 'UserInfoAge'
        })
      },
      passPhone: function(){
        this.showDailog = false
        Store.save('hasPhone', 0)
        this.$router.push({
          path:'/UserIndex'
        })
      },
      selectMarriage (marriage) {
        this.marriage = marriage
        Store.save('user-marriage', marriage)
        var that = this
        window.clearTimeout(this.time)
        this.time = window.setTimeout(function () {
          Connect.connect(Conf.WS_ADDRESS + "/2/" + Store.fetch('client-id'))
          that.show = true
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
      verifyPhoneOK: function(){
        Store.save('hasPhone', 1)
        this.$router.push({
          path:'/UserIndex'
        })

      },
      verifyPhoneFail: function(){
        this.$message("验证码错误，请重试")
      },

    }


  }
</script>


<style scoped>
strong{
  font-size: 20px;
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
  animation:myfirst 0.5s !important;
  -webkit-animation:myfirst 0.5s !important;
  animation-fill-mode: forwards !important;
  /* margin-left: 2500px */
}
@-webkit-keyframes myfirst /* Safari and Chrome */
{
    0%   {width:0px; margin-left: 1919px}
    10%   {width:0px; margin-left: 2500px}
    20%   {width:580px; margin-left: 2500px}
    100% {width:580px; margin-left: 1340px}
}
</style>
