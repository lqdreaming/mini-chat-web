<template>

    <div>
      <div style="margin-top:50px">
        工号:{{mid}}
        <el-button type="primary" round v-show="!videoStatus" v-on:click="up(uid)">上线</el-button>
        <el-button type="danger" round v-show="videoStatus" v-on:click="down(uid)">下线</el-button>
        <el-button type="primary" round  v-on:click="closeChat(uid)">结束通话</el-button>
        <el-button type="info" round  v-on:click="logout()">注销登录</el-button>
      </div>
      <div style="margin-top:50px;">
        <div id="videos" style=" display:inline-block">
          <video id="other" autoplay></video>
          <div id="blackBroad" v-show="blackBroadShow">用户关闭了摄像头</div>
          <video id="me" autoplay></video>
        </div>
        <div style="width:500px; margin-left:200px;vertical-align:top;display:inline-block">
          <h2>用户基本信息</h2>
          <br>
          状态：
          <p v-if="userDetail.status == 1" style="color:green">已验证手机号</p>
          <p v-else style="color:red">未验证手机号</p>

          <br>
          性别：{{userDetail.gender}}
          <br>
          年龄：{{userDetail.age}}
          <br>
          情感状态: {{userDetail.marriage}}
          <br>
          便签: {{userDetail.memo}}

          <br><br>
          <h2>记录小记</h2>
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入小记内容"
            v-model="note">
          </el-input>
          <br><br>
          <el-button type="primary" round v-on:click="saveNote()">保存</el-button>
        </div>
      </div>
    </div>
  
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'

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
      userDetail: "",
    }
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
      this.videoStatus = true
    },
    closeChat: function(id){
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": id,
          }
      }))
    },
    saveNote: function(){
      var that = this
      axios.post(Conf.API + '/note', {
        mid: this.mid,
        uid: this.userId,
        note: this.note
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
    }
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
      document.getElementById('other').play()
      that.blackBroadShow = false
      axios.get(Conf.API + '/userInfo/' + that.userId)
        .then(function (response) {
          var responseData = response.data.data
          console.log(response.data.code);
            if (response.data.code === 0){
                console.info(responseData)
                that.userDetail = responseData
            }
        })
        .catch(function (response) {
          console.log(response)
        })
    });

    rtc.on('closeVideo', function() {
      that.blackBroadShow = true
    });

    rtc.on('openVideo', function() {
      that.blackBroadShow = false
    });

    rtc.on('endAnswer', function (data) {
      rtc.closePeerConnection(rtc.peerConnection)
      rtc.peerConnection = null
    });

    rtc.on('matchMakerCallAnswer', function(data) {
      console.log("receive matchMakerCallAnswer")
      if (data.grabFlag === true){
        that.uid = data.uid
        that.userId = data.userId
        rtc.emit("ready", data.mid, data.uid, "matchmaker")
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color: #ebebeb;
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
}

#me {
  position: absolute;
  /* display: inline-block; */
  right:0;
  bottom:0px;
  width: 300px;
  height: 225px;
  background-color: #000000;
}

#blackBroad {
  position: absolute;
  background-color: #aab8a3;
  /* display: inline-block; */
  right:0px;
  bottom:0px;
  width: 998px;
  height: 750px;
}

#other {
  position: absolute;
  background-color: #aab8a3;
  /* display: inline-block; */
  right:0px;
  bottom:0px;
  width: 998px;
  height: 750px;
}
</style>
