<template>
    <el-container>
    <el-header>
      <el-button type="primary" round v-show="!videoStatus" v-on:click="up(uid)">上线</el-button>
      <el-button type="danger" round v-show="videoStatus" v-on:click="down(uid)">下线</el-button>
    </el-header>
    <el-container>

      <el-main>
        <div id="videos">
          <video id="me" autoplay></video>
          <div id="blackBroad"></div>
          <video id="other" autoplay></video>

        </div>
      </el-main>
      <el-aside width="500px">
        <h2>用户基本信息</h2>
        性别：女
        <br>
        年龄：24
        <br><br>
        <h2>记录小记</h2>
        <el-input
          type="textarea"
          :rows="8"
          placeholder="请输入小记内容"
          v-model="textarea">
        </el-input>
        <br><br>
        <el-button type="primary" round>保存</el-button>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
var rtc = SkyRTC();
export default {
  name: 'MatchmakerIndex',
  data () {
    return {
      stream: null,
      uid: "",
      mid: "",
      videoStatus: true
    }
  },
  methods: {
    down: function(id){
      // rtc.closePeerConnection(rtc.peerConnection)
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
      // rtc.closePeerConnection(rtc.peerConnection)
      // rtc.socket.send(JSON.stringify({
      //     "eventName": "End",
      //     "data": {
      //         "id": id
      //     }
      // }))
      rtc.connect(Conf.WS_ADDRESS + "/1/" + this.mid);
      this.videoStatus = true
    }
  },
  mounted () {
    var videos = document.getElementById("videos");
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    var that = this
    this.mid = this.$route.params.mid


    rtc.connect(Conf.WS_ADDRESS + "/1/" + this.$route.params.mid);

    rtc.createStream({
      "video": true,
      "audio": true
      // "uid" : data.uid,
      // "mid" : data.mid,
      // "type" : "user"
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
    });

    rtc.on('closeVideo', function(stream) {
      document.getElementById('other').srcObject = null
    });

    rtc.on('openVideo', function(stream) {
      document.getElementById('other').srcObject = that.stream
      document.getElementById('me').play()
    });

    rtc.on('endAnswer', function (data) {
        rtc.closePeerConnection(rtc.peerConnection)
    });

    rtc.on('matchMakerCallAnswer', function(data) {
      console.log("receive matchMakerCallAnswer");
      if (data.grabFlag === true){
        that.uid = data.uid
        rtc.emit("ready", data.mid, data.uid, "matchmaker");
      // rtc.createStream({
      //   "video": true,
      //   "audio": true,
      //   "uid" : data.uid,
      //   "mid" : data.mid,
      //   "type" : "matchmaker"
      // });
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  color: #409EFF;
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
  position: absolute;
  overflow: auto;
  background-color: #aab8a3;
}

#me {
  position: absolute;
  display: inline-block;
  right:0px;
  bottom:0px;
  width: 200px;
  height: 150px;
}

#blackBroad {
  ackground-color: #aab8a3;
  right:0px;
  bottom:0px;
  width: 670px;
  height: 500px;
}

#other {
  background-color: #aab8a3;
  display: inline-block;
  right:0px;
  bottom:0px;
  width: 670px;
  height: 500px;
}
</style>
