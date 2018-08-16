<template>
  <div class="index">
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
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
    var rtc = SkyRTC();


    document.getElementById("online").addEventListener("click", function(){
        console.log("online button is click")
        rtc.connect("ws://192.168.0.105:8123/websocket/1/bbb");
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
      // document.getElementById('other').src = URL.createObjectURL(stream);
      document.getElementById('other').srcObject = stream;
      // var newVideo = document.createElement("video"),
      // id = "other-" + "00";
      // newVideo.setAttribute("class", "other");
      // newVideo.setAttribute("autoplay", "autoplay");
      // newVideo.setAttribute("id", id);
      // videos.appendChild(newVideo);
      //
      // var element = document.getElementById(id);
      // if (navigator.mozGetUserMedia) {
      //     element.mozSrcObject = stream;
      //     element.play();
      // } else {
      //     element.src = webkitURL.createObjectURL(stream);
      // }
      // element.src = webkitURL.createObjectURL(stream);

    });

    rtc.on('matchMakerCallAnswer', function(data) {
      console.log("receive matchMakerCallAnswer");
      if (data.grabFlag === true){
        rtc.createStream({
          "video": true,
          "audio": true,
          "uid" : data.uid,
          "mid" : data.mid,
          "type" : "matchmaker"
        });
      }
      // var pc = rtc.createPeerConnection(data.uid)
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
