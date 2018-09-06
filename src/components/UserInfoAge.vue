<template>
  <div >
     <div id="title"> 多大了</div>
     <img ondragstart="return false" id="bg" src="../../static/info-bg.png"/>
      <el-slider id="slider" v-model="value" :format-tooltip="formatTooltip"></el-slider>
     <div id="line"/>
     <div id="greens">
        <div class="greenBox"/>
        <div class="greenBox"/>
        <div class="greenBox"/>
        <div class="greenBox"/>
        <div class="greenBox"/>
        <div class="greenBox"/>
     </div>
     <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>
  </div>
</template>

<script>
export default {
  name: 'UserInfoAge',
  data () {
    return {
      value: 10
    }
  },

  methods: {
    formatTooltip(val) {
       return parseInt(val / 100 * 40) + 18;
    },
    returnBtn: function(){
      this.$router.push({
        name: 'UserWelcome'
      })
    },
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
#title{
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    margin: auto;
    font-size: 30px;
    color: #ffffff;
    background-color: #5eced6;
    width: 200px;
    height: 70px;
    border: 2px;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 50px;
    text-align: center;
    line-height: 70px;
    margin-top: 200px;
}
#bg{
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 1200px;
  margin-top: 450px;
  z-index: 0;
}
#line{
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-top: 670px;
  width: 1000px;
  height: 6px;
  background-color: #FFFFFF
}
#returnBtn{
  position: absolute;
  height: 60px;
  width: 120px;
  margin-left: 650px;
  margin-top: 100px;
}
#slider{
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  margin-top: 653px;
  width: 1000px;
}
#greens{
  position:absolute;
  width: 1400px;
  height:1080px;
  margin-left: 220px;
  /* right: 0;
  left: 0;
  margin-right: 100px;
  margin: auto; */
}
.greenBox{
  margin-top: 657px;
  float:left;
  margin-left: 235px;
  width: 10px;
  height: 30px;
  border-radius: 5px;
  border: 2px;
  border-style: solid;
  border-color: #ffffff;
  background-color: #5eced6;
  /* margin-left: 10px;
  padding-left: 100px; */
}

</style>
