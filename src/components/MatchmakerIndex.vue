<template>
  <div>
    MatchmakerIndex
    <button id="online">上线</button>
    <div id="videos">
      <video id="me" autoplay></video>
      <video id="other" autoplay></video>
    </div>
  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'

export default {
  name: 'MatchmakerIndex',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    var videos = document.getElementById("videos");
    var rtc = SkyRTC();

      //成功创建WebSocket连接
    rtc.on("connected", function(socket) {
      //创建本地视频流
      rtc.createStream({
        "video": true,
        "audio": true
      });
    });

    document.getElementById("online").addEventListener("click", function(){
        console.log("online button is click")
        rtc.connect("ws://127.0.0.1:8123/websocket/1/bbb");
    });

    //创建本地视频流成功
    rtc.on("stream_created", function(stream) {
      document.getElementById('me').src = URL.createObjectURL(stream);
      document.getElementById('me').play();
    });

    //创建本地视频流失败
    rtc.on("stream_create_error", function() {
      alert("create stream failed!");
    });

    //接收到其他用户的视频流
    rtc.on('pc_add_stream', function(stream) {
      document.getElementById('other').src = URL.createObjectURL(stream);
    });
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
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

#videos {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  border: 3px solid #0f0f0f;
}

#videos video {
  display: inline-block;
  width: 32%;
  border: 3px solid #0f0f0f;
}
</style>
