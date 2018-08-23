<template>
  <div class="index">
    <el-input v-model="userId" placeholder="请输入用户id"></el-input>
    <el-button type="primary" round  v-on:click="login">上线</el-button>
  </div>
</template>

<script>
import Store from '@/tool/store.js'
export default {
  name: 'Index',
  data () {
    return {
       userId: ''
    }
  },
  methods: {
    login: function(){
      Store.save('client-id',this.userId)
      this.$router.push({
        name: 'UserWelcome'
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
