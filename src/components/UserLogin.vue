<template>
  <div class="index">
    <el-input v-model="userId" placeholder="请输入用户id"></el-input>
    <el-button type="primary" round  v-on:click="login">上线</el-button>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
       userId: ''
    }
  },
  methods: {
    login: function(){
      this.$router.push({
        name: 'UserIndex',
        params: {
            userId: this.userId
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
