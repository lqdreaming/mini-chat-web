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
    border-radius: 5px;
}
.el-button {
    border-radius: 5px;
}
.el-main {
    width: 500px;
}
</style>
