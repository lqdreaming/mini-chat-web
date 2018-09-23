<template>
  <div class="container">
    <div id="endPageTitle">与您进行连线的老师是{{matchmakerName}}，您可以跟她进行联络哦</div>

    <img ondragstart="return false" id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn2.png"/>
    <div style="position:absolute;margin-top:180px">
      <div id="matchmakerInfo">
        <div style="width:400px;height:250px;background:rgba(255,255,255,0.6)">
          <span id="zhenaiWeiZhuShou">珍爱网</span>
          <img  ondragstart="return false" id="matchmakerIcon" v-bind:src="picUrl"/>
          <span id="matchmakerName">{{matchmakerName}}</span>
          <span id="matchmakerAddress">{{deptName}}</span>
        </div>
        <div style="width:400px;height:350px;background:rgba(255,255,255,1)">
          <img ondragstart="return false" id="matchmakerWechat" src="../assets/endpage-matchmaker-wechat.png"/>
          <span id="linkme">微信扫一扫添加好友<br/>我正在{{deptName}}等你</span>
        </div>
      </div>

      <div id="addressInfo" style="text-align: left">
        <!-- <img id="addressSnipaste" src="../../static/position/1.png"/> -->
        <div id="addressSnipaste"/>
        <div style="position:absolute;width:360px;height:140px;background:rgba(255,255,255,0.9)">
          <div id="distancesText">{{deptName}}距您<span class="textBlue">{{distance}}</span>
          </div>
          <div id="phoneText">服务电话：<span class="textBlue">{{phone}}</span></div>
          <div id="timeText">服务时间：<span class="textBlue">周三~周日&emsp;10:30-21:30</span></div>
          <div id="addressText">门店地址：<span class="textBlue">{{deptAddr}}</span></div>
        </div>
      </div>
    </div>

    <zaDailog v-if="cancelCountDown" @doConfirm="closeDailog" @doBg="closeDailog" @doCountDown="leaveAuto"
              :showCountDown=true :countDown=10 :showCancel=false confirm="继续操作" message="您已超过2分钟未进行任何操作，是否回到首页">
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
        picUrl: '',
        cancelCountDown: false,
        x: '',
        y: '',
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
      if (Store.fetch('dept-deptName') == null){
        axios.get(Conf.API + '/boxPosition/' + Store.fetch('client-id'))
          .then(function (response) {
            var responseData = response.data.data;
            if (response.data.code === 0) {
              that.deptName = responseData.deptName;
              that.distance = responseData.distance;
              that.deptAddr = responseData.deptAddr;
              that.x = responseData.x;
              that.y = responseData.y;
              var map = new BMap.Map("addressSnipaste",{enableMapClick: false});
              var point = new BMap.Point(that.x,that.y);
              map.centerAndZoom(point, 15);
              var marker = new BMap.Marker(point);  // 创建标注
              map.addOverlay(marker);               // 将标注添加到地图中
              marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
              map.enableScrollWheelZoom(true);
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      }else{
        that.deptName = Store.fetch('dept-deptName');
        that.distance = Store.fetch('dept-distance');
        that.deptAddr = Store.fetch('dept-deptAddr');
        that.x = Store.fetch('dept-x');
        that.y = Store.fetch('dept-y');
        var map = new BMap.Map("addressSnipaste",{enableMapClick: false});
        var point = new BMap.Point(that.x,that.y);
        map.centerAndZoom(point, 15);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        map.enableScrollWheelZoom(true);
      }


      if (Store.fetch('mid-name') == null){
        axios.get(Conf.API + '/matchmakerInfo/' + Store.fetch('mid'))
          .then(function (response) {
            console.log('response  ' + response.data);
            var responseData = response.data.data;
            console.log(response.data.code);
            if (response.data.code === 0) {
              that.matchmakerName = responseData.name;
              that.phone = responseData.phone;
              that.picUrl = responseData.picUrl;

            }
          })
          .catch(function (response) {
            console.log(response)
          })
      }else {
        that.matchmakerName = Store.fetch('mid-name');
        that.phone = Store.fetch('mid-phone');
        that.picUrl =Store.fetch('mid-picUrl');
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

  #endPageTitle {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 90px;
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

  #returnBtn:active {
    height: 70px;
    width: 140px;
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
    bottom: 100px;
    left: 100px;
    width: 200px;
    height: 200px;
  }

  #linkme {
    text-align: center;
    position: absolute;
    bottom: 25px;
    left: 50px;
    width: 300px;
    height: auto;
    font-size: 20px;
  }

  #matchmakerIcon {
    position: absolute;
    right: 20px;
    top: 10px;
    width: 213px;
    height: 190px;
    border-radius: 10px;
    margin-top: 20px;
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
    margin-left: 650px;
    margin-top: 100px;
  }

  #matchmakerInfo {
    margin-top: 120px;
    margin-left: 360px;
    position: absolute;
    /* background: #FFF; */
    width: 400px;
    height: 600px;
  }

  #addressInfo {
    overflow: hidden;
    background: #ffffff;
    margin-top: 120px;
    position: absolute;
    width: 800px;
    height: 600px;
    margin-left: 760px;
  }

  #distancesText{
    position: absolute;
    padding: 5px;
    font-size: 20px;
    /* margin-top: 50px */
  }

  #addressText{
    position: absolute;
    padding: 5px;
    font-size: 20px;
    margin-top: 75px;
  }

  #phoneText{
    position: absolute;
    padding: 5px;
    font-size: 20px;
    margin-top: 25px;
  }

  #timeText{
    position: absolute;
    padding: 5px;
    font-size: 20px;
    margin-top: 50px;
  }

  .textBlue {
    /* position: absolute; */
    color: cornflowerblue;
    font-size: 20px;
    /* padding-top: 3px; */
    padding-left: 3px;
  }

  #addressInfoName {
    position: absolute;
    padding-top: 20px;
  }

  #addressSnipaste {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 650px;
  }


</style>
