<template>
  <div class="index">
    假装这里有视频有便签
    <el-button type="primary" round  v-on:click="login">马上联系红娘</el-button>
  </div>
</template>

<script>

export default {
  name: 'UserWelcome',
  data () {
    return {
       userId: ''
    }
  },
  methods: {
    login: function(){
      this.$router.push({
        name: 'UserIndex'
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
