<template>
  <div>
    UserIndex
    <button id="online" v-on:click="online">上线</button>
    <button id="chat" v-on:click="callMatchmaker">连接红娘</button>
    <div id="matchMakers"/>
    <div id="videos">
      <video id="me" autoplay></video>
      <video id="other" autoplay></video>
    </div>
  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
var rtc = SkyRTC();
export default {
  name: 'UserIndex',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    online: function(){
      console.log("online button is click")
      rtc.connect("ws://192.168.0.105:8123/websocket/2/588")
    },

    callMatchmaker: function(){
      console.log("callMatchmaker button is click")
      rtc.socket.send(JSON.stringify({
          "eventName": "Call",
          "data": {
              "mid": "bbb",
          }
      }))
    }
  },
  mounted () {
      var videos = document.getElementById("videos");
      var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);

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
        // var element = document.getElementById('other');
        // if (navigator.mozGetUserMedia) {
        //     element.mozSrcObject = stream;
        //     element.play();
        // } else {
        //     element.src = webkitURL.createObjectURL(stream);
        // }
        // element.src = webkitURL.createObjectURL(stream);
        var addVideo = function(){
          document.getElementById('other').srcObject = stream;
          // var arr = Object.keys(document.getElementById('other').srcObject);
          if(isEmptyObject(document.getElementById('other').srcObject)){
            setTimeout(addVideo,200)
          }
        }
        setTimeout(addVideo,200)

      });

      rtc.on('matchMakerChangeStatus', function (data) {
          console.info("receive message:" + data);
          console.info(data);
          var matchMakers = document.getElementById("matchMakers");
          var content = [];
          Object.keys(data).forEach(function(key){
              content.push(`<p>${key}:${data[key]}</p>`);
              console.log(key,data[key]);

          });
          matchMakers.innerHTML = content.toString();
      });

      rtc.on('getAllMatchMakerStatus', function (data) {
          console.info("receive message:" + data);
          console.info(data);
          var matchMakers = document.getElementById("matchMakers");
          var content = [];
          Object.keys(data).forEach(function(key){
              content.push(`<p>${key}:${data[key]}</p>`);
              console.log(key,data[key]);

          });
          matchMakers.innerHTML = content.toString();
      });

      rtc.on('userCallAnswer', function(data) {
        console.log("receive UserCallAnswer");
        if (data.grabFlag === true){
          rtc.createStream({
            "video": true,
            "audio": true,
            "uid" : data.uid,
            "mid" : data.mid,
            "type" : "user"
          });
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button--primary {
  color: red;
}
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
