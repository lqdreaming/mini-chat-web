<template>
  <div class="index">
    MatchmakerIndex
    <div id="videos">
      <video id="me" autoplay></video>
      <video id="other" autoplay></video>
    </div>
  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'

export default {
  name: 'MatchmakerIndex',
  data () {
    return {
      stream: null
    }
  },
  methods: {

  },
  mounted () {
    var videos = document.getElementById("videos");
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    var that = this

    var rtc = SkyRTC();
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
      document.getElementById('me').srcObject = stream;
      document.getElementById('me').play();
    });

    //创建本地视频流失败
    rtc.on("stream_create_error", function() {
      alert("create stream failed!");
    });

    //接收到其他用户的视频流
    rtc.on('pc_add_stream', function(stream) {
      var addVideo = function(){
        that.stream = stream
        document.getElementById('other').srcObject = that.stream
        if(typeof document.getElementById('other').srcObject == "undefined"){
          // console.info("213132134444444-------5")
          setTimeout(addVideo,200)
        }
        document.getElementById('other').play()
      }
      setTimeout(addVideo,200)
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
  border: 3px solid #0f0f0f;
}

#videos video {
  display: inline-block;
  width: 32%;
  border: 3px solid #0f0f0f;
}
</style>
