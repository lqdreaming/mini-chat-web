<template>
  <div class="index">
    <VerifyPhone v-if="show" id="VerifyPhone" @close="showDailog = true"></VerifyPhone>

    <!-- <el-button type="primary" round v-on:click="test">open</el-button> -->
    <div class="button">
      <el-button type="primary" round v-on:click="show=!show">驗證</el-button>
      <el-button type="primary" round v-on:click="user">用户端</el-button>
      <el-button type="primary" round v-on:click="matchmaker">红娘端</el-button>
    </div>
    <zaDailog v-if="showDailog" @doCancel="showDailog = false" @doConfirm="showDailog = false" @doBg="showDailog = false" cancel="跳过" confirm="去验证" message="完成验证即可以连线长达10分钟，而跳过只能连线5分钟噢~"></zaDailog>
  </div>
</template>

<script>
import zaDailog from './zaDailog.vue'
import zaInputDailog from './zaInputDailog.vue'
import VerifyPhone from './VerifyPhone.vue'

export default {
  name: 'Index',
  data () {
    return {
        show: true,
        showDailog: false,
    }
  },
  components:{
    zaDailog,
    zaInputDailog,
    VerifyPhone
  },
  methods: {
    // test: function(){
    //   console.info('3333333');
    //   this.$refs.dialog.showDailog = true;
    // },
    user: function(){
      this.$router.push({
        path:'/UserLogin'
      })
    },
    matchmaker: function(){
      this.$router.push({
        path:'/MatchmakerLogin'
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
.index{
  /* position: relative; */
  width: 1920px;
  /* overflow: hidden; */
}
.button{
  position:absolute;
  margin-top: 450px;
  left: 0;
  right: 0;
}
#VerifyPhone{
  position:absolute;
  animation:myfirst 0.5s;
  -webkit-animation:myfirst 0.5s;
  animation-fill-mode: forwards;
  /* margin-left: 2500px */
}
@-webkit-keyframes myfirst /* Safari and Chrome */
{
    0%   {width:0px; margin-left: 1919px}
    10%   {width:0px; margin-left: 2500px}
    20%   {width:580px; margin-left: 2500px}
    100% {width:580px; margin-left: 1340px}
}
</style>
