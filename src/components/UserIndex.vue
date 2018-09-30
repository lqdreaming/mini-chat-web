<template>
  <div id="userIndex">
    <div v-show="!videoFlagShow" class="matchMakerListTitle" style="position:absolute;margin-top: 100px;text-align:center">
      <div style="position:absolute;z-index:1;width:500px;font-size:35px;margin-left:730px">请选择您要联系的老师</div>
      <img ondragstart="return false" id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn2.png"/>
    </div>
    <div  v-show="noMatchmakerDailog && !videoFlagShow && matchMakers[0] == null">
      <!-- 虚假页面 -->
      <div class="fake">
        <br><br><br><br><br><br>
        <br><br><br><br>
        <el-row>
          <el-col :span="5" v-for="(matchMaker, index) in matchMakersFake" :key="index" :offset="1">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img ondragstart="return false" v-bind:src="matchMaker.picUrl" class="image">
              <div style="padding: 0px;">
                <div id="matchMakerDetial">
                  <br>
                  <b>{{matchMaker.name}}</b>
                  <br>
                  <div style="height:68px;margin-top:10px;text-align:left;padding: 14px">
                    {{matchMaker.detail}}
                  </div>
                </div>

                <div style="margin-top:0px">
                  <el-button type="primary" round class="button" v-show="matchMaker.status" v-on:click="callMatchmaker(matchMaker.mid)">连线</el-button>
                  <!-- <el-button type="danger" round class="button" v-show="!matchMaker.status" v-on:click="callBusy()">忙碌</el-button> -->
                  <div v-show="!matchMaker.status" class="busy">
                    离线
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img  ondragstart="return false" style="margin-top:80px" src="../../static/question.png">
              <div style="height:80px;margin-top:50px;text-align:center">
                将从空闲的老师中随机挑选一位与您连线
              </div>
              <div>
                <el-button  style="margin-top:28px" type="primary">随机连线</el-button>
              </div>
            </el-card>
          </el-col>

        </el-row>
      </div>
      <div v-if="verifyPhoneShow && hasPhone == 0" class="bg">
      </div>
      <VerifyPhone style="position:absolute" v-if="verifyPhoneShow && hasPhone == 0" id="VerifyPhone" @verifyFail="verifyPhoneFail" @verify="verifyPhoneOK" @close="closeVerify" contentTitle="温馨提示" contentDetail="目前情感咨询师均不在线，请您预留手机号，将会在第一时间与您联系哦"></VerifyPhone>
      <zaDailog  v-if="hasPhone == 1" :showCancel=false  @doBg="closeVerify"  @doConfirm="closeVerify" title="温馨提示" message="亲，我们的服务时间为09:00-22:00,情感专家会在第一时间与您联系哦！"></zaDailog>
    </div>

    <div v-show="matchMakers[0] != null && userMarriage == 2 || userMarriage == 3">
      <!-- 虚假忙碌页面， 选择热恋的人-->
      <div class="fake">
        <!-- <div  class="matchMakerListTitle">
          请选择您要联系的老师
          <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn2.png"/>
        </div> -->

        <br><br><br><br><br><br>
        <br><br><br><br>
        <el-row>
          <el-col :span="5" v-for="(matchMaker, index) in matchMakersFake" :key="index" :offset="1">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img ondragstart="return false" v-bind:src="matchMaker.picUrl" class="image">
              <div style="padding: 0px;">
                <div id="matchMakerDetial">
                  <br>
                  <b>{{matchMaker.name}}</b>
                  <br>
                  <div style="height:68px;margin-top:10px;text-align:left;padding: 14px;">
                    {{matchMaker.detail}}
                  </div>
                </div>

                <div style="margin-top:0px">
                  <el-button type="primary" round class="button" v-show="matchMaker.status" v-on:click="callMatchmaker(matchMaker.mid)">连线</el-button>
                  <!-- <el-button type="danger" round class="button" v-show="!matchMaker.status" v-on:click="callBusy()">忙碌</el-button> -->
                  <div v-show="!matchMaker.status" class="busy">
                    繁忙
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img ondragstart="return false" style="margin-top:80px" src="../../static/question.png">
              <div style="height:80px;margin-top:50px;text-align:center">
                将从空闲的老师中随机挑选一位与您连线
              </div>
              <div>
                <el-button style="margin-top:28px" type="primary" v-on:click="callMatchmakerRandomFake()">随机连线</el-button>
              </div>
            </el-card>
          </el-col>

        </el-row>
      </div>

    </div>

    <div v-show="!videoFlagShow && userMarriage != 2 && userMarriage != 3">
      <!-- <div v-show="matchMakers[0] != null" class="matchMakerListTitle"  style="margin-top: 100px">
        请选择您要联系的老师
        <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn2.png"/>
      </div> -->

      <div class="real">
        <br><br><br><br><br><br>
        <br><br><br><br>
        <el-row>
          <el-col :span="5" v-for="(matchMaker, index) in matchMakers" :key="index" :offset="1">
            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img v-bind:src="matchMaker.picUrl" class="image">
              <div style="padding: 0px;">
                <div id="matchMakerDetial">
                  <br>
                  <b>{{matchMaker.name}}</b>
                  <br>
                  <div style="height:68px;margin-top:10px;text-align:left;padding: 14px;">
                    {{matchMaker.detail}}
                  </div>
                </div>

                <div>
                  <el-button type="primary" round class="button" v-show="matchMaker.status" v-on:click="callMatchmaker(matchMaker.mid)">连线</el-button>
                  <!-- <el-button type="danger" round class="button" v-show="!matchMaker.status" v-on:click="callBusy()">忙碌</el-button> -->
                  <div v-show="!matchMaker.status" class="busy">
                    繁忙
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1" v-show="matchMakers[0] != null">

            <el-card shadow="always" :body-style="{ padding: '0px' }">
              <img  ondragstart="return false" style="margin-top:80px" src="../../static/question.png">
              <div style="height:80px;margin-top:50px;text-align:center">
                将从空闲的老师中随机挑选一位与您连线
              </div>
              <div>
                <el-button style="margin-top:28px" type="primary" v-on:click="callMatchmakerRandom()">随机连线</el-button>
              </div>
            </el-card>


          </el-col>

        </el-row>
      </div>
    </div>

    <div v-show="videoFlagShow">
      <div class="whiteBg"/>
      <div class="chatDiv">
        <div v-show="onChat" id="timeOnChat">
          {{minShow}}:{{secondShow}}
        </div>
        <div id="videos">
          <video id="other" autoplay></video>
          <video id="me" autoplay></video>
          <img id="redSmall" src="../../static/redCircleSmall.png"  v-show="!redBigShow"/>
          <img id="blackSmall" src="../../static/blackCircleSmall.png"/>
          <img id="redButton" src="../../static/redButton.png" v-on:click="showDailog = true"/>
          <img id="blackButton" src="../../static/blackButton.png" v-show="videoOpen" v-on:click="closeVideo()"/>
          <img id="blackBig" src="../../static/blackCircleBig.png" v-show="!videoOpen" v-on:click="openVideo()"/>
          <img id="redBig" src="../../static/redCircleBig.png" v-show="redBigShow"/>
          <div id="callContent">{{callContent}}</div>
          <div id="countDown" v-show="countDownShow">{{countDown}} s</div>
        </div>
        <img id="chickenSoup" src="../../static/chickenSoup.png"/>
        <div id="chickenSoupText" v-html='chickenSoupText'></div>
      </div>

      <div class="bg" v-if="verifyPhoneShowAfterChat"/>
      <VerifyPhone style="position:absolute;top:0" v-if="verifyPhoneShowAfterChat" id="VerifyPhone" @verifyFail="verifyPhoneFail" @verify="verifyPhoneOKAfteChat" @close="closeVerifyAfteChat" contentTitle="温馨提示" contentDetail="请留下您的手机号码，我们将把老师的联系方式发送给您。"></VerifyPhone>
    </div>
    <zaDailog v-if="verifyPhoneFailShow" @doConfirm="closeDailog" @doBg="closeDailog" :showCancel=false confirm="确认" message="验证码错误，请重试" ></zaDailog>
    <zaDailog v-if="showDailog" @doCancel="closeDailog" @doBg="closeDailog" confirm="断开" :message="leftTimeTip" @doConfirm="over"></zaDailog>
    <zaDailog v-if="noMatchmaker":showCancel=false  @doBg="closeDailog"  @doConfirm="closeDailog" message="目前沒有空闲中的红娘，请耐心等待"></zaDailog>
    <zaDailog v-if="cancelCountDown" @doConfirm="closeDailog" @doBg="closeDailog" @doCountDown="leaveAuto" :showCountDown=true :countDown=10 :showCancel=false confirm="继续操作" message="您已超过2分钟未进行任何操作，是否回到首页"></zaDailog>
    <zaDailog v-if="verifyPhoneOKShow" @doConfirm="leave" :bgClose=false @doCountDown="leave" :showCountDown=true :countDown=10 :showCancel=false title="成功提示" confirm="关闭" message="恭喜您，信息提交成功，预祝生活愉快！如有疑问请拨打咨询电话：4008-520520"></zaDailog>
    <zaDailog v-if="deviceError" :showCancel=false  @doBg="returnBtn"  @doConfirm="returnBtn" message="摄像头或麦克风等设备异常，请检查"></zaDailog>
    <zaDailog v-if="matchMakerNetError" :showCancel=false :bgClose=false  @doConfirm="matchMakerNetErrorDo" message="连线异常中断,请重新连线" confirm="返回"></zaDailog>
  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'
import zaDailog from './zaDailog.vue'
import VerifyPhone from './VerifyPhone.vue'
import Connect from '@/tool/connect.js'

var rtc

export default {
  // inject: ['reload'],
  name: 'UserIndex',
  data () {
    return {
      uid: "",
      stream: null,
      videoFlagShow: false,
      videoOpen: true,
      redBigShow: true,
      countDownShow: true,
      callContent: '正在连线红娘中  请耐心等待',
      countDown: 20,
      showDailog: false,
      cancelCountDown: false,
      timeOut: '',
      min: 0,
      second: 0,
      minShow: '',
      secondShow: '',
      onChat: false,
      noMatchmaker: false,
      noMatchmakerDailog: false,
      verifyPhoneShow: true,
      verifyPhoneOKShow: false,
      verifyPhoneFailShow: false,
      verifyPhoneShowAfterChat: false,
      deviceError: false,
      chatTime: 5,
      hasPhone: 0,
      userMarriage: 1,
      leftTimeTip: '您的连线时间仍剩余5分钟，您确定要离开吗？',
      chickenSoupText: '真正爱你的人不会说许多爱你的话，却会做许多爱你的事。',
      netError: false,
      netErrorTime: null,
      matchMakerNetError: false,
      matchMakers:
      [
          // { mid: 'aaa', status: true, name:'红娘1好',detail:"sdfds fsf dsf sd",picUrl:"../../static/pic/1.png"},
         // { name: 'bbb', status: false},
      ],
      matchMakersFake:
      [
        { mid: '666666', status: false, name:'李老师',detail:"情感服务专家，12年专业经验，成功解决情感疑难376例，也帮助100人获得理想的爱情",picUrl:"../../static/pic/1.png"},
        { mid: '666666', status: false, name:'文老师',detail:"婚恋服务专家，于婚恋行业赫赫有名，成功撮合135对情侣，帮助他们寻得理想伴侣",picUrl:"../../static/pic/2.png"},
        { mid: '666666', status: false, name:'张老师',detail:"专业情感咨询师，9年从业经验，成功帮助258人消除情感困惑，也帮助89人获得爱情的果实",picUrl:"../../static/pic/3.png"},
      ]
    }
  },
  components:{
    zaDailog,
    VerifyPhone
  },
  methods: {
    callMatchmaker: function(mid){
      console.log("callMatchmaker button is click")
      Store.save('mid', mid)
      rtc.socket.send(JSON.stringify({
          "eventName": "Call",
          "data": {
              "mid": mid,
              "userId": Store.fetch('uid')
          }
      }))
    },
    callMatchmakerRandomFake: function(){
      this.noMatchmaker = true
    },
    callMatchmakerRandom: function(){
      var flag = false
      for (var matchMaker of this.matchMakers){
        if (matchMaker.status == true){
          this.callMatchmaker(matchMaker.mid)
          flag = true
          break
        }
      }
      if(!flag){
        // this.$message.error('目前暂时没有空闲中的红娘，请耐心等待');
        this.noMatchmaker = true
      }
    },
    matchMakerNetErrorDo: function() {
      this.matchMakerNetError = false
      this.videoFlagShow = false
      this.onChat = false
      this.redBigShow = true
      this.countDownShow = true
      this.callContent = '正在连线红娘中  请耐心等待'
    },
    callBusy: function(){
      // this.$message.error('该红娘正在通话中，请稍等哦~');
    },
    verifyPhoneOK: function(){
      this.verifyPhoneOKShow = true
    },
    verifyPhoneFail: function(){
      this.$message("验证码错误，请重试")
    },
    verifyPhoneOKAfteChat: function(){
      var that = this
      axios.get(Conf.API + '/smsCode/sendMidInfo/mid/' + Store.fetch('mid')
        ,{headers: {
            'X-Uid': Store.fetch('uid')
        }})
        .then(function (response) {
          that.$message({
             message: '发送成功，请注意查收短信。',
             duration: 5000
           });
          that.$router.push({
            name: 'EndPage'
          })
        })
        .catch(function (response) {
          console.log(response)
        })

    },
    returnBtn: function(){
      this.$router.push({
        name: 'UserWelcome'
      })
    },
    closeVerify: function(){
      this.$router.push({
        name: 'UserWelcome'
      })
    },
    closeVerifyAfteChat: function(){
      this.$router.push({
        name: 'EndPage'
      })
    },
    closeDailog: function(){
      this.showDailog = false
      this.cancelCountDown = false
      this.noMatchmaker = false

    },
    closeVerifyShow: function(){
      this.verifyPhoneOKShow = false
      this.verifyPhoneFailShow = false
      this.verifyPhoneShowAfterChat = false
    },
    over: function(){
      var that = this
      that.showDailog = false
      rtc.closePeerConnection(rtc.peerConnection)
      that.videoOpen = true
      document.getElementById('me').srcObject = this.stream
      document.getElementById('me').muted = true
      // document.getElementById('me').play()
      if (that.hasPhone == 1){
        that.$router.push({
          name: 'EndPage'
        })
      }else {
        that.verifyPhoneShowAfterChat = true
      }

      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": that.uid,
          }
      }))
    },
    down: function(id){

    },
    leave: function(){
      this.$router.push({
        name: 'UserWelcome'
      })
    },
    leaveAuto: function(){
      if(this.cancelCountDown){
        this.cancelCountDown = false
        this.$router.push({
          name: 'UserWelcome'
        })
      }
    },
    closeVideo: function(){
      this.videoOpen = false
      document.getElementById('me').srcObject = null
      rtc.socket.send(JSON.stringify({
          "eventName": "CloseVideo",
          "data": {
              "uid": this.uid
          }
      }))

    },
    openVideo: function(){
      this.videoOpen = true
      document.getElementById('me').srcObject = this.stream
      document.getElementById('me').muted = true
      // document.getElementById('me').play()
      rtc.socket.send(JSON.stringify({
          "eventName": "OpenVideo",
          "data": {
              "uid": this.uid
          }
      }))
    },
    startTimer: function(){
      var that = this;
        clearInterval(that.timeOut);
        that.timeOut = setInterval(function () {
          if ( that.onChat == false){
            that.cancelCountDown = true
          }
        },1000*30)
    },
    isTimeOut: function(){
      this.startTimer();
      document.body.onmouseup = this.startTimer;
      // document.body.onmousemove = this.startTimer;
      document.body.onkeyup  = this.startTimer;
      document.body.onclick  = this.startTimer;
      document.body.ontouchend  = this.startTimer;
    },
    countTime: function () {
      var that = this
      if (this.onChat){
        if (this.second < 59){
          this.second++
          if (this.second <= 9){
            this.secondShow = '0' + this.second
          }else {
            this.secondShow = this.second
          }
        }else {
          this.second = 0
          this.secondShow = '0' + this.second
          this.min++
          if (this.min <= 9){
            this.minShow = '0' + this.min
          }else {
            this.minShow = this.min
          }

        }

        if(this.second == 0 && this.chatTime - this.min == 1){
          this.$message.success('您的连线时间只剩一分钟');
        }
        var leftTime = this.chatTime - this.min
        this.leftTimeTip =  '您的连线时间仍剩余'+ leftTime +'分钟，您确定要离开吗？'
        if(this.second == 0 && this.chatTime - this.min == 0){
          rtc.closePeerConnection(rtc.peerConnection)
          // this.videoFlagShow = false
          // this.videoOpen = false
          document.getElementById('me').srcObject = this.stream
          document.getElementById('me').muted = true
          if (this.hasPhone == 1){
            this.$router.push({
              name: 'EndPage'
            })
          }else {
            this.verifyPhoneShowAfterChat = true
          }
          rtc.socket.send(JSON.stringify({
              "eventName": "End",
              "data": {
                  "id": that.uid,
              }
          }))

        }else {
          setTimeout(this.countTime, 1000);
        }

      }else {
        this.second = 0
        this.min = 0
        this.minShow = ''
        this.secondShow = ''
      }
    }
  },
  created() {
    var that = this
    this.isTimeOut()
    this.netErrorTime = setTimeout(function(){
      //网络超市，重新建立webSocket连接
      that.netError = true
      Connect.connect(Conf.WS_ADDRESS + "/2/" + Store.fetch('client-id'))
      rtc = Connect.getConnect()

      var delay = function(rtc){
          if(rtc.connectStatus == true){
            console.info('rtc.connectStatus = true')
            rtc.socket.send(JSON.stringify({
                "eventName": "GetAllMatchmaker",
                "data": {

                }
            }))

            rtc.createStream({
              "video": true,
              "audio": true
            });
            //创建本地视频流成功
            rtc.on("stream_created", function(stream) {
              that.stream = stream
              document.getElementById('me').srcObject = stream;
              document.getElementById('me').muted = true
              // document.getElementById('me').play();
            });

            //创建本地视频流失败
            rtc.on("stream_create_error", function() {
              that.deviceError = true

            });


            //接收到其他用户的视频流
            rtc.on('pc_add_stream', function(stream) {
              document.getElementById('other').srcObject = stream;

            });

            rtc.on('endAnswer', function (data) {
                rtc.closePeerConnection(rtc.peerConnection)
                that.onChat = false

                if (data.byWho == 1){

                }else {
                  that.$router.push({
                    name: 'UserWelcome'
                  })
                }
            });

            rtc.on('matchMakerChangeStatus', function (data) {
                console.info("receive message:" + data);

                var flag = true
                that.matchMakers.forEach(function(matchMaker){
                  if (matchMaker.mid == data.mid){
                    matchMaker.status = data.status
                    flag = false
                  }
                });

                if (flag == true) {
                  axios.get(Conf.API + '/matchmakerInfo/' + data.mid)
                    .then(function (response) {
                      var responseData = response.data.data
                      console.log(response.data.code);
                        if (response.data.code === 0){
                            that.matchMakers.push({mid:data.mid, status: data.status, name:responseData.name, detail:responseData.detail,picUrl:responseData.picUrl})
                        }
                    })
                    .catch(function (response) {
                      console.log(response)
                    })
                }
                console.info(that.matchMakers)
            });

            rtc.on('getAllMatchMakerStatus', function (data) {
                that.netError = false
                window.clearTimeout(that.netErrorTime)
                if(Object.keys(data).length == 0){
                  that.noMatchmakerDailog = true
                }
                Object.keys(data).forEach(function(key){
                    axios.get(Conf.API + '/matchmakerInfo/' + key)
                    .then(function (response) {
                      var responseData = response.data.data
                      if (response.data.code === 0){
                          that.matchMakers.push({mid:key, status: data[key], name:responseData.name, detail:responseData.detail, picUrl:responseData.picUrl});
                      }
                    })
                    .catch(function (response) {
                      console.log(response);
                    });

                });
                // console.log(that.matchMakers);
            });

            rtc.on('netError', function(data) {
              console.info('连线中断')
              that.matchMakerNetError = true
            })

            rtc.on('userSureCallAnswer', function(data) {
              console.log("receive userSureCallAnswer");
              if (data.grabFlag === true){
                that.redBigShow = false
                that.callContent = ''
                that.countDownShow = false
                that.onChat = true
                that.minShow = '00'
                that.secondShow = '00'
                that.countTime()
                rtc.emit("ready", data.mid, data.uid, "user");

                //提前加载红娘信息
                axios.get(Conf.API + '/matchmakerInfo/' + Store.fetch('mid'))
                  .then(function (response) {
                    console.log('response  ' + response.data);
                    var responseData = response.data.data;
                    console.log(response.data.code);
                    if (response.data.code === 0) {
                      Store.save("mid-name", responseData.name);
                      Store.save("mid-phone", responseData.phone);
                      Store.save("mid-picUrl", responseData.picUrl);
                    }
                  })
                  .catch(function (response) {
                    console.log(response)
                  })

                //提前加载位置信息
                axios.get(Conf.API + '/boxPosition/' + Store.fetch('client-id'))
                  .then(function (response) {
                    var responseData = response.data.data;
                    if (response.data.code === 0) {
                      Store.save("dept-deptName", responseData.deptName);
                      Store.save("dept-distance", responseData.distance);
                      Store.save("dept-deptAddr", responseData.deptAddr);
                      Store.save("dept-x", responseData.x);
                      Store.save("dept-y", responseData.y);

                      var map = new BMap.Map("addressSnipaste");
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
              }
            })

            rtc.on('userCallAnswer', function(data) {
              console.log("receive userCallAnswer");
              if (data.grabFlag === true){
                that.videoFlagShow = true
                that.countDownShow = true
                that.countDown = 20
                var doCountDown = function(){
                  setTimeout(function(){
                    if(that.countDown >= 1 && that.redBigShow && that.countDownShow){
                      that.countDown--
                      console.info(that.countDown)
                      if(that.countDown === 0){
                        that.countDownShow = false
                        that.callContent = '情感咨询师正在繁忙中，请重新选择'
                        setTimeout(function(){
                          that.videoFlagShow = false
                          that.callContent = '正在连线红娘中  请耐心等待'
                        },3000)
                      }
                      doCountDown()
                    }
                  },1000)
                }
                doCountDown()
              }else{
                that.$message.error('该红娘正忙');
              }
            })

          return;
        }
        else{setTimeout(function(){delay(rtc)}, 100)}
      }

      delay(rtc)


    }, 3 * 1000);
  },
  mounted () {
      // rtc = SkyRTC()
      rtc = Connect.getConnect()
      var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
      this.hasPhone = Store.fetch('hasPhone')
      this.chickenSoupText = Store.fetch('chickenSoup')
      var that = this
      this.userMarriage = Store.fetch('user-marriage')
      this.uid = Store.fetch('client-id')
      if(this.hasPhone == 1){
        this.chatTime = 10
      }else{
        this.chatTime = 5
      }

      var delay = function(rtc){
          if(rtc.connectStatus == true){
            console.info('rtc.connectStatus = true')
            rtc.socket.send(JSON.stringify({
                "eventName": "GetAllMatchmaker",
                "data": {

                }
            }))

            rtc.createStream({
              "video": true,
              "audio": true
            });
      		return;
      	}
      	else{setTimeout(function(){delay(rtc)}, 100)}
      }

      delay(rtc)


      //创建本地视频流成功
      rtc.on("stream_created", function(stream) {
        that.stream = stream
        document.getElementById('me').srcObject = stream;
        document.getElementById('me').muted = true
        // document.getElementById('me').play();
      });

      //创建本地视频流失败
      rtc.on("stream_create_error", function() {
        that.deviceError = true

      });

      // rtc.on("connectSuccess", function(data) {
      //     that.connectStatus = true
      //
      // });

      //接收到其他用户的视频流
      rtc.on('pc_add_stream', function(stream) {
        document.getElementById('other').srcObject = stream;
        // document.getElementById('other').play();
      });

      rtc.on('endAnswer', function (data) {
          rtc.closePeerConnection(rtc.peerConnection)
          that.onChat = false

          if (data.byWho == 1){
            // if (that.hasPhone == 1){
            //   that.$router.push({
            //     name: 'EndPage'
            //   })
            // }else {
            //   that.verifyPhoneShowAfterChat = true
            // }

          }else {
            that.$router.push({
              name: 'UserWelcome'
            })
          }
      });

      rtc.on('matchMakerChangeStatus', function (data) {
          console.info("receive message:" + data);

          var flag = true
          that.matchMakers.forEach(function(matchMaker){
            if (matchMaker.mid == data.mid){
              matchMaker.status = data.status
              flag = false
            }
          });

          if (flag == true) {
            axios.get(Conf.API + '/matchmakerInfo/' + data.mid)
              .then(function (response) {
                var responseData = response.data.data
                console.log(response.data.code);
                  if (response.data.code === 0){
                      that.matchMakers.push({mid:data.mid, status: data.status, name:responseData.name, detail:responseData.detail,picUrl:responseData.picUrl})
                  }
              })
              .catch(function (response) {
                console.log(response)
              })
          }
          console.info(that.matchMakers)
      });

      rtc.on('getAllMatchMakerStatus', function (data) {
          that.netError = false
          window.clearTimeout(that.netErrorTime)
          if(Object.keys(data).length == 0){
            that.noMatchmakerDailog = true
          }
          Object.keys(data).forEach(function(key){
              axios.get(Conf.API + '/matchmakerInfo/' + key)
              .then(function (response) {
                var responseData = response.data.data
                if (response.data.code === 0){
                    that.matchMakers.push({mid:key, status: data[key], name:responseData.name, detail:responseData.detail, picUrl:responseData.picUrl});
                }
              })
              .catch(function (response) {
                console.log(response);
              });

          });
          // console.log(that.matchMakers);
      });

      rtc.on('userSureCallAnswer', function(data) {
        console.log("receive userSureCallAnswer");
        if (data.grabFlag === true){
          that.redBigShow = false
          that.callContent = ''
          that.countDownShow = false
          that.onChat = true
          that.minShow = '00'
          that.secondShow = '00'
          that.countTime()
          rtc.emit("ready", data.mid, data.uid, "user");

          //提前加载红娘信息
          axios.get(Conf.API + '/matchmakerInfo/' + Store.fetch('mid'))
            .then(function (response) {
              console.log('response  ' + response.data);
              var responseData = response.data.data;
              console.log(response.data.code);
              if (response.data.code === 0) {
                Store.save("mid-name", responseData.name);
                Store.save("mid-phone", responseData.phone);
                Store.save("mid-picUrl", responseData.picUrl);
              }
            })
            .catch(function (response) {
              console.log(response)
            })

          //提前加载位置信息
          axios.get(Conf.API + '/boxPosition/' + Store.fetch('client-id'))
            .then(function (response) {
              var responseData = response.data.data;
              if (response.data.code === 0) {
                Store.save("dept-deptName", responseData.deptName);
                Store.save("dept-distance", responseData.distance);
                Store.save("dept-deptAddr", responseData.deptAddr);
                Store.save("dept-x", responseData.x);
                Store.save("dept-y", responseData.y);

                var map = new BMap.Map("addressSnipaste");
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
        }
      })


      rtc.on('socket_error', function(data) {
        that.$message('网络故障了')
      })

      rtc.on('netError', function(data) {
        console.info('连线中断')
        that.matchMakerNetError = true
      })


      rtc.on('userCallAnswer', function(data) {
        console.log("receive userCallAnswer");
        if (data.grabFlag === true){
          that.videoFlagShow = true
          that.countDownShow = true
          that.countDown = 20
          var doCountDown = function(){
            setTimeout(function(){
              if(that.countDown >= 1 && that.redBigShow && that.countDownShow){
                that.countDown--
                console.info(that.countDown)
                if(that.countDown === 0){
                  that.countDownShow = false
                  that.callContent = '情感咨询师正在繁忙中，请重新选择'
                  setTimeout(function(){
                    that.videoFlagShow = false
                    that.callContent = '正在连线红娘中  请耐心等待'
                  },3000)
                }
                doCountDown()
              }
            },1000)
          }
          doCountDown()
        }else{
          that.$message.error('该红娘正忙');
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
a {
  color: #42b983;
}
#userIndex{
  -moz-user-select:none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
#timeOnChat {
  position: absolute;
  /* display: inline-block; */
  margin-left: 0px;
  /* margin-top: 10px; */
  font-size: 50px;
  color: #3d444c;
}
#videos {
  position: relative;
  margin-right: 1400px;
  margin-top: 5px;
}


#me{
  position: absolute;
  display: inline-block;
  margin-left: 1051px;
  margin-top: 500px;
  object-fit: cover;
  width: 400px;
  height: 400px;
  border-radius:50%;
}

#blackBig{
  position: absolute;
  display: inline-block;
  margin-left: 1050px;
  margin-top: 500px;
  object-fit: cover;
  width: 402px;
  height: 402px;
}
#blackSmall{
  position: absolute;
  display: inline-block;
  margin-left: 1050px;
  margin-top: 500px;
  object-fit: cover;
  width: 401px;
  height: 401px;
  /* border: 3px solid #0f0f0f; */
  border-radius:50%;
}

#returnBtn:active {
  height: 70px;
  width: 140px;
}


#redSmall{
  position: absolute;
  display: inline-block;
  /* margin-right: 100px; */
  width: 901px;
  height: 901px;
  /* border: 3px solid #0f0f0f; */
  border-radius:50%;
}

#redBig{
  position: absolute;
  display: inline-block;
  /* margin-right: 100px; */
  width: 901px;
  height: 901px;
  /* border: 3px solid #0f0f0f; */
  border-radius:50%;
}

#other{
  position: absolute;
  display: inline-block;
  margin-left: 1px;
  object-fit: cover;
  width: 900px;
  height: 900px;
  /* border: 3px solid #0f0f0f; */
  border-radius:50%;
}

#redButton{
  position: absolute;
  display: inline-block;
  margin-left: 400px;
  margin-top: 750px;
}

#blackButton{
  position: absolute;
  display: inline-block;
  margin-left: 1225px;
  margin-top: 815px;
}

#callContent{
  position: absolute;
  width: 400px;
  margin-left: 275px;
  margin-top: 480px;
  font-size: 50px;
  color: #ffffff;
}

#countDown{
  position: absolute;
  width: 400px;
  margin-left: 275px;
  margin-top: 350px;
  font-size: 100px;
  color: #ffffff;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 350px;
  height: 300px;
  display: block;

}

.matchMakerListTitle{
  color: #ffffff;
  font-size: 35px;
  z-index: 1;
}
.el-card {
  height: 490px;
  width: 350px;
}
.el-button {
  width: 350px;
  height: 50px;
  font-size: 22px;
  border-radius: 0px !important;
}
.busy{
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 50px;
  line-height:20px;
  text-align:center;
  height:35px;
  width:320px;
  background-color: #ff4949;
  color: #fff;
  padding: 15px;
  font-size: 22px;
  -moz-user-select:none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
#matchMakerDetial {
  -moz-user-select:none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
#returnBtn{
  position: absolute;
  z-index: 1;
  height: 60px;
  width: 120px;
  margin-left: 1610px;
}
#VerifyPhone{
  position:absolute;
  animation:myfirst 0.5s;
  -webkit-animation:myfirst 0.5s;
  animation-fill-mode: forwards;
  /* margin-left: 2500px */
}
#chickenSoup{
  position: absolute;
  width: 500px;
  margin-left: 310px;
  /* z-index: 9; */
}
#chickenSoupText{
  position: absolute;
  color: #3d444c;
  width: 280px;
  margin-left: 1120px;
  margin-top: 170px;
  font-size: 25px;
  text-align: left;
  /* z-index: 10; */
}
.whiteBg{
  position:absolute;
  background-color:  rgba(255,255,255,0.8);
  height: 950px;
  width: 1700px;
  margin-top: 65px;
  margin-left: 110px;
  /*margin-bottom: 100px;*/
  border-radius: 30px;
  box-shadow:5px 5px 10px rgba(0,0,0,0.3)
}
.chatDiv{
  position:absolute;
  margin-top: 85px;
  margin-left: 200px;
}

.fake{
  position: absolute;
  margin-top: 100px;
  width: 1920px;
  z-index: 0;
}
.real{
  position: absolute;
  margin-top: 100px;
  width: 1920px;
  z-index: 0;
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
  z-index: 2;
}

#bgPic{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1080px;
  width: 1920px;
  background: url('../../static/bg0.png') no-repeat;
  z-index: 0;
}
@-webkit-keyframes myfirst /* Safari and Chrome */
{
    0%   {width:0px; margin-left: 1919px}
    10%   {width:0px; margin-left: 2500px}
    20%   {width:580px; margin-left: 2500px}
    100% {width:580px; margin-left: 1340px}
}
.el-card{
  border-radius: 15px;
}
</style>
