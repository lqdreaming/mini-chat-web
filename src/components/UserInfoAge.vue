<template>
  <div>
    <div id="title"> 多大了</div>
    <img ondragstart="return false" id="bg" src="../../static/info-bg.png"/>

    <div id="line"/>
    <div id="whites">
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>

      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>

      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>

      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>
      <div class="white"/>

      <div class="white"/>

    </div>

    <div id="greens">
      <div class="greenBox"/>
      <div class="greenBox"/>
      <div class="greenBox"/>
      <div class="greenBox"/>
      <div class="greenBox"/>
      <div class="greenBox"/>
    </div>
    <div id="texts">
      <div class="text">15</div>
      <div class="text">25</div>
      <div class="text">35</div>
      <div class="text">45</div>
      <div class="text">55</div>
    </div>
    <el-slider id="slider" :min="15" :max="55" :step="1" v-model="age" @change="changeNum()"></el-slider>
    <img ondragstart="return false" id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn1.png"/>
    <img ondragstart="return false" id="nextBtn" v-on:click="nextStep(3)" src="../../static/nextBtn.png"/>
    <zaDailog v-if="cancelCountDown" @doConfirm="closeDailog" @doBg="closeDailog" @doCountDown="leaveAuto" :showCountDown=true :countDown=15 :showCancel=false confirm="继续操作" message="您已超过2分钟未进行任何操作，是否回到首页"></zaDailog>

  </div>
</template>

<script>
import Store from '@/tool/store.js'
import zaDailog from './zaDailog.vue'
import updateStep from '@/tool/common.js'
export default {
name: 'UserInfoAge',
data () {
  return {
    age: 15,
    time: null,
    cancelCountDown: false
  }
},
components:{
    zaDailog
},
methods: {
    returnBtn: function () {
      window.clearTimeout(this.time)
      Store.delete('user-gender');
      Store.delete('user-age');
      this.$router.push({
        name: 'UserInfoInput'
      })
    },
    changeNum: function () {
      Store.save('user-age', this.age);
      window.clearTimeout(this.time)
      var that = this
      this.time = window.setTimeout(function () {
        that.$router.push({
          path: '/UserInfoMarriage'
        })
      }, 2000)  //timer2->2 当前是第二个定时器
    },
    nextStep: function(step){
      window.clearTimeout(this.time)
      if(Store.fetch('user-age') == null){
        this.$message('请选择年龄')
      }else{
        updateStep({
          step: step
        });
        this.$router.push({
          path:'/UserInfoMarriage'
        })
      }
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
    }
}
</script>

</style>
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

  #title {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    margin: auto;
    margin-left: 850px;
    font-size: 30px;
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
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  #returnBtn:active {
    height: 70px;
    width: 140px;
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

  #line {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-top: 670px;
    margin-left: 460px;
    width: 1000px;
    height: 6px;
    background-color: #FFFFFF
  }

  #returnBtn {
    position: absolute;
    height: 60px;
    width: 120px;
    margin-left: 650px;
    margin-top: 100px;
  }
  #nextBtn:active {
    width: 280px;
  }

  #slider {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    margin-top: 653px;
    width: 1000px;
    margin-left: 460px;
  }

  #greens, #texts {
    position: absolute;
    width: 1400px;
    height: 1080px;
    margin-left: 220px;
    -moz-user-select:none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  #whites {
    position: absolute;
    width: 1400px;
    height: 1080px;
    margin-left: 437px;
  }

  .white {
    margin-top: 663px;
    float: left;
    margin-left: 22px;
    width: 3px;
    height: 20px;
    background-color: #FFFFFF;
  }

  .greenBox {
    margin-top: 657px;
    float: left;
    margin-left: 235px;
    width: 10px;
    height: 30px;
    border-radius: 5px;
    border: 2px;
    border-style: solid;
    border-color: #ffffff;
    background-color: #5eced6;
    /* margin-left: 10px;
    padding-left: 100px; */
  }

  .text {
    margin-top: 720px;
    float: left;
    margin-left: 236px;
    width: 10px;
    height: 30px;
    font-size: 25px;
    color: #FFFFFF;
  }

  #nextBtn{
    width: 250px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }

</style>
