<template>
  <div class="zaDailog" v-show='showDailog'>
    <div class="bg" @click='doBg'>
    </div>
    <div class="dailog">
      <div class="title">
        <div class="titleText"> {{title}}</div>
        <div class="countDownNum" v-show='showCountDown'>{{count}}s</div>
        <div class="countDown" v-show='showCountDown'>后自动关闭</div>
      </div>
      <div class="content">{{message}}</div>
      <div class="buttom">
          <el-button round v-show='showCancel' @click='doCancel'>{{cancel}}</el-button>
          <el-button round type="primary" v-show='showConfirm' @click='doConfirm'>{{confirm}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zaDailog',
  data () {
    return {
        showDailog: true,
        count: 15
    }
  },
  props: {
    title: {
       type: String,
       default: '提示',
    },
    confirm: {
      type: String,
      default: '确认',
    },
    cancel: {
      type: String,
      default: '取消',
    },
    message: {
      type: String,
      default: '确认取消吗',
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showCountDown:{
      type: Boolean,
      default: false,
    },
    bgClose: {
      type: Boolean,
      default: true,
    },
    countDown: {
      type: Number,
      default: 15,
    }
  },
  methods: {
    doCancel: function(){
      this.showDailog = false
      this.$emit('doCancel')
    },
    doConfirm: function(){
      this.showDailog = false
      this.$emit('doConfirm')
    },
    doBg: function(){
      this.showDailog = !this.bgClose
      this.$emit('doBg')
    }
  },
  created() {
    var that = this
    var doingCountDown = function(){
      setTimeout(function(){
        if(that.count >= 1){
          that.count--
          console.info(that.count)
          if(that.count === 0){
            setTimeout(function(){
              console.info('quit ---- ')
              that.showDailog = false;
              that.$emit('doCountDown')
            },1000)
          }
          doingCountDown()
        }
      },1000)
    }

    if (this.showDailog == true && this.showCountDown == true){
      this.count = this.countDown
      doingCountDown()
    }
  }
}
</script>


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
.bg{
  /* text-align: center; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 1080px;
  width: 1920px;
  background-color: rgba(90, 90, 90, 0.5);
  z-index: 2000;
}
.dailog{
  position: absolute;
  z-index: 3000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 420px;
  margin-left: 710px;
  height: 240px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 10px;
}
.title{
  height: 40px;
  font-size:23px;
  color: #666666;
  text-align:left;
  margin-left: 25px;
  margin-top:15px;
}
.titleText{
  display: inline-block;
  /* margin-right: 10px; */
  right: 0;
}
.countDownNum{
  font-size:20px;
  color: #fa8dcc;
  display: inline-block;
  position: absolute;
  margin-right: 110px;
  margin-top: 7px;
  right: 0;
}
.countDown{
  font-size:13px;
  display: inline-block;
  position: absolute;
  margin-right: 40px;
  margin-top: 10px;
  right: 0;
}
.content{
  height: 95px;
  font-size:19px;
  color: #666666;
  margin-left: 25px;
  margin-right: 25px;
  margin-top:26px;
  vertical-align:middle;
  text-align:left;
  line-height: 20px;
}
.buttom{
  position: absolute;
  margin-right: 10px;
  margin-top: 10px;
  right: 0;
}
.el-button{
  width: 100px;
  height: 40px;
  font-size: 15px;
  /* margin-left: 30px;
  margin-right: 30px; */
}
</style>
