<template>

    <div>
      <div id="bg" />
      <div id="banner">
        <div id="worker">
          <div id="workerInfo">工号:{{mid}}</div>
          <div id="workerStatus">状态:
            <a v-if="workerStatus == 1" style="color:#ff6d6d">繁忙</a>
            <a v-else-if="workerStatus == 2" style="color:#50bfff">空闲</a>
            <a v-else style="color:#FFFFFF">离线</a>
          </div>
        </div>
        <div id="buttonDiv">
          <el-button type="text" round v-show="!videoStatus" :disabled=isChatting v-on:click="up(uid)">上线</el-button>
          <el-button type="text" round v-show="videoStatus" :disabled=isChatting v-on:click="down(uid)">下线</el-button>
          <el-button type="text" round  :disabled=!isChatting v-on:click="showCancelDailog = true">结束通话</el-button>
          <el-button type="text" round :disabled=isChatting v-on:click="logout()">注销登录</el-button>
        </div>
      </div>
      <div id="content" >
        <div id="videos" style=" display:inline-block">
          <video id="other" autoplay></video>
          <div id="blackBroad" v-show="blackBroadShow"><br><br><br><br><br><br><br><br><br><br>{{blackBroadContent}}</div>
          <video id="me" autoplay></video>
          <div id="smallBlackBroad" v-show="!videoStatus"><p><br><br>已下线</p></div>
          <div id="smallBlackBroad"  v-show="workerStatus == 1 && isChatting == false"><p><br><br>繁忙中</p></div>
          <div v-show="isChatting" id="timeOnChat">
            {{minShow}}:{{secondShow}}
          </div>
        </div>
        <div id="text">
          <div v-if="workerStatus == 1" id="text1">
            <h2>用户基本信息</h2>
            <br>
            状态：
            <a v-if="userDetail.status == 1" style="color:#50bfff">已验证手机号</a>
            <a v-else-if="userDetail.status == 0" style="color:#ff6d6d">未验证手机号</a>

            <br>
            性别：{{userDetail.gender}}
            <br>
            年龄：{{userDetail.age}}
            <br>
            情感状态: {{userDetail.marriage}}
            <br>
            便签: {{userDetail.label}}
          </div>
          <div v-else id="text1">
            <h2>等待用户连线</h2>
          </div>

          <div id="text2">
            <h2>用户称谓</h2>
              <el-input v-model="userName" placeholder="请输入用户称谓(选填)"></el-input>
            <h2>记录小记</h2>
            <el-input
              type="textarea"
              :rows="8"
              resize = "none"
              placeholder="请输入小记，视频结束后有2分钟的填写时间，时间结束将会自动提交。(必填)"
              v-model="note">
            </el-input>
            <br><br>
            <div style="display:inline">
              <el-button type="primary" :disabled="workerStatus == 3 || workerStatus == 2" round v-on:click="saveNote()">保存</el-button>
              <el-button :disabled="isChatting || workerStatus == 3 || workerStatus == 2" type="info" v-on:click="saveNoteAndUp()" round>提交并变更状态为空闲</el-button>
              <p v-show="saveTimeFlag" style="float: right;margin-top:7px;margin-right:70px;color:#ff5292">{{saveTime}} s后自动提交</p>
            </div>
          </div>

        </div>
      </div>

      <zaDailog v-if="showDailog" @doCountDown="doCountDown()" :bgClose=false :showCountDown=true :showCancel=false confirm="开始连线" message="有用户正在请求视频，确认接听连线?" @doConfirm="receiveVideo" ref="dialog"></zaDailog>
      <zaInputDailog v-if="showInputDailog" :bgClose=false @doConfirm="commitReason"></zaInputDailog>
      <zaDailog v-if="showCancelDailog" @doCancel="closeDailog" @doBg="closeDailog" confirm="断开" message="确认断开连线?（用户会直接退回欢迎页，非特殊情况请勿进行此操作）" @doConfirm="closeChat(uid)"></zaDailog>
    </div>

</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'
import zaDailog from './zaDailog.vue'
import zaInputDailog from './zaInputDailog.vue'

var rtc = SkyRTC();

export default {
  name: 'MatchmakerIndex',
  data () {
    return {
      stream: null,
      uid: "",
      userId: "",
      mid: "",
      note: "",
      videoStatus: true,
      blackBroadShow: false,
      countDown: 15,
      userDetail: "",
      blackBroadContent: "",
      dialogVisible: false,
      showDailog: false,
      showInputDailog: false,
      showCancelDailog: false,
      chatFlag: false,
      isChatting: false,
      workerStatus: 2,
      userName: '',
      onChat: true,
      min: 0,
      second: 0,
      minShow: '00',
      secondShow: '00',
      saveTime: 120,
      saveTimeFlag: false,
      overByMatchMaker: false,
      chatTime: 5
    }
  },
  components:{
    zaDailog,
    zaInputDailog
  },
  methods: {
    logout: function(id){
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": id,
          }
      }))
      this.$router.push({
        name: 'MatchmakerLogin'
      })
    },
    down: function(id){
      this.videoStatus = false
      this.workerStatus = 3
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": id,
          }
      }))
      rtc.socket.close()
    },
    up: function(){
      rtc.connect(Conf.WS_ADDRESS + "/1/" + this.mid);
      this.workerStatus = 2
      this.videoStatus = true
    },
    closeDailog: function(){
      this.showCancelDailog = false
    },
    commitReason: function(textarea){
      var that = this
      this.showInputDailog = false
      axios.post(Conf.API + '/note', {
        uid: this.userId,
        mid: this.mid,
        rejectReason: textarea,
      })
      .then(function (response) {
        console.log(response.data.code);
        if (response.data.code === 0){
          that.$message.success('保存理由成功');
        }else {
          that.$message.error('保存理由失败');
        }
      })
      .catch(function (response) {
        that.$message.error('保存理由失败');
      });

      if (this.overByMatchMaker == false){
        console.info('IsOk')
        rtc.socket.send(JSON.stringify({
            "eventName": "IsOk",
            "data": {
                "mid": that.mid,
                "isOk": true,
            }
        }))
      }else {
        this.overByMatchMaker == false
      }
    },
    countTime: function () {
      if (this.isChatting){
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
        if(this.second == 0 && this.chatTime - this.min == 0){
          rtc.closePeerConnection(rtc.peerConnection)
          this.blackBroadShow = true
          this.isChatting = false
          this.chatFlag = false
          this.blackBroadContent = '连线结束'
          rtc.peerConnection = null
        }
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(this.countTime, 1000);
      }else {
        this.second = 0
        this.min = 0
        this.minShow = ''
        this.secondShow = ''
      }
    },
    countSaveTime: function () {
      var that = this
      if (this.saveTimeFlag && this.saveTime >= 0){
        this.saveTime--
        if (this.saveTime == 0){
          axios.post(Conf.API + '/note', {
            mid: this.mid,
            uid: this.userId,
            note: this.note,
            nickname: this.userName,
          })
          .then(function (response) {
            console.log(response.data.code);
            if (response.data.code === 0){
              that.$message.success('自动提交小记成功');
              that.workerStatus = 2
              that.note = ""
              that.userName = ""
              that.userDetail = ""
              that.saveTimeFlag = false
              that.blackBroadContent = '等待用户连线'
              that.saveTime = 120
              rtc.socket.send(JSON.stringify({
                  "eventName": "MatchMakerStatus",
                  "data": {
                      "mid": that.mid,
                      "status": true
                  }
              }))
            }else {
              that.$message.error('自动提交小记失败');
            }
          })
          .catch(function (response) {
            that.$message.error('保存小记失败');
          });
        }
        setTimeout(this.countSaveTime, 1000);
      }else {
        this.saveTime = 120
      }
    },
    doCountDown: function(){
      var that = this
      this.showDailog = false

      //write the reject reason
      if (this.chatFlag == true){
        this.chatFlag = false
      }else {
        this.showInputDailog = true
        rtc.socket.send(JSON.stringify({
            "eventName": "SureCall",
            "data": {
                "mid": that.mid,
                "uid": that.uid,
                "userId": that.userId,
                "grabFlag": false
            }
        }))
      }
    },
    receiveVideo: function(){
      console.info("receiveVideo Button")
      var that = this
      this.dialogVisible = false
      this.chatFlag = true
      rtc.socket.send(JSON.stringify({
          "eventName": "SureCall",
          "data": {
              "mid": that.mid,
              "uid": that.uid,
              "userId": that.userId,
              "grabFlag": true
          }
      }))
    },
    closeChat: function(id){
      var that = this
      this.showInputDailog = true
      this.showCancelDailog = false
      this.overByMatchMaker = true
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": this.mid,
          }
      }))
    },
    saveNote: function(){
      var that = this
      axios.post(Conf.API + '/note', {
        mid: this.mid,
        uid: this.userId,
        note: this.note,
        nickname: this.userName,
      })
      .then(function (response) {
        console.log(response.data.code);
        if (response.data.code === 0){
          that.$message.success('保存小记成功');
        }else {
          that.$message.error('保存小记失败');
        }
      })
      .catch(function (response) {
        that.$message.error('保存小记失败');
      });
    },
    saveNoteAndUp: function(){
      var that = this

      if(this.note == ""){
        this.$message.error('请输入小记');
      }else{
        axios.post(Conf.API + '/note', {
          mid: this.mid,
          uid: this.userId,
          note: this.note,
          nickname: this.userName,
        })
        .then(function (response) {
          console.log(response.data.code);
          if (response.data.code === 0){
            that.$message.success('保存小记成功');
            that.workerStatus = 2
            that.note = ""
            that.userName = ""
            that.userDetail = ""
            that.blackBroadContent = '等待用户连线'
            that.saveTimeFlag = false
            that.saveTime = 120
            rtc.socket.send(JSON.stringify({
                "eventName": "MatchMakerStatus",
                "data": {
                    "mid": that.mid,
                    "status": true
                }
            }))
          }else {
            that.$message.error('保存小记失败');
          }
        })
        .catch(function (response) {
          that.$message.error('保存小记失败');
        });

      }
    },
  },

  mounted () {
    var videos = document.getElementById("videos");
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    var that = this
    this.mid = Store.fetch('mid')

    rtc.connect(Conf.WS_ADDRESS + "/1/" + this.mid);

    rtc.createStream({
      "video": true,
      "audio": true
    });
    //创建本地视频流成功
    rtc.on("stream_created", function(stream) {
      document.getElementById('me').srcObject = stream
      document.getElementById('me').muted = true
      document.getElementById('me').play()
    });

    //创建本地视频流失败
    rtc.on("stream_create_error", function() {
      alert("create stream failed!");
    });

    //接收到其他用户的视频流
    rtc.on('pc_add_stream', function(stream) {
      that.stream = stream
      document.getElementById('other').srcObject = that.stream
      // document.getElementById('other').play()
      // that.blackBroadShow = false
      axios.get(Conf.API + '/userInfo/' + that.userId)
        .then(function (response) {
          var responseData = response.data.data
          console.log(response.data.code);
            if (response.data.code === 0){
                console.info(responseData)
                that.userDetail = responseData
                if(responseData.status == 1){
                  that.chatTime = 10
                }else{
                  that.chatTime = 5
                }
            }
        })
        .catch(function (response) {
          console.log(response)
        })
    });

    rtc.on('closeVideo', function() {
      console.info('closeVideo')
      that.blackBroadShow = true
      that.blackBroadContent = '用户关闭了摄像头'
    });

    rtc.on('openVideo', function() {
      that.blackBroadShow = false
    });

    rtc.on('endAnswer', function (data) {
      rtc.closePeerConnection(rtc.peerConnection)
      that.blackBroadShow = true
      that.isChatting = false
      that.chatFlag = false
      that.blackBroadContent = '连线结束'
      rtc.peerConnection = null
      that.$message.success('用户结束连线，请及时提交小记，并将状态改为空闲中');
      that.saveTimeFlag = true
      that.countSaveTime()
    });

    rtc.on('matchMakerSureCallAnswer', function(data) {
      console.log("receive matchMakerSureCallAnswer", data.grabFlag)
      if (data.grabFlag === true){
        that.uid = data.uid
        that.userId = data.userId
        that.isChatting = true

        that.workerStatus = 1
        that.showDailog = false
        that.min = 0
        that.second = 0
        that.minShow = '00'
        that.secondShow = '00'
        that.countTime()
        rtc.emit("ready", data.mid, data.uid, "matchmaker")
      }
    })

    rtc.on('matchMakerCallAnswer', function(data) {
      that.mid = data.mid
      that.uid = data.uid
      that.userId = data.userId
      that.blackBroadShow = false
      console.log("receive matchMakerCallAnswer")

      if (data.grabFlag === true){
        that.showDailog = true
        // doCountDown()
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
a {
  color: #42b983;
}
.el-dailog{
  border-radius: 25px;
}
index {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#videos {
  position: relative;
  /* overflow: auto; */
  background-color: #aab8a3;
  width: 998px;
  height: 750px;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  /* border-radius: 20px; */
}

#me {
  position: absolute;
  /* display: inline-block; */
  right:0;
  bottom:0px;
  width: 300px;
  height: 225px;
  background-color: #000000;
  margin-right: 1px;
  margin-bottom: 1px;
  /* border-radius: 20px; */
}

#smallBlackBroad{
  position: absolute;
  /* display: inline-block; */
  right:0;
  bottom:0px;
  width: 300px;
  height: 225px;
  background-color: #3d444c;
  color: #ffffff;
  font-size: 25px;
  text-align:center;//水平居中
  line-height: 225px;
  vertical-align: middle;
  display: table-cell;
  margin-right: 1px;
  margin-bottom: 1px;
  /* border-radius: 20px; */
}
#blackBroad {
  position: absolute;
  background-color: #aab8a3;
  font-size: 30px;
  color: #ffffff;
  right:0px;
  bottom:0px;
  width: 998px;
  height: 750px;
  text-align:center;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  /* border-radius: 20px; */
}

#other {
  position: absolute;
  background-color: #aab8a3;
  /* display: inline-block; */
  right:0px;
  bottom:0px;
  width: 998px;
  height: 750px;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  /* border-radius: 20px; */
}

#timeOnChat {
  position: absolute;
  font-size: 50px;
  color: #ffffff;
  border-style: solid;
  border-color: #5eced6;
  background-color: #5eced6;
  margin-left: -1px;
  /* border-radius: 20px; */
}

#text{
  width:500px;
  height: 400px;
  margin-left: 50px;
  vertical-align:top;
  display: inline-block;
  text-align: left;
}

#text1{
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  color: #000000;
  /* border-radius: 20px; */
  margin-top: 5px;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
}
#text2{
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  color: #000000;
  /* border-radius: 20px; */
  margin-top: 55px;
  border: solid;
  border-width: 1px;
  border-color: #e0e0e0;
}
#buttonDiv{
  position: absolute;
  height: 60px;
  width: 300px;
  right: 0;
  margin-right: 1%;
  margin-top: 12px;
  /* margin-top: 20px; */
  /* background-color: rgba(90, 90, 90, 0.5); */
  text-align: center;
  /* border-radius: 20px; */
  /* padding-top: 20px; */
}
#worker{
  position: absolute;
  height: 80px;
  width: 400px;
  /* margin-left: 60px; */
  /* margin-top: 20px; */
  /* background-color: rgba(90, 90, 90, 0.5); */
  text-align: center;
  /* border-radius: 20px; */
}
#workerStatus{
  margin-top: 15px;
  margin-left: 25px;
  float:left;
  color: #FFFFFF;
  font-size: 17px;
}
#workerInfo{
  float:left;
  margin-top: 15px;
  margin-left: 20px;
  color: #FFFFFF;
  font-size: 17px;
}
#content{
  position: absolute;
  margin-top:70px;
  /* background-color: rgba(90, 90, 90, 0.5); */
  width: 100%;
  /* height: 1080px; */
  margin-left: 1%;
  height: auto;
  padding-top: 60px;
  padding-bottom: 100px;
  /* border-radius: 20px; */
}
#bg{
  /* text-align: center; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* margin: auto; */
  height: 100%;
  width: 100%;
  background-color: #eeeeee;
  z-index: 0;
}
#banner{
  position: absolute;
  /* margin-top:10px; */
  width: 100%;
  height: 60px;
  background-color: #3d444c;
}
.el-button--text {
  color: #ffffff;
}
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
  color: #cccccc;
}
.el-button{
  border-radius: 0px;
}
</style>
