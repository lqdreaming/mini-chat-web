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
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {

  },
  mounted () {
    var videos = document.getElementById("videos");
    var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);

    var rtc = SkyRTC();
    rtc.connect(Conf.WS_ADDRESS + "/1/" + this.$route.params.mid);
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
        // alert("ready video")
        document.getElementById('other').srcObject = stream
        document.getElementById('other').play();
        // if(isEmptyObject(document.getElementById('other').srcObject)){
        //   setTimeout(addVideo,200)
        // }
      }
      setTimeout(addVideo,1000)
    });

    rtc.on('matchMakerCallAnswer', function(data) {
      console.log("receive matchMakerCallAnswer");
      if (data.grabFlag === true){
        // rtc.createStream({
        //   "video": true,
        //   "audio": true,
        //   "uid" : data.uid,
        //   "mid" : data.mid,
        //   "type" : "matchmaker"
        // });
        rtc.emit("ready", data.mid, data.uid, "matchmaker");
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
