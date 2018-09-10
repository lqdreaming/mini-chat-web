<template>
  <div>
    <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>
    {{deptName}}门店距离您{{distance}}
    <br>
    地址：{{deptAddr}}
  </div>
</template>

<script>
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'

// import zaDailog from './zaDailog.vue'
// import zaInputDailog from './zaInputDailog.vue'
// import VerifyPhone from './VerifyPhone.vue'

export default {
  name: 'EndPage',
  data () {
    return {
      deptName: '',
      distance: '',
      deptAddr: ''
    }
  },
  components:{
    // zaDailog,
    // zaInputDailog,
    // VerifyPhone
  },
  methods: {
    returnBtn: function(){
      this.$router.push({
        name: 'UserWelcome'
      })
    },
  },
  mounted () {
    var that = this
    axios.get(Conf.API + '/boxPosition/' + Store.fetch('client-id'))
      .then(function (response) {
        var responseData = response.data.data
        console.log(response.data.code);
          if (response.data.code === 0){
              that.deptName = responseData.deptName
              that.distance = responseData.distance
              that.deptAddr = responseData.deptAddr
          }
      })
      .catch(function (response) {
        console.log(response)
      })
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
#returnBtn{
  position: absolute;
  height: 60px;
  width: 120px;
  margin-left: 500px;
}

</style>
