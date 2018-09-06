<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
  border-radius: 25px;
}
.el-button--primary {
  border-radius: 25px;
}
.el-button {
    border-radius: 10px;
}

.el-main {
  width: 500px;
}

.el-message{
  border-radius: 25px;
  background-color: rgba(90, 90, 90, 0.9);
  /* width: 200px; */
  /* height: 80px; */
  /* font-size: 20px;
  text-align:center; */
  /* line-height: 80px; */
}
.el-message__content{
  padding-bottom: 20px;
  font-size: 20px;
  color: #ffffff;
  text-align:center;
}
</style>
