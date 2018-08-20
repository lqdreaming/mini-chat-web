<template>
  <div class="index">
    <el-button type="primary" round v-on:click="user">用户端</el-button>
    <el-button type="primary" round v-on:click="matchmaker">红娘端</el-button>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    user: function(){
      this.$router.push({
        path:'/UserLogin'
      })
    },

    matchmaker: function(){
      this.$router.push({
        path:'/MatchmakerLogin'
      })
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

</style>
