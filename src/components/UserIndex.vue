<template>
  <div id="userIndex" style="margin-top: 100px">
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
                <el-button type="danger" round class="button" v-show="!matchMaker.status" v-on:click="callBusy()">忙碌</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-show="videoFlagShow">
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
    </div>
    <zaDailog v-if="showDailog" @doCancel="closeDailog" @doBg="closeDailog" confirm="断开" message="确认断开连线?" @doConfirm="over"></zaDailog>
  </div>
</template>

<script>
import SkyRTC from '@/js/SkyRTC-client.js'
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'
import zaDailog from './zaDailog.vue'

var rtc = SkyRTC();

export default {
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
      matchMakers:
      [
          // { mid: 'aaa', status: true, name:'红娘1好',detail:"sdfds fsf dsf sd",picUrl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=998060827,1437492300&fm=27&gp=0.jpg"},
         // { name: 'bbb', status: false},
      ]
    }
  },
  components:{
    zaDailog
  },
  methods: {
    callMatchmaker: function(mid){
      console.log("callMatchmaker button is click")

      rtc.socket.send(JSON.stringify({
          "eventName": "Call",
          "data": {
              "mid": mid,
              "userId": Store.fetch('uid')
          }
      }))
    },
    callBusy: function(){
      this.$message.error('该红娘正在通话中，请稍等哦~');
    },
    closeDailog: function(){
      this.showDailog = false
    },
    over: function(){
      var that = this
      that.showDailog = false
      rtc.closePeerConnection(rtc.peerConnection)
      that.videoFlagShow = false
      that.videoOpen = true
      document.getElementById('me').srcObject = this.stream
      document.getElementById('me').muted = true
      // document.getElementById('me').play()
      rtc.socket.send(JSON.stringify({
          "eventName": "End",
          "data": {
              "id": that.uid,
          }
      }))
      that.$router.push({
        name: 'UserWelcome'
      })
    },
    down: function(id){
      // var that = this
      // this.$confirm('确认断开连线?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消'
      //   }).then(() => {
      //     rtc.closePeerConnection(rtc.peerConnection)
      //     that.videoFlagShow = false
      //     that.videoOpen = true
      //     document.getElementById('me').srcObject = this.stream
      //     document.getElementById('me').muted = true
      //     // document.getElementById('me').play()
      //     rtc.socket.send(JSON.stringify({
      //         "eventName": "End",
      //         "data": {
      //             "id": id,
      //         }
      //     }))
      //     that.$router.push({
      //       name: 'UserWelcome'
      //     })
      //   }).catch(() => {
      //     // that.$message({
      //     //   type: 'info',
      //     //   message: '断开失败'
      //     // });
      //   });
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
    }

  },
  mounted () {
      var URL = (window.URL || window.webkitURL || window.msURL || window.oURL);
      console.info(this.userId)
      var that = this
      this.uid = Store.fetch('client-id')
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
        document.getElementById('me').muted = true
        // document.getElementById('me').play();
      });

      //创建本地视频流失败
      rtc.on("stream_create_error", function() {
        alert("create stream failed!");
      });

      //接收到其他用户的视频流
      rtc.on('pc_add_stream', function(stream) {
        document.getElementById('other').srcObject = stream;
        // document.getElementById('other').play();
      });

      rtc.on('endAnswer', function (data) {
          rtc.closePeerConnection(rtc.peerConnection)
          // rtc.peerConnection = null
          that.$router.push({
            name: 'UserWelcome'
          })
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

      rtc.on('userSureCallAnswer', function(data) {
        console.log("receive userSureCallAnswer");
        if (data.grabFlag === true){
          that.redBigShow = false
          that.callContent = ''
          that.countDownShow = false
          rtc.emit("ready", data.mid, data.uid, "user");
        }
      })

      rtc.on('userCallAnswer', function(data) {
        console.log("receive userCallAnswer");
        if (data.grabFlag === true){
          that.videoFlagShow = true
          var doCountDown = function(){
            setTimeout(function(){
              if(that.countDown >= 1 && that.redBigShow && that.countDownShow){
                that.countDown--
                console.info(that.countDown)
                if(that.countDown === 0){
                  that.countDownShow = false
                  that.callContent = '红娘貌似不在哦'
                  setTimeout(function(){
                    console.info('quit ---- ')
                    that.$router.push({
                      name: 'UserWelcome'
                    })
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
#videos {
  position: relative;
  margin-right: 1400px;
  /* margin-top: 0px; */
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
  margin-left: 525px;
  margin-top: 480px;
  font-size: 50px;
  color: #ffffff;
}

#countDown{
  position: absolute;
  width: 400px;
  margin-left: 525px;
  margin-top: 350px;
  font-size: 100px;
  color: #ffffff;
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
