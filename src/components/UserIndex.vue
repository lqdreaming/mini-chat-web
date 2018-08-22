<template>
  <div>
    <div v-show="!videoFlagShow">
      <el-row>
        <el-col :span="6" v-for="(matchMaker, index) in matchMakers" :key="index" :offset="2">
          <el-card :body-style="{ padding: '0px' }">
            <img v-bind:src="matchMaker.picUrl" class="image">
            <div style="padding: 14px;">
              {{matchMaker.name}}
              <br>
              <span>简介:</span>{{matchMaker.detail}}
              <div class="bottom clearfix">
                <el-button type="primary" round class="button" v-show="matchMaker.status" v-on:click="callMatchmaker(matchMaker.mid)">连线</el-button>
                <el-button type="danger" round class="button" v-show="!matchMaker.status" v-on:click="callMatchmaker(matchMaker.mid)">忙碌</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="videoFlagShow">
      <br>
      <el-button type="primary" round v-on:click="down(uid)">下线</el-button>
      <el-button type="danger" round v-show="videoOpen" v-on:click="closeVideo()">关闭摄像头</el-button>
      <el-button type="success" round v-show="!videoOpen" v-on:click="openVideo()">开启摄像头</el-button>
      <br>
      <br>
      <br>
      <div id="videos">
        <video id="me" autoplay></video>
        <video id="other" autoplay></video>
      </div>
    </div>


  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
import axios from 'axios'

var rtc = SkyRTC();

export default {
  name: 'UserIndex',
  data () {
    return {
      uid: "",
      stream: null,
      videoFlagShow: false,
      videoOpen: true,
      matchMakers:
      [
          // { mid: 'aaa', status: true, name:'红娘1好',detail:"sdfds fsf dsf sd",picUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=998060827,1437492300&fm=27&gp=0.jpg"},
         // { name: 'bbb', status: false},
      ]
    }
  },
  methods: {
    callMatchmaker: function(mid){
      console.log("callMatchmaker button is click")
      this.videoFlagShow = true
      rtc.socket.send(JSON.stringify({
          "eventName": "Call",
          "data": {
              "mid": mid,
          }
      }))
    },
    down: function(id){
      rtc.closePeerConnection(rtc.peerConnection)
      this.videoFlagShow = false
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": id,
          }
      }))
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
      document.getElementById('me').play()
      rtc.socket.send(JSON.stringify({
          "eventName": "OpenVideo",
          "data": {
              "uid": this.uid
          }
      }))
    }

  },
  mounted () {
      var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
      console.info(this.userId)
      var that = this
      this.uid = this.$route.params.userId
      console.log("this.uid：" + this.uid)

      rtc.connect(Conf.WS_ADDRESS + "/2/" + this.uid)

      rtc.createStream({
        "video": true,
        "audio": true
        // "uid" : data.uid,
        // "mid" : data.mid,
        // "type" : "user"
      });

      //创建本地视频流成功
      rtc.on("stream_created", function(stream) {
        that.stream = stream
        document.getElementById('me').srcObject = stream;
        document.getElementById('me').play();
      });

      //创建本地视频流失败
      rtc.on("stream_create_error", function() {
        alert("create stream failed!");
      });

      //接收到其他用户的视频流
      rtc.on('pc_add_stream', function(stream) {
        document.getElementById('other').srcObject = stream;
        document.getElementById('other').play();
        // var addVideo = function(){
        //   document.getElementById('other').srcObject = stream;
        //   document.getElementById('other').play();
        //   // if(isEmptyObject(document.getElementById('other').srcObject)){
        //   //   setTimeout(addVideo,200)
        //   // }
        // }
        // setTimeout(addVideo,200)
      });

      rtc.on('endAnswer', function (data) {
          rtc.closePeerConnection(rtc.peerConnection)
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
                      that.matchMakers.push({mid:data.mid, status: data.status, name:responseData.name, detail:responseData.detail,picUrl:responseData.picUrl});
                  }
              })
              .catch(function (response) {
                console.log(response)
              })
          }
          console.info(that.matchMakers)
      });

      rtc.on('getAllMatchMakerStatus', function (data) {
          // var that2 = that
          Object.keys(data).forEach(function(key){
              // content.push(`<p>${key}:${data[key]}</p>`);
              axios.get(Conf.API + '/matchmakerInfo/' + key)
              .then(function (response) {
                var responseData = response.data.data
                console.log(response.data);
                  if (response.data.code === 0){
                      that.matchMakers.push({mid:key, status: data[key], name:responseData.name, detail:responseData.detail, picUrl:responseData.picUrl});
                      // that.matchMakers.push({mid:6666, status: false, name:responseData.name});
                  }
              })
              .catch(function (response) {
                console.log(response);
              });
              // that.matchMakers.push({mid:key, status: data[key]});

              console.log(key,data[key]);
          });
          console.log(that.matchMakers);
      });

      rtc.on('userCallAnswer', function(data) {
        console.log("receive UserCallAnswer");
        if (data.grabFlag === true){
          rtc.emit("ready", data.mid, data.uid, "user");
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

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}


</style>
