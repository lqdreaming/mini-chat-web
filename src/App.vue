<template>
  <div id="app">
    <router-view/>
    <zaDailog  v-if="netError" :bgClose=false :showCancel=false :showConfirm=false   message="网络异常"></zaDailog>
  </div>
</template>

<script>
import Store from '@/tool/store.js'
import axios from 'axios'
import Conf from '@/conf/conf.js'
import zaDailog from '@/components/zaDailog.vue'
export default {
  name: 'App',
  data () {
    return {
      netError: false
    }
  },
  created () {
    console.log(this.$router, window.localStorage, 2222);
  },
  components:{
    zaDailog
  },
  methods: {
      heart: function () {
        var that = this
        axios.get(Conf.API + '/heart')
        .then(function (response) {
          if (response.data.code === 0){
            that.netError = false
          }else {
            that.netError = true
          }
        })
        .catch(function (response) {
          that.netError = true
        });
      }
  },
  created() {
    var that = this
    setInterval(function(){that.heart()}, 2000)
  },
}

</script>

<style>
#app {
  /* position: absolute; */
  background:url('../static/bg0.png') no-repeat;
  background-size: 1920px 1080px;
  overflow: hidden;
  height: 1080px;
  width: 1920px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0;
}
.el-message-box{
  border-radius: 25px !important;
}
.el-button--primary {
  border-radius: 25px !important;
}
.el-button {
    border-radius: 10px !important;
    -webkit-tap-highlight-color: transparent !important;
    user-select: none !important;
}

/* .el-main {
  width: 500px !important;
} */

.el-message{
  border-radius: 25px !important;
  background-color: rgba(90, 90, 90, 0.9) !important;
}
.el-message__content{
  padding-bottom: 20px !important;
  font-size: 20px !important;
  color: #ffffff !important;
  text-align:center !important;
}
.el-slider__bar{
  height: 100px !important;
  background-color: rgba(90, 90, 90, 0) !important;
}
.el-slider__runway{
  height: 100px !important;
  background-color: rgba(90, 90, 90, 0) !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none !important;
}
.el-slider__button{
  width: 20px !important;
  height: 40px !important;
  border-radius: 10px !important;
  border: 2px !important;
  border-style: solid !important;
  border-color: #ffffff !important;
}

.el-tooltip__popper{
  width:60px !important;
  height: 60px !important;
  border-radius: 20px !important;
  font-size: 25px !important;
  text-align: center !important;
  line-height: 60px !important;
}
</style>
