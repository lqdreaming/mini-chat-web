<template>
  <div>
    <div id="title"> 多大了</div>
    <img ondragstart="return false" id="bg" src="../../static/info-bg.png"/>
    <el-slider id="slider" :min="15" :max="55" :step="1" v-model="age" @change="changeNum()"></el-slider>
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
    <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>
  </div>
</template>

<script>
import Store from '@/tool/store.js'
  export default {
    name: 'UserInfoAge',
    data () {
      return {
        age: 15,
        time: null,
      }
    },

    methods: {
      returnBtn: function () {
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
      mounted () {

      }
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

</style>
