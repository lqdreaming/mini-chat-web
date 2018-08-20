<template>
  <div class="index">
    <el-input v-model="mid" placeholder="请输入红娘id"></el-input>
    <el-button type="primary" round  v-on:click="login">上线</el-button>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      mid: ""
    }
  },
  methods: {
    login: function(){
      this.$router.push({
        name: 'MatchmakerIndex',
        params: {
            mid: this.mid
         }
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
