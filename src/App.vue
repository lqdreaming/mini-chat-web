<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Store from '@/tool/store.js'

export default {
  name: 'App',
  mounted() {


  },
}

</script>

<style>
#app {
  background:url('../static/background.jpg') no-repeat;
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
  height: 0px !important;
}
.el-slider__runway{
  height: 0px !important;
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
