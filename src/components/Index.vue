<template>
  <div class="index">
     <!-- <zaInputDailog @doCancel="test" ref="dialog"></zaInputDailog> -->
    <!-- <el-button type="primary" round v-on:click="test">open</el-button> -->
    <el-button style="margin-top: 450px;margin-left:auto;margin-right:auto" type="primary" round v-on:click="user">用户端</el-button>
    <el-button style="margin-top: 450px;margin-left:50px;margin-right:auto" type="primary" round v-on:click="matchmaker">红娘端</el-button>
  </div>
</template>

<script>
import zaDailog from './zaDailog.vue'
import zaInputDailog from './zaInputDailog.vue'

export default {
  name: 'Index',
  data () {
    return {
        // show: false
    }
  },
  components:{
    zaDailog,
    zaInputDailog
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

</style>
